import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutComp from "./VueMastery_RealWorldVue3/components/AboutComp.vue";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import EventDetails from "./VueMastery_RealWorldVue3/components/EventDetails.vue";
import EventList from "./VueMastery_RealWorldVue3/components/EventList.vue";
import ExamplesView from "./views/ExamplesView.vue";
import GridView from "./views/GridView.vue";
import protectedRoute from "./middlewares/protected";
import StartPageView from "./views/StartPageView.vue";
import VTableView from "./views/FoodView.vue";
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
    beforeEnter: protectedRoute,
  },
  {
    path: "/addfood",
    name: "Add Food",
    component: Vue3TableLiteView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: VueMasteryRealWorldVue3,
    children: [
      {
        path: "event",
        name: "EventList",
        component: EventList,
      },
      {
        path: "event/:id",
        name: "EventDetails",
        props: true,
        component: EventDetails,
      },
      {
        path: "about",
        name: "AboutComp",
        component: AboutComp,
      },
    ],
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
