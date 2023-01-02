<template>
  <div class="q-pa-md bg-grey-6 container">
    <q-form class="row">
      <q-btn label="filter" color="grey-10" class="col-3 q-mr-lg" />
      <q-input
        class="col-8"
        :loading="fetching"
        :debounce="500"
        v-model="title"
        label="Title"
        standout="bg-grey-10 text-white"
      />
    </q-form>

    <div
      class="q-pa-md q-ma-lg bg-grey-10 text-white"
      style="max-width: 400px"
      v-if="foundMovies.length"
    >
      <q-list
        v-for="movie in foundMovies"
        dense
        padding
        class="rounded-borders"
      >
        <q-item clickable @click="fetchSelectedMovie(movie.imdbID)">
          <q-item-section>
            {{ movie.Title }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["push-movie"],

  data() {
    return {
      fetching: false,
      foundMovies: [],
      title: "",
    };
  },

  methods: {
    async fetchMovie() {
      this.fetching = true;

      const title = encodeURI(this.title);

      console.log(`hai sa vedem daca gasim ce ai dat aici ${title}`);

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=97690e43&s=${title}`
      );

      const data = await res.json();

      if (!data?.Search?.length) {
        this.fetching = false;
        return;
      }

      this.foundMovies = data.Search;
      console.log(this.foundMovies);
      this.fetching = false;
    },

    async fetchSelectedMovie(imDbId) {
      const id = encodeURI(imDbId);

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=97690e43&i=${id}`
      );

      const data = await res.json();

      if (!data?.Response) {
        throw "an API error occurred";
      }

      data.watched = false;
      this.title = "";
      this.foundMovies = [];
      this.addMovie(data);
    },

    async addMovie(data) {
      const res = await fetch(
        "https://my-mov-proj-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      this.$emit("push-movie", { ...data, id: result.name });
    },
  },

  watch: {
    title() {
      this.fetchMovie();
    },
  },
};
</script>

<style scoped>
.container {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(77, 77, 77);
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
