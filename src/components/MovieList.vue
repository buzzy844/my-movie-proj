<template>
  <div class="q-pa-md row items-start q-col-gutter-md q-ma-md">
    <div
      class="col-xs-6 col-sm-6 col-md-3 col-lg-2 col-xl-2"
      v-for="movie of movies"
    >
      <q-card class="bg-grey-10">
        <q-img :src="movie.url" :ratio="3 / 5" class="my-img">
          <q-scroll-area
            :visible="false"
            class="absolute-full text-subtitle2 flex flex-center my-text"
          >
            {{ movie.description }}
          </q-scroll-area>
        </q-img>

        <q-card-section class="bg-grey-10 text-white">
          <div @click="mergi(movie.title)" class="text-h6 cursor-pointer">
            {{ movie.title }}
          </div>
          <div class="text-subtitle3">{{ movie.year }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            color="white"
            outline
            icon="verified"
            class="col-12"
            label="Watched"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["movies"],

  methods: {
    mergi(imDbId) {
      const encoded = encodeURI(imDbId);

      window.open(`https://www.imdb.com/title/${encoded}`, "_blank");
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
