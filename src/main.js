import { createApp } from "vue";
import { Quasar } from "quasar";
import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./components/layouts/Main.vue";
import MoviePage from "./components/MoviePage.vue";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const routes = [
  {
    path: "/",
    component: Main,
  },
  { path: "/moviePage/:movieId", component: MoviePage },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

myApp.use(router);

myApp.config.unwrapInjectedRef = true;
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
