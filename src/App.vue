<template>
  <h3 class="q-pa-lg bg-grey-10 q-mb-none">
    <router-link to="/" class="text-white"
      >The Ultimate Movie List WebApp</router-link
    >
  </h3>

  <router-view />
</template>

<script>
export default {};
</script>

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
