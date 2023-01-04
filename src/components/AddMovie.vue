<template>
  <div class="q-pa-md bg-grey-6 container">
    <q-form class="row no-wrap q-pr-md">
      <q-btn
        icon="menu"
        color="grey-10"
        class="col-1 q-mr-md"
        @click="enableFilter"
      />
      <q-input
        :disable="this.searchMovieDisabled"
        class="col-11"
        :loading="fetching"
        :debounce="500"
        v-model="title"
        label="Title"
        standout="bg-grey-10 text-white"
      />
    </q-form>

    <div v-if="this.filterIsVisible" class="q-pa-md">
      <q-badge color="grey-10 text-white">
        filter by year (1950 to 2022)
      </q-badge>

      <q-range
        v-model="this.filteredYear"
        color="grey-10"
        :min="1950"
        :max="2022"
        label
        switch-label-side
      />

      <q-badge color="grey-10 text-white">
        filter by IMDB Rating (0.0 to 10.0)
      </q-badge>

      <q-range
        v-model="this.filteredRating"
        color="grey-10"
        :min="0.0"
        :max="10.0"
        label
        switch-label-side
        :step="0.1"
      />

      <q-select
        color="grey-10"
        bg-color="grey-7"
        class="q-my-md"
        standout="bg-grey-10 text-white"
        v-model="filteredGenre"
        :options="filterGenreOptions"
        label="Genre"
        options-dense
      />

      <q-select
        color="grey-10"
        bg-color="grey-7"
        class="q-my-md"
        standout="bg-grey-10 text-white"
        v-model="filteredType"
        :options="['movie', 'series']"
        label="Type"
        options-dense
      />

      <q-btn label="filter" outline />
    </div>

    <div
      class="q-pa-md q-mx-lg q-my-lg bg-grey-10 text-white"
      v-if="title.length && foundMovies.length"
    >
      <q-list v-for="movie in foundMovies" :key="movie.id" dense padding>
        <q-item clickable @click="fetchSelectedMovie(movie.imdbID)">
          <q-item-section>
            {{ movie.Title }} ( {{ movie.Year }} )
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
      searchMovieDisabled: false,
      filterIsVisible: false,
      filteredYear: { min: 0, max: 0 },
      filteredRating: { min: 0, max: 0 },
      filterGenreOptions: [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film Noir",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Short",
        "Sport",
        "Superhero",
        "Thriller",
        "War",
        "Western",
      ],
      filteredGenre: "",
      filteredType: "",
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

    enableFilter() {
      this.searchMovieDisabled = !this.searchMovieDisabled;
      this.filterIsVisible = !this.filterIsVisible;
      this.filteredYear.min = 1950;
      this.filteredYear.max = 2022;
      this.filteredRating.min = 0.0;
      this.filteredRating.max = 10.0;
      this.filteredGenre = "";
      this.filteredType = "";
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
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
