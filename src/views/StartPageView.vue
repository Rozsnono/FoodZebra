<script setup lang="ts">
  import { useRecipeStore } from "@/store/recipeStore";
  import card from "../components/FoodCard.vue";
  import { ref, onMounted } from "vue";
  const recipeStore = useRecipeStore();
  const allRecipe = ref([]);
  const isLoading = ref(false);
  const noR = ref(0);
  const empty = ref(false);

  async function Loading() {
    isLoading.value = true;
    await recipeStore.fetchPaginatedRecipe({
      offset: 0,
      limit: "3",
      keyword: "",
      order: "1",
      sort: "1",
    });
    allRecipe.value = recipeStore.getPaginatedRecipe;

    noR.value = recipeStore.getNumberOfRecipe;
    if (noR.value === 0) {
      empty.value = true;
    } else {
      empty.value = false;
    }
    isLoading.value = false;
    return true;
  }
  onMounted(() => {
    Loading();
  });
</script>
<template>
  <div class="d-flex flex-column text-center" style="min-height: 90vh">
    <h1 class="title linear-wipe">Welcome to FoodZebra</h1>
    <h5 class="slogan">Where your favourite recipes'll find you</h5>
    <v-divider></v-divider>
    <h5 class="rTitle">Some famous recipes:</h5>
    <v-dialog v-model="isLoading" hide-overlay persistent>
      <v-card color="background">
        <v-card-text>
          Please wait...
          <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container>
      <v-row class="rows">
        <v-alert v-if="empty" class="mb-5 mt-5" color="red lighten-2" dark>
          Unfortunately, we don't have any recipes now.
        </v-alert>
        <v-col v-for="(item, i) in allRecipe" :key="i" cols="9" lg="3" md="3" sm="9">
          <card :isModify="false" :item="item" />
        </v-col>
      </v-row>
    </v-container>
    <div v-if="!empty" class="btn_div">
      <v-btn class="btn" to="recipe">more...</v-btn>
    </div>
  </div>
</template>
<style scoped>
  .title {
    font-size: 4rem !important;
    letter-spacing: 0.2rem;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
  }

  .rTitle {
    font-size: 2rem !important;
    letter-spacing: 0.2rem;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
    margin-top: 2rem;
  }

  .rows {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .slogan {
    font-style: italic;
    letter-spacing: 0.1rem;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
    margin-bottom: 2rem;
  }
  .btn_div {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
  }
  .btn {
    border-radius: 1rem;
    width: 10rem;
    border: 1px solid black;
    background: none;
    color: black;
  }

  .linear-wipe {
    text-align: center;

    background: linear-gradient(to right, #0f0 20%, #060 40%, #060 60%, #0f0 80%);
    background-size: 200% auto;

    color: #000;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: shine 15s linear infinite;
  }
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
</style>
