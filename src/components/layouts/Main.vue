<template>
  <h3 class="q-pa-lg bg-grey-10 text-pink-9 q-mb-none">Movie App</h3>
  <div class="wrapper q-pt-lg">
    <AddMovie @push-movie="addMovie" />
    <MovieList @delete-movie="deleteMovie" />
  </div>
</template>

<script>
import { computed } from "vue";
import AddMovie from "../AddMovie.vue";
import MovieList from "../MovieList.vue";

export default {
  components: { AddMovie, MovieList },

  provide() {
    return {
      movies: computed(() => this.movies),
    };
  },

  data() {
    return {
      movies: [],
    };
  },

  methods: {
    async loadMovies() {
      const res = await fetch(
        "https://my-mov-proj-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );
      const data = await res.json();

      const movies = Object.entries(data).map(([id, movieData]) => ({
        ...movieData,
        id,
      }));

      this.movies = movies;
    },

    addMovie(data) {
      this.movies.push(data);
    },

    async deleteMovieDb(id) {
      const res = await fetch(
        `https://my-mov-proj-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res) {
        console.log("Movie successfully deleted");
      } else {
        console.log("Error deleting the movie");
        console.log(res);
      }
    },

    deleteMovie(id) {
      console.log(this.movies);
      this.movies = this.movies.filter((movie) => movie.id != id);

      this.deleteMovieDb(id);
    },
  },

  created() {
    this.loadMovies();
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 0;
  height: auto;
}

.wrapper {
  background-color: $grey-8;
  max-width: 1500px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px gray;
}
</style>
