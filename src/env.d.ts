/// <reference types="vite/client" />

export {};

import { Router, RouteLocationNormalizedLoaded } from "vue-router";

import { useQuasar } from "quasar";

declare module "vue" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
    $q: ReturnType<typeof useQuasar>;
  }
}
