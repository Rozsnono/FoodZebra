<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useRecipeStore } from "../store/recipeStore";
  import card from "../components/FoodCard.vue";
  import { watch } from "vue";

  const limits = ref(["12", "20", "28", "36"]);
  const limit = ref(12);

  watch(limit, () => {
    Loading();
  });

  const reload = ref(0);
  const isLoading = ref(false);
  const load = ref(false);

  const offset = ref(0);

  const allRecipe = ref([]);
  const pages = ref(0);
  const currentPage = ref(1);
  const recipeStore = useRecipeStore();

  const name = ref("");

  const numberOfRecipes = ref(0);
  const empty = ref(false);

  function Loading() {
    isLoading.value = true;

    offset.value = (currentPage.value - 1) * limit.value;

    doSearch(offset.value, limit.value, name.value, "asc", "1");
  }

  async function doSearch(
    offset: number,
    limit: number,
    keyword: string,
    sort: string,
    order: string
  ) {
    await recipeStore.fetchPaginatedRecipe({
      offset: offset,
      limit: limit.toString(),
      keyword: keyword,
      sort: sort,
      order: order,
    });
    allRecipe.value = recipeStore.getPaginatedRecipe;
    const tmpPages = recipeStore.getNumberOfRecipe ? recipeStore.getNumberOfRecipe : 0;
    pages.value = parseInt((tmpPages / limit).toFixed(0));

    numberOfRecipes.value = recipeStore.getNumberOfRecipe;
    if (numberOfRecipes.value === 0) {
      empty.value = true;
    } else {
      empty.value = false;
    }
    load.value = true;
    isLoading.value = false;
    reload.value += 1;
  }

  onMounted(() => {
    Loading();
  });
</script>

<template>
  <v-container class="page" style="min-height: 90vh">
    <v-row>
      <v-col cols="12" lg="3" sm="12">
        <v-text-field
          v-model="name"
          class="inputs"
          label="Search"
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12">
        <v-btn class="btn" color="success" depressed @click="Loading">Search</v-btn>
      </v-col>
      <v-col cols="12" lg="1" sm="0"></v-col>
      <v-col cols="12" lg="2" sm="12">
        <v-select
          v-model="limit"
          filled
          :items="limits"
          label="On one page"
          prepend-icon="mdi-book-open-page-variant-outline"
        ></v-select>
      </v-col>

      <v-col cols="12" lg="3" sm="12">
        <v-pagination v-model="currentPage" circle :length="pages" @click="Loading"></v-pagination>
      </v-col>
    </v-row>
    <v-row :key="reload" class="rows">
      <v-alert v-if="empty" color="red lighten-2" dark>
        Unfortunately, we don't have any recipes now.
      </v-alert>
      <v-col v-for="(item, i) in allRecipe" :key="i" cols="12" lg="3" md="4" sm="6">
        <card :is-modify="false" :item="item" />
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="isLoading" hide-overlay persistent>
    <v-card color="background">
      <v-card-text>
        Please wait...
        <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .btn {
    width: 100% !important;
    margin: auto;
    margin-top: 0.5rem;
  }
  .rows {
    display: flex;
    justify-content: center;
  }
</style>
