<template>
  <div class="q-pa-md row items-start q-col-gutter-md q-ma-md">
    <div
      class="col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-2"
      v-for="[index, movie] of movies.entries()"
      :key="movie.imdbID"
    >
      <q-card class="bg-grey-10">
        <q-img :src="movie.Poster" :ratio="4 / 6" class="my-img">
          <q-badge floating right color="grey-10" class="q-ma-sm">
            <q-icon name="grade" color="yellow-12" size="13px" />
            {{ movie.imdbRating }}
          </q-badge>

          <q-scroll-area
            :visible="false"
            class="absolute-full text-subtitle2 flex flex-center my-text"
          >
            {{ movie.Plot }}
          </q-scroll-area>
        </q-img>

        <q-card-section class="bg-grey-10 text-white">
          <div
            @click="goTo(movie.imdbID)"
            class="text-h6 cursor-pointer ellipsis"
          >
            {{ movie.Title }}
          </div>
          <div class="text-subtitle3">{{ movie.Year }}</div>
        </q-card-section>

        <q-card-actions class="row q-col-gutter-sm">
          <div class="col-xs-10">
            <q-btn
              outline
              :icon="movie.watched ? 'check' : 'close'"
              :label="movie.watched ? 'watched' : 'not watched'"
              :class="
                movie.watched
                  ? 'full-width text-green-6 '
                  : 'full-width text-red-6'
              "
              @click="changeWatchStatus(index, movie.id)"
            />
          </div>

          <div class="col-xs-2">
            <q-btn
              @click="delMovie(movie.id)"
              no-wrap
              icon="delete"
              class="full-width text-red-6 flip-horizontal-bottom"
              flat
            />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["movies"],

  emits: ["delete-movie"],

  methods: {
    goTo(imDbId) {
      const encoded = encodeURI(imDbId);
      window.open(`https://www.imdb.com/title/${encoded}`, "_blank");
    },

    delMovie(id) {
      this.$emit("delete-movie", id);
    },

    async changeWatchStatus(idx, id) {
      try {
        const res = await fetch(
          `https://my-mov-proj-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({
              watched: !this.movies[idx].watched,
            }),
          }
        );
        this.movies[idx].watched = !this.movies[idx].watched;
      } catch (error) {
        console.log("error changing status");
      }
    },
  },
};
</script>

<style scoped>
/* .my-card {
  width: 100%;
  max-width: fit-content;
} */

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
</style>
