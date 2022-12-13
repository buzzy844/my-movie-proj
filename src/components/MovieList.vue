<template>
  <div class="q-pa-md row items-start q-gutter-md q-ma-md">
    <q-card class="my-card" v-for="movie of movies">
      <q-img :src="movie.url" height="250px" width="180px" class="my-img">
        <q-scroll-area
          visible="false"
          class="absolute-full text-subtitle2 flex flex-center my-text"
        >
          <div>
            {{ movie.description }}
          </div>
        </q-scroll-area>
      </q-img>

      <q-card-section class="row bg-grey-10 text-white">
        <div>
          <div class="text-h6">{{ movie.title }}</div>
          <div class="text-subtitle3">{{ movie.year }}</div>
          <q-btn outline icon="add" label="Watchlist" class="q-mt-md" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  inject: ["movies"],
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: fit-content;
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
</style>
