<template>
  <h3 class="q-py-lg bg-grey-10 text-pink-9 q-mb-none">Movie App</h3>
  <div class="wrapper q-pt-lg">
    <AddMovie @push-movie="addMovie" />
    <MovieList />
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
  min-width: fit-content;
  max-width: 1000px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px gray;
}
</style>
