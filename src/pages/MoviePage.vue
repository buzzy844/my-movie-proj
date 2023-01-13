<template>
  <div v-if="loaded" class="wrapper q-py-lg q-px-lg">
    <div
      class="bg-grey-10 row q-pa-lg q-col-gutter-md q-mx-auto q-mt-md items-center justify-between"
      style="max-width: 1300px"
    >
      <div class="col-xs-12 col-sm-5 col-md-2">
        <div class="row flex-center">
          <q-img
            :src="this.movie.Poster"
            class="fit"
            style="max-width: 250px; min-height: 270px"
          >
            <q-badge
              transparent
              style="cursor: pointer"
              color="grey-10"
              @click="changeWatchStatus(this.movieId)"
            >
              <q-icon
                size="20px"
                :name="movie.watched ? 'check' : 'add'"
                :color="movie.watched ? 'light-green-6' : 'white'"
              />
            </q-badge>
          </q-img>
        </div>
      </div>
      <div class="col-md-4 col-xs-12 col-sm-7">
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
      <div class="col-md-6 col-xs-12">
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
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="q-mx-auto q-my-md"
        ></iframe>
      </div>
    </q-expansion-item>
    <div
      v-if="recommendedMovies.length > 0"
      style="max-width: 1300px"
      class="q-mx-auto"
    >
      <div class="text-h5 text-white bg-grey-9 q-pa-sm q-mx-auto">
        More like : {{ movie.Title }}
      </div>

      <movie-list no-actions />
    </div>
  </div>
</template>

<script>
import MovieList from "./../components/MovieList.vue";
import { computed } from "vue";

export default {
  data() {
    return {
      recommendedMovies: [],
      movie: undefined,
      movieId: "",
      loaded: false,
    };
  },

  provide() {
    return {
      movies: computed(() => this.recommendedMovies),
    };
  },
  components: { MovieList },

  methods: {
    async loadMovies() {
      const res = await fetch(
        "https://ultimate-movieapp-db-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );
      const data = await res.json();
      const movies = Object.entries(data).map(([id, movieData]) => ({
        ...movieData,
        id,
      }));

      this.recommendedMovies = movies;
    },

    async fetchMovie(id) {
      const res = await fetch(
        `https://ultimate-movieapp-db-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`
      );

      const data = await res.json();

      this.movie = { ...data };

      this.movie.imdbRating = parseFloat(this.movie.imdbRating);
      this.loaded = true;
    },

    async changeWatchStatus(id) {
      try {
        const res = await fetch(
          `https://ultimate-movieapp-db-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({
              watched: !this.movie.watched,
            }),
          }
        );
        this.movie.watched = !this.movie.watched;
      } catch (error) {
        console.log("error changing status");
      }
    },
  },

  watch: {
    movieId: {
      async handler(initialVal) {
        if (initialVal === "") {
          return;
        }
        await Promise.all([this.fetchMovie(initialVal), this.loadMovies()]);

        const movieGenres = this.movie.Genre;

        this.recommendedMovies = this.recommendedMovies.filter(
          ({ Genre: genres, id }) => {
            if (id === this.movieId) {
              return false;
            }

            const genreList = movieGenres.split(",");

            for (const item of genreList) {
              if (genres.includes(item)) {
                return true;
              }
            }

            return false;
          }
        );
      },

      immediate: true,
    },

    "$route.params.movieId": {
      handler(val) {
        this.movieId = val;
      },

      immediate: true,
    },
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

.my-img .my-text {
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
}

.my-img:hover .my-text {
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
}
a {
  text-decoration: none;
}
</style>
