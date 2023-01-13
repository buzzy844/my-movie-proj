<template>
  <h3 class="q-pa-lg bg-grey-10 q-mb-none">
    <router-link to="/" class="text-white">
      The Ultimate Movie List WebApp
    </router-link>
  </h3>

  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      mode="out-in"
      :duration="50"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
h3 {
  text-align: center;
  margin-top: 0;
  height: auto;
}
a {
  text-decoration: none;
}
</style>
