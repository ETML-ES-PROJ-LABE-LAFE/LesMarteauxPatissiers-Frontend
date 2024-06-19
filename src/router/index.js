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
      import(/* webpackChunkName: "lots" */ "../views/ItemsView.vue"),
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
  },{
    path: "/my-proposed-lots",
    name: "my-proposed-lots",
    component: () =>
      import(/* webpackChunkName: "my-proposed-lots" */ "../views/MyProposedLotsView.vue"),
  },
  {
    path: "/my-bid-lots",
    name: "my-bid-lots",
    component: () =>
      import(/* webpackChunkName: "my-bid-lots" */ "../views/MyBidLotsView.vue"),
  },
  {
    path: "/my-won-lots",
    name: "my-won-lots",
    component: () =>
      import(/* webpackChunkName: "my-bid-lots" */ "../views/MyWonLotsView.vue"),
  },
  {
    path: "/my-sold-lots",
    name: "my-sold-lots",
    component: () =>
      import(/* webpackChunkName: "my-bid-lots" */ "../views/MySoldLotsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
