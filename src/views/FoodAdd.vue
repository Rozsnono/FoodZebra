<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useReceiptStore } from "../store/receiptStore";
import rating from "../components/Rating.vue";

const name = ref("");
const type = ref("");
const description = ref("");
const energy = ref(0);
const time = ref(0);
const price = ref(0);
const serving = ref(0);
const difficulty = ref(0);
const rate = ref(0);
const image = ref("");
const ingredients = ref("");

const setImage = (img) => {
  image.value = img;
};

const setPrice = (getprice) => {
  price.value = getprice;
};

const setServing = (getserving) => {
  serving.value = getserving;
};

const setDifficulty = (getdifficulty) => {
  difficulty.value = getdifficulty;
};

const receiptStore = useReceiptStore();

const showConfirmSave = ref(false);
const showConfirmClose = ref(false);
const resultConfirm = ref(true);

function confirmSaveReceipt() {
  if (resultConfirm.value) {
    receiptStore.createNewReceipt({
      name: name.value,
      type: type.value,
      description: description.value,
      energy: parseInt(energy.value.toString()),
      time: parseInt(time.value.toString()),
      price: price.value,
      serving: serving.value,
      difficulty: difficulty.value,
      pic: image.value,
      rate: rate.value,
      ingredients: ingredients.value.split("\n"),
      _id: "",
    });
  } else {
    showConfirmSave.value = false;
  }
}

function Tobase64(event) {
  const selected = event.target?.files[0];
  const reader = new FileReader();
  let rawFile = "";
  reader.onloadend = () => {
    rawFile = reader.result;
    setImage(rawFile.split(",")[1]);
  };
  reader.readAsDataURL(selected);
}

function ChoosePriceRate(value) {
  console.log(value);
  setPrice(value);
}
function ChooseServingRate(value) {
  setServing(value);
}
function ChooseDifficultyRate(value) {
  setDifficulty(value);
}
</script>

<template>
  <v-container class="card">
    <v-row>
      <v-col cols="12" sm="12">
        <h1 class="title">Add new food</h1>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-text-field
          v-model="name"
          class="inputs"
          label="Name"
          prepend-icon="mdi-food-outline"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" lg="6">
        <v-text-field
          v-model="type"
          class="inputs"
          label="Type"
          prepend-icon="mdi-food-fork-drink"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" lg="12">
        <v-file-input
          accept="image/*"
          truncate-length="15"
          @change="Tobase64($event)"
          label="Picture"
          prepend-icon="mdi-panorama-variant-outline"
        ></v-file-input>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-textarea
          v-model="description"
          class="inputs"
          filled
          label="Description"
          rows="6"
          shaped
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-textarea
          v-model="ingredients"
          class="inputs"
          filled
          label="Ingredients"
          shaped
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-text-field
          v-model="energy"
          class="inputs"
          label="Energy"
          prepend-icon="mdi-lightning-bolt-circle"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-text-field
          v-model="time"
          class="inputs"
          label="Time"
          prepend-icon="mdi-clock-time-five"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <rating title="Price" @rating="ChoosePriceRate"></rating>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <rating title="Serving" @rating="ChooseServingRate"></rating>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <rating title="Difficulty" @rating="ChooseDifficultyRate"></rating>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="12" lg="3"></v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-btn color="green-lighten-3" class="btn" elevation="10" @click="confirmSaveReceipt()">
          Save
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12" lg="3"></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card {
  width: 80rem !important;
  background-color: #00000030;
  border-radius: 2rem;
  padding: 2rem;
}

#file-input {
  text-align: center !important;
}
.title {
  font-size: 4rem;
  text-align: center;
  margin: 2.5rem;
  display: flex;
  justify-content: center;
}

.btn {
  width: 100%;
}

.inputs {
  margin: 0.5rem;
}
</style>
