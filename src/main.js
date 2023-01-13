import { createApp } from "vue";
import { Quasar } from "quasar";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Welcome from "./pages/Welcome.vue";
import MoviePage from "./pages/MoviePage.vue";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/animate/fadeOutDown.css";
import "@quasar/extras/animate/fadeInUp.css";

// Import Quasar css
import "quasar/src/css/index.sass";
import MainLayout from "./layouts/MainLayout.vue";

const routes = [
  {
    component: MainLayout,
    path: "",
    children: [
      {
        path: "",
        component: Welcome,
      },
      { path: "moviePage/:movieId", component: MoviePage },
    ],
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

myApp.use(router);

myApp.config.unwrapInjectedRef = true;
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
