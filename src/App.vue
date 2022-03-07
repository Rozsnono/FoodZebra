<script setup lang="ts">
  import { computed, ref } from "vue";

  import {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VBadge,
    VBtn,
    VContainer,
    VList,
    VListItem,
    VMain,
    VNavigationDrawer,
    VSpacer,
  } from "vuetify/components";
  import { useDisplay } from "vuetify";
  import { useI18n } from "vue-i18n";
  import { useUsersStore } from "./store/usersStore";

  const isMobileDevice = useDisplay().mobile.value;
  sessionStorage.removeItem("currentUser");
  const drawer = ref(!isMobileDevice);
  const usersStore = useUsersStore();
  const theme = ref(false);
  const themeForApp = ref("light");

  const loggedUser = computed(() => usersStore.getLoggedUser);
  console.log(loggedUser);
  const notLoggedIn = computed(() => usersStore.getLoggedUser == null);

  let { locale, t } = useI18n({
    inheritLocale: true,
    useScope: "global", // Change to "local" if you want to add <i18n></i18n> locally
  });

  // Search icons: https://materialdesignicons.com/
  const menuItems = ref([
    {
      icon: "mdi-home",
      text: t("startPage"),
      name: "startPage",
      route: "/",
      disabled: false,
    },
    {
      icon: "mdi-food",
      text: t("food"),
      name: "food",
      route: "/food",
      disabled: false,
    },
    {
      icon: "mdi-food-fork-drink",
      text: t("addFood"),
      name: "addFood",
      route: "/addFood",
      disabled: notLoggedIn,
    },
    {
      icon: "mdi-food-fork-drink",
      text: t("modifyFood"),
      name: "modifyFood",
      route: "/modifyFood",
      disabled: notLoggedIn,
    },
    {
      icon: "mdi-information",
      text: t("about"),
      name: "about",
      route: "/about",
      disabled: false,
    },
    {
      icon: "mdi-account",
      text: loggedUser.value ? loggedUser.value : t("account"),
      name: "account",
      route: "/account",
      disabled: true,
    },
  ]);

  function toggleTheme() {
    theme.value = theme.value === true ? false : true;
    themeForApp.value = themeForApp.value === "light" ? "dark" : "light";
  }
  function toggleLanguage() {
    locale.value = locale.value == "hu" ? "en" : "hu";
    menuItems.value.forEach((e) => {
      if (e.name != "") e.text = t(e.name);
    });
  }
</script>

<template>
  <v-app :theme="themeForApp">
    <v-navigation-drawer drawer v-model="drawer" app :color="'primary'" dark>
      <v-system-bar></v-system-bar>
      <v-list :color="'primary'" dark>
        <v-list-item prepend-avatar="../src/assets/logo.png">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link to="/account">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ loggedUser ? loggedUser.name : menuItems[5].text }}
            </v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav :color="'primary'" dark>
        <v-list-item-group v-model="menuItems" color="primary">
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            :prepend-icon="item.icon"
            :to="item.route"
            v-show="!item.disabled"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :color="notLoggedIn ? 'primary' : 'loginedBackground'" dark>
      <v-app-bar-nav-icon
        :color="notLoggedIn ? 'primary' : 'loginedBackground'"
        dark
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      FoodZebra
      <v-spacer></v-spacer>
      <v-btn
        :color="notLoggedIn ? 'primary' : 'loginedBackground'"
        dark
        icon
        @click="toggleLanguage"
      >
        <v-icon>mdi-comment-text-multiple</v-icon>
      </v-btn>
      <v-btn
        class="ml-5"
        :color="notLoggedIn ? 'primary' : 'loginedBackground'"
        dark
        icon
        @click="toggleTheme"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
  #app {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }

  .dark {
    background-color: #36443c;
    color: white;
  }
  .default {
    background-color: #a5b452;
    color: black;
  }
</style>
