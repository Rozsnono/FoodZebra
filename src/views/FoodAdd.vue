<script setup lang="ts">
  import { ref } from "@vue/reactivity";
  import { useRecipeStore } from "../store/recipeStore";
  import rating from "../components/Rating.vue";
  import ConfirmDialog from "../components/ConfirmDialog.vue";

  const props = defineProps<{ item: object; isModify: boolean; title: boolean }>();

  const emit = defineEmits(["close"]);

  const recipe = ref(props.item);

  const name = ref(recipe ? recipe.name : "");
  const type = ref(recipe ? recipe.type : "");
  const description = ref(recipe ? recipe.description : "");
  const energy = ref(recipe ? recipe.energy : "");
  const time = ref(recipe ? recipe.time : "");
  const price = ref(recipe ? recipe.price : "");
  const serving = ref(recipe ? recipe.serving : "");
  const difficulty = ref(recipe ? recipe.difficulty : "");
  const rate = ref(recipe ? recipe.rate : 0);
  const image = ref(recipe ? recipe.pic : "");
  const ingredients = ref(recipe ? recipe.ingredients.join("\n") : "");
  const userID = ref(sessionStorage.getItem("currentUser")?.split(",")[0]);

  const setImage = (img) => {
    image.value = img;
  };

  const setDifficulty = (getdifficulty) => {
    difficulty.value = getdifficulty;
  };

  const recipeStore = useRecipeStore();

  const showConfirmSave = ref(false);
  const showConfirmEdit = ref(false);
  const resultConfirm = ref(true);
  const showConfirm = ref(false);
  const showError = ref(false);

  async function confirmSaveRecipe() {
    if (resultConfirm.value) {
      await recipeStore.createNewRecipe({
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
        author: userID.value ? userID.value : "",
        ingredients: ingredients.value.split("\n"),
        _id: "",
      });
      let ok = await recipeStore.getCode;

      if (ok != 200) {
        showError.value = true;
      } else {
        showConfirm.value = true;
      }
    } else {
      showConfirmSave.value = false;
    }
  }

  async function confirmEditRecipe() {
    if (resultConfirm.value) {
      await recipeStore.editRecipeById({
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
        _id: recipe._id,
      });
      const ok = recipeStore.getCode;

      if (ok != 200) {
        showError.value = true;
      } else {
        showConfirmEdit.value = true;
      }
    } else {
      showConfirmSave.value = false;
    }
  }

  function Tobase64(event) {
    const selected = event.target?.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result?.toString().split(",")[1]);
    };
    reader.readAsDataURL(selected);
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
        <h1 class="title">{{ props.title ? props.title : "Add new recipe" }}</h1>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" lg="6" sm="12">
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
      <v-col cols="12" lg="12" sm="12">
        <v-file-input
          accept="image/*"
          label="Picture (max. 50 Kb)"
          prepend-icon="mdi-panorama-variant-outline"
          truncate-length="15"
          @change="Tobase64($event)"
        ></v-file-input>
      </v-col>
      <v-col cols="12" lg="6" sm="12">
        <v-textarea
          v-model="description"
          class="inputs"
          filled
          label="Description"
          rows="6"
          shaped
        ></v-textarea>
      </v-col>
      <v-col cols="12" lg="6" sm="12">
        <v-textarea
          v-model="ingredients"
          class="inputs"
          filled
          label="Ingredients"
          shaped
        ></v-textarea>
      </v-col>
      <v-col cols="12" lg="4" sm="12">
        <v-text-field
          v-model="energy"
          class="inputs"
          label="Energy"
          prepend-icon="mdi-lightning-bolt-circle"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="4" sm="12">
        <rating
          title="Difficulty"
          @rating="ChooseDifficultyRate"
          :rating="difficulty"
          :justShow="true"
        ></rating>
      </v-col>
      <v-col cols="12" lg="4" sm="12">
        <v-text-field
          v-model="time"
          class="inputs"
          label="Time"
          prepend-icon="mdi-clock-time-five"
        ></v-text-field>
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols="12" lg="3" sm="12"></v-col>
      <v-col cols="12" lg="6" sm="12">
        <v-btn
          v-if="props.isModify"
          class="btn"
          color="green-lighten-3"
          elevation="10"
          @click="confirmEditRecipe()"
        >
          Edit
        </v-btn>

        <v-btn
          v-if="!props.isModify"
          class="btn"
          color="green-lighten-3"
          elevation="10"
          @click="confirmSaveRecipe()"
        >
          Save
        </v-btn>
      </v-col>
      <v-col cols="12" lg="3" sm="12"></v-col>
    </v-row>
    <ConfirmDialog
      v-if="showError"
      v-model="showError"
      v-model:result="resultConfirm"
      color="danger"
      :justAccept="true"
      message="Something went wrong!"
      okBtn="OK"
      :retain-focus="false"
      title="Opss.."
    />
    <ConfirmDialog
      v-if="showConfirm"
      v-model="showConfirm"
      v-model:result="resultConfirm"
      :justAccept="true"
      message="The recipe is added successfully!"
      okBtn="OK"
      :retain-focus="false"
      title="Successful add"
      @close="confirm"
    />
    <ConfirmDialog
      v-if="showConfirmEdit"
      v-model="showConfirmEdit"
      v-model:result="resultConfirm"
      :justAccept="true"
      message="The recipe is modified successfully!"
      okBtn="OK"
      :retain-focus="false"
      title="Successful modify"
      @close="confirm"
    />
  </v-container>
</template>

<style scoped>
  .card {
    /* width: 80rem !important; */
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
