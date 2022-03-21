<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VContainer } from "vuetify/components";
import { useRecipeStore } from "../store/recipeStore";
import card from "../components/FoodCard.vue";
import { watch } from "vue";

const limits = ref(["12", "20", "28", "36"]);
const limit = ref("12");

watch(limit, function () {
  Loading();
});

const reload = ref(0);
const isLoading = ref(false);
const load = ref(false);

const offset = ref(0);

const allRecipe = ref([]);
const pages = ref([]);
const currentPage = ref(1);
const recipeStore = useRecipeStore();

const name = ref("");

const numberOfRecipes = ref(0);
const empty = ref(false);

function Loading() {
  isLoading.value = true;

  offset.value = (currentPage.value - 1) * limit.value;

  doSearch(offset.value, limit.value.toString(), name.value);
}

async function doSearch(
  offset: number,
  limit: string,
  keyword: string,
  sort: string = "asc",
  order: string = "1"
) {
  await recipeStore.fetchPaginatedRecipe({
    offset: offset,
    limit: limit,
    keyword: keyword,
    sort: sort,
    order: order,
  });
  allRecipe.value = recipeStore.getPaginatedRecipe;
  pages.value =
    parseInt(
      (recipeStore.getNumberOfRecipe ? recipeStore.getNumberOfRecipe : 0) / parseInt(limit)
    ) + 1;
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

const show = ref(true);
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
        <v-btn depressed color="success" class="btn" @click="Loading">Search</v-btn>
      </v-col>
      <v-col cols="12" lg="1" sm="0"></v-col>
      <v-col cols="12" lg="2" sm="12">
        <v-select
          :items="limits"
          v-model="limit"
          filled
          label="On one page"
          prepend-icon="mdi-book-open-page-variant-outline"
        ></v-select>
      </v-col>

      <v-col cols="12" lg="3" sm="12">
        <v-pagination v-model="currentPage" :length="pages" circle @click="Loading"></v-pagination>
      </v-col>
    </v-row>
    <v-row :key="reload" class="rows">
      <v-alert v-if="empty" color="red lighten-2" dark>
        Unfortunately, we don't have any recipes now.
      </v-alert>
      <v-col v-for="(item, i) in allRecipe" :key="i" cols="12" lg="3" md="4" sm="6">
        <card :item="item" />
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
