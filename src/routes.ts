import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import AccountRegister from "./views/AccountRegister.vue";
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
    path: "/register",
    name: "Register",
    component: AccountRegister,
  },
  {
    path: "/recipe",
    name: "Recipe",
    component: VTableView,
  },
  {
    path: "/recipe/:id",
    name: "RecipeDetails",
    component: FoodDetails,
  },
  {
    path: "/addRecipe",
    name: "Add Recipe",
    component: Vue3TableLiteView,
    beforeEnter: protectedRoute,
  },
  {
    path: "/modifyRecipe",
    name: "modifyRecipe",
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
