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
  <v-card class="mx-auto card">
    <v-card-title class="title">Add new Food</v-card-title>
    <v-text-field v-model="name" class="inputs" label="Name"></v-text-field>
    <v-file-input
      accept="image/*"
      truncate-length="15"
      @change="Tobase64($event)"
      label="Picture"
    ></v-file-input>
    <v-text-field v-model="type" class="inputs" label="Type"></v-text-field>
    <v-textarea
      v-model="description"
      class="inputs"
      filled
      label="Description"
      rows="6"
      shaped
    ></v-textarea>
    <v-text-field v-model="energy" class="inputs" label="Energy"></v-text-field>
    <v-text-field v-model="time" class="inputs" label="Time"></v-text-field>
    <v-textarea v-model="ingredients" class="inputs" filled label="Ingredients" shaped></v-textarea>
    <rating title="Price" @rating="ChoosePriceRate"></rating>
    <rating title="Serving" @rating="ChooseServingRate"></rating>
    <rating title="Difficulty" @rating="ChooseDifficultyRate"></rating>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green-lighten-3" elevation="5" @click="confirmSaveReceipt()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.card {
  width: 40rem !important;
}

#file-input {
  text-align: center !important;
}
.title {
  font-family: "Courier New", Courier, monospace;
  font-size: 4rem;
  text-align: center;
  margin: 2.5rem;
}

.inputs {
  margin: 0.5rem;
}
</style>
