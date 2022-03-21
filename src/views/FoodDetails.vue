<script setup lang="ts">
  import { computed, ref, onMounted } from "vue";
  import { VBtn, VRow } from "vuetify/components";
  import rating from "../components/Rating.vue";
  import { useRecipeStore } from "../store/recipeStore";
  import { useRoute } from "vue-router";
  import ConfirmDialog from "../components/ConfirmDialog.vue";

  const recipeStore = useRecipeStore();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
  });

  interface Recipe {
    _id: string;
    name: string;
    type: string;
    description: string;
    energy: number;
    time: number;
    price: number;
    serving: number;
    difficulty: number;
    rate: number;
    pic: string;
    ingredients: string[];
  }

  const router = useRoute();

  const recipe = ref({} as Recipe);

  const showConfirmRate = ref(false);
  const resultConfirm = ref(false);

  const showConfirm = ref(false);
  const showError = ref(false);

  const rerender = ref(0);

  const rate = ref(0);

  async function Loading() {
    await recipeStore.getRecipeById(router.params.id.toString());
    recipe.value = recipeStore.getOneRecipe;

    rerender.value += 1;
  }

  function picToBase64(code) {
    return "data:image/png;base64," + code;
  }

  function difficult(dif: number): string {
    switch (dif) {
      case 1:
        return "Very easy";
      case 2:
        return "Easy";
      case 3:
        return "Medium";
      case 4:
        return "Hard";
      case 5:
        return "Really hard";
      default:
        return "Impossible";
    }
  }

  function ShowRate() {
    showConfirmRate.value = true;
  }

  function getRating(v) {
    rate.value = v;
  }

  function recipeRateCounter(plusRate: number) {
    return recipe.value.rate == 0
      ? plusRate
      : (recipe.value.rate == null ? 0 : recipe.value.rate + plusRate) / 2;
  }

  async function confirmRate() {
    if (resultConfirm.value) {
      await recipeStore.ratingRecipe({
        _id: recipe.value._id,
        rate: recipeRateCounter(rate.value),
      });
      let ok = await recipeStore.getCode;
      if (ok !== 200) {
        showError.value = true;
      } else {
        showConfirm.value = true;
        Loading();
      }
    } else {
      showConfirmRate.value = false;
    }
  }

  onMounted(() => {
    Loading();
  });
</script>

<template>
  <v-container class="popup">
    <ConfirmDialog
      v-if="showConfirmRate"
      v-model="showConfirmRate"
      v-model:result="resultConfirm"
      cancel-btn="Close"
      message="rating"
      ok-btn="Rating"
      :retain-focus="false"
      title="Rating Recipe"
      @close="confirmRate"
      @resultData="getRating"
    />

    <ConfirmDialog
      v-if="showError"
      v-model="showError"
      v-model:result="resultConfirm"
      color="danger"
      :just-accept="true"
      message="Something went wrong!"
      ok-btn="OK"
      :retain-focus="false"
      title="Opss.."
      @close="confirm"
    />
    <ConfirmDialog
      v-if="showConfirm"
      v-model="showConfirm"
      v-model:result="resultConfirm"
      :just-accept="true"
      message="You have rated this recipe!"
      ok-btn="OK"
      :retain-focus="false"
      title="Successfull rating"
      @close="confirm"
    />
    <v-row :key="rerender">
      <v-col cols="12" sm="12">
        <div class="imgDiv">
          <!-- <v-img alt="Food" class="img-in" :src="picToBase64(recipe.pic)"></v-img>  -->
          <img alt="Food" class="img-in" :src="picToBase64(recipe.pic)" />
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="name">
          {{ recipe.name }}
        </div>
      </v-col>
      <div class="rating">
        <rating only-star="false" :rating="recipe.rate"></rating>

        <v-btn color="yellow lighten-2" text @click="ShowRate()">Rating</v-btn>
      </div>

      <v-divider></v-divider>

      <v-col class="icon" cols="12" lg="4" sm="12">
        <v-icon class="in-icon">mdi-clock</v-icon>
        <div class="in-text">{{ recipe.time }} min</div>
      </v-col>
      <v-col class="icon" cols="12" lg="4" sm="12">
        <v-icon class="in-icon">mdi-lightning-bolt-circle</v-icon>
        <div class="in-text">{{ recipe.energy }} cal</div>
      </v-col>
      <v-col class="icon" cols="12" lg="4" sm="12">
        <v-icon class="in-icon">mdi-chef-hat</v-icon>
        <div class="in-text">{{ difficult(recipe.difficulty) }}</div>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="2" md="1" sm="1">
        <p class="type">{{ recipe.type }}</p>
      </v-col>
      <v-col cols="10" md="5" sm="5">
        <h2 class="i-title">Description</h2>
        <p class="description">
          {{ recipe.description }}
        </p>
      </v-col>
      <v-col cols="12" md="1" sm="0"></v-col>
      <v-col cols="12" md="5" sm="12">
        <div class="ingredients">
          <h2 class="i-title">Ingredients</h2>
          <ul>
            <li v-for="(item, i) in recipe.ingredients" :key="i">{{ item }}</li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
  .popup {
    background-color: #00000020;
    border-radius: 2rem;
    padding: 2rem;
    width: 100%;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
  }

  .name {
    float: left;
    margin: 2rem;
    font-size: 2rem;
  }
  .type {
    writing-mode: vertical-rl;
    text-orientation: upright;
    background-color: #00000020;
    border-radius: 1rem;
    padding: 0.3rem;
  }
  .description {
    text-align: justify;
    margin-top: 3rem;
  }
  .imgDiv {
    width: 80%;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 1px solid black;
    border-radius: 1rem;
    box-shadow: 1px 1px 10px 2px black;
    background-color: #00000070;
  }

  .img-in {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    .img-in {
      margin: auto;
      width: 60%;
    }
  }
  .icon {
    font-size: 3rem;
    justify-content: center;
    display: flex;
    .in-text {
      font-size: 2rem;
      margin: auto;
      margin-left: 0.5rem;
    }
  }
  .ratingStars {
  }
  .i-title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .rating {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    .v-btn {
      margin: 0.8rem;
    }
  }

  .card {
    position: absolute;
    top: -0rem;
    left: -30rem;
    width: 80rem;
    margin: auto;
  }
  .end {
    float: right;
    text-align: end;
    display: flex;
    justify-content: end;
    position: absolute;
    right: 0;
    margin-right: 1rem;
  }
</style>
