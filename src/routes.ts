import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutComp from "./VueMastery_RealWorldVue3/components/AboutComp.vue";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import EventDetails from "./VueMastery_RealWorldVue3/components/EventDetails.vue";
import EventList from "./VueMastery_RealWorldVue3/components/EventList.vue";
import ExamplesView from "./views/ExamplesView.vue";
import Modify from "./views/FoodModify.vue";
import protectedRoute from "./middlewares/protected";
import StartPageView from "./views/StartPageView.vue";
import VTableView from "./views/FoodView.vue";
import FoodDetails from "./views/FoodDetails.vue";
import Vue3TableLiteView from "./views/FoodAdd.vue";
import VueMasteryRealWorldVue3 from "./views/VueMasteryRealWorldVue3.vue";
import VueMasterySocksView from "./views/VueMasterySocksView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPageView,
  },
  {
    path: "/examples",
    name: "Examples",
    component: ExamplesView,
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
  },
  {
    path: "/modifyFood",
    name: "modifyFood",
    component: Modify,
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
