import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/lots",
    name: "lots",
    component: () =>
      import(/* webpackChunkName: "lots" */ "../views/itemsView.vue"),
  },
  {
    path: "/ajout-items",
    name: "ajout-items",
    component: () =>
      import(/* webpackChunkName: "ajout-items" */ "../views/AddItemView.vue"),
  },
  {
    path: "/lot/:id",
    name: "item-description-view",
    component: () =>
      import(/* webpackChunkName: "item-description-view" */ "../views/ItemDescriptionView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
