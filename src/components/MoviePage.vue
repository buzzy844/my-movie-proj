<template>
  <div v-if="loaded" class="wrapper q-py-lg q-px-lg">
    <div
      class="bg-grey-10 row q-pa-lg q-col-gutter-md q-mx-auto q-mt-md"
      style="max-width: 1300px"
    >
      <q-img
        :src="this.movie.Poster"
        :ratio="4 / 6"
        width="200px"
        class="col-2"
      >
        <q-badge>
          <q-icon size="15px" name="add" />
        </q-badge>
      </q-img>

      <div class="col-4">
        <div class="text-h5 text-white">{{ movie.Title }}</div>
        <div class="text-caption text-grey-3">
          Released: {{ movie.Released }}
        </div>
        <div>
          <q-chip dense>{{ movie.Rated }}</q-chip>
          <q-chip dense> {{ movie.Year }}</q-chip>
          <q-chip dense>{{ movie.Runtime }}</q-chip>
          <div class="row q-mt-sm">
            <q-chip square color="grey-8" text-color="white" size="18px">{{
              movie.imdbRating.toFixed(1)
            }}</q-chip>
            <div>
              <q-rating
                v-model="this.movie.imdbRating"
                max="10"
                size="1.2em"
                readonly
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
              />
              <div class="text-white">IMDB votes: {{ movie.imdbVotes }}</div>
            </div>
            <q-list class="text-white q-mt-sm" dense separator dark>
              <q-item>
                <q-item-section>Genre: {{ movie.Genre }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Director: {{ movie.Director }} </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Cast: {{ movie.Actors }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Language: {{ movie.Language }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="col q-ml-sm q-my-auto">
        <p class="text-h5 text-white">Plot</p>
        <q-scroll-area
          dark
          class="text-white text-body1 rounded-borders"
          style="height: 200px"
        >
          <div>
            {{ movie.Plot }}
          </div>
        </q-scroll-area>
      </div>
    </div>
    <q-expansion-item
      style="max-width: 1300px"
      expand-separator
      dark
      icon="movie"
      label="Trailer"
      class="text-white text-h5 bg-grey-10 q-mx-auto"
    >
      <div class="row">
        <iframe
          width="700"
          height="400"
          :src="this.movie.src"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="q-mx-auto q-my-md"
        ></iframe>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: undefined,
      movieId: "",
      loaded: false,
    };
  },

  methods: {
    async fetchMovie(id) {
      const res = await fetch(
        `https://ultimate-movieapp-db-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`
      );

      const data = await res.json();

      this.movie = { ...data };
      this.movie.imdbRating = parseFloat(this.movie.imdbRating);
      console.log(this.movie.imdbRating);
      this.loaded = true;
    },
  },

  created() {
    const movieId = this.$route.params.movieId;
    this.movieId = movieId;
    this.fetchMovie(this.movieId);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $grey-8;
  max-width: 1500px;
  min-height: 700px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px #686464;
}
</style>
