<template>
  <h3 class="q-pa-lg bg-grey-10 text-white q-mb-none">
    The Ultimate Movie List WebApp
  </h3>
  <div class="wrapper q-pt-lg">
    <AddMovie
      @push-movie="addMovie"
      @filter-movies="updateFilter"
      @reset-movies="resetFilters"
    />
    <MovieList @delete-movie="deleteMovie" />
  </div>
</template>

<script>
import { computed } from "vue";
import AddMovie from "../AddMovie.vue";
import MovieList from "../MovieList.vue";

const initialFilters = {
  Year: { min: 1950, max: 2022 },
  Rating: { min: 0.0, max: 10.0 },
  Genre: "",
  Type: "",
};

export default {
  components: { AddMovie, MovieList },

  provide() {
    return {
      movies: computed(() => this.filteredMovies),
    };
  },

  data() {
    return {
      movies: [],
      filterData: JSON.parse(JSON.stringify(initialFilters)),
    };
  },

  computed: {
    filteredMovies() {
      const { Type, Genre, Year, Rating } = this.filterData;

      return this.movies.filter((movie) => {
        if (Type.length) {
          if (movie.Type !== Type) {
            return false;
          }
        }

        if (Genre.length) {
          if (!movie.Genre.includes(Genre)) {
            return false;
          }
        }

        const movieYearSplit = movie.Year.split("-");

        if (movieYearSplit.length === 2) {
          const yearL = parseInt(movieYearSplit[0]);
          const yearR = parseInt(movieYearSplit[1]);

          if (yearL < Year.min || yearR > Year.max) {
            return false;
          }
        } else if (movieYearSplit.length === 1) {
          const yearL = parseInt(movieYearSplit[0]);

          if (yearL < Year.min || yearL > Year.max) {
            return false;
          }
        } else {
          return false;
        }

        if (
          Rating.min > parseFloat(movie.imdbRating) ||
          Rating.max < parseFloat(movie.imdbRating)
        ) {
          return false;
        }

        return true;
      });
    },
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

    updateFilter(filterData) {
      this.filterData = { ...filterData };
    },

    resetFilters() {
      this.filterData = JSON.parse(JSON.stringify(initialFilters));
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
  box-shadow: 0 2px 8px #686464;
}
</style>
