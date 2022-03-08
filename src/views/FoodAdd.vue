<script setup lang="ts">
  import { ref } from "@vue/reactivity";
  import { useReceiptStore } from "../store/receiptStore";
  import rating from "../components/Rating.vue";
  import ConfirmDialog from "../components/ConfirmDialog.vue";

  const props = defineProps<{ item: object; isModify: boolean; title: boolean }>();
  console.log(props.item);

  const emit = defineEmits(["close"]);

  const name = ref(props.item ? props.item.name : "");
  const type = ref(props.item ? props.item.type : "");
  const description = ref(props.item ? props.item.description : "");
  const energy = ref(props.item ? props.item.energy : "");
  const time = ref(props.item ? props.item.time : "");
  const price = ref(props.item ? props.item.price : "");
  const serving = ref(props.item ? props.item.serving : "");
  const difficulty = ref(props.item ? props.item.difficulty : "");
  const rate = ref(props.item ? props.item.rate : 0);
  const image = ref(props.item ? props.item.pic : "");
  const ingredients = ref(props.item ? props.item.ingredients.join("\n") : "");
  const userID = ref(sessionStorage.getItem("currentUser"));

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
  const showConfirmEdit = ref(false);
  const showConfirmClose = ref(false);
  const resultConfirm = ref(true);
  const showConfirm = ref(false);

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
        author: userID.value,
        ingredients: ingredients.value.split("\n"),
        _id: "",
      });

      showConfirm.value = true;
    } else {
      showConfirmSave.value = false;
    }
  }

  function confirmEditReceipt() {
    if (resultConfirm.value) {
      console.log(ingredients.value);
      receiptStore.editReceiptById({
        name: name.value,
        type: type.value,
        description: description.value,
        energy: parseInt(energy.value.toString()),
        time: parseInt(time.value.toString()),
        price: price.value,
        serving: serving.value,
        difficulty: difficulty.value,
        pic: image.value,
        ingredients: ingredients.value.split("\n"),
        _id: props.item._id,
      });
      showConfirmEdit.value = true;
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

  function confirm() {
    emit("close");
  }
</script>

<template>
  <v-container class="card">
    <v-row>
      <v-col cols="12" sm="12">
        <h1 class="title">{{ props.title ? props.title : "Add new receipt" }}</h1>
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
        <rating title="Price" @rating="ChoosePriceRate" :rating="price" :justShow="true"></rating>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <rating
          title="Serving"
          @rating="ChooseServingRate"
          :rating="serving"
          :justShow="true"
        ></rating>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <rating
          title="Difficulty"
          @rating="ChooseDifficultyRate"
          :rating="difficulty"
          :justShow="true"
        ></rating>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="12" lg="3"></v-col>
      <v-col cols="12" sm="12" lg="6">
        <v-btn
          color="green-lighten-3"
          class="btn"
          elevation="10"
          @click="confirmEditReceipt()"
          v-if="props.isModify"
        >
          Edit
        </v-btn>

        <v-btn
          color="green-lighten-3"
          class="btn"
          elevation="10"
          @click="confirmSaveReceipt()"
          v-if="!props.isModify"
        >
          Save
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12" lg="3"></v-col>
    </v-row>
    <ConfirmDialog
      v-if="showConfirm"
      v-model="showConfirm"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Successful add"
      okBtn="OK"
      :justAccept="true"
      message="The receipt is added successfully!"
      @close="confirm"
    />
    <ConfirmDialog
      v-if="showConfirmEdit"
      v-model="showConfirmEdit"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Successful modify"
      okBtn="OK"
      :justAccept="true"
      message="The receipt is modified successfully!"
      @close="confirm"
    />
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
