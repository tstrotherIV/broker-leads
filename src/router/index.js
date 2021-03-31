import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateListing from "../views/CreateListing.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "CreateListing",
    component: CreateListing,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
