import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import Modify from "./views/FoodModify.vue";
import StartPageView from "./views/StartPageView.vue";
import VTableView from "./views/FoodView.vue";
import FoodDetails from "./views/FoodDetails.vue";
import Vue3TableLiteView from "./views/FoodAdd.vue";
import protectedRoute from "./middlewares/protected";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPageView,
  },
  {
    path: "/account",
    name: "Account",
    component: AccountView,
  },
  {
    path: "/food",
    name: "Food",
    component: VTableView,
  },
  {
    path: "/food/:id",
    name: "FoodDetails",
    component: FoodDetails,
  },
  {
    path: "/addfood",
    name: "Add Food",
    component: Vue3TableLiteView,
    beforeEnter: protectedRoute,
  },
  {
    path: "/modifyFood",
    name: "modifyFood",
    component: Modify,
    beforeEnter: protectedRoute,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
