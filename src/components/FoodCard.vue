<script setup lang="ts">
  import { ref } from "vue";
  import rating from "../components/Rating.vue";
  import ConfirmDialog from "../components/ConfirmDialog.vue";

  import { useRecipeStore } from "@/store/recipeStore";
  const props = defineProps<{ item: object; isModify: boolean }>();

  const show = ref(true);
  const showConfirmDelete = ref(false);
  const showConfirm = ref(false);
  const showError = ref(false);

  const resultConfirm = ref(false);

  const emit = defineEmits(["reload", "modify"]);

  const RecipeStore = useRecipeStore();

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

  let recipe: Recipe;
  recipe = props.item as Recipe;

  function picToBase64(code) {
    return "data:image/png;base64," + code;
  }

  function showDetails(id) {
    return "/recipe/" + id;
  }

  function confirm() {
    showConfirm.value = false;
    emit("reload");
  }

  async function confirmDeletePost() {
    if (resultConfirm.value) {
      await RecipeStore.deleteRecipeById({
        _id: recipe._id,
      });
      let ok = await RecipeStore.getCode;
      show.value = false;
      if (ok != 200) {
        showError.value = true;
      } else {
        showConfirm.value = true;
      }
    } else {
      showConfirmDelete.value = false;
    }
  }

  function showEdit() {
    emit("modify", props.item);
  }
</script>

<template>
  <v-card class="mx-auto card" max-width="344" :to="props.isModify ? '' : showDetails(recipe._id)">
    <div class="img-div">
      <v-img class="img-in" :src="picToBase64(recipe.pic)"></v-img>
    </div>

    <v-card-title class="title">{{ recipe.name }}</v-card-title>

    <v-card-actions class="rate">
      <rating :just-show="false" only-star="false" :rating="recipe.rate" title="" />
    </v-card-actions>
    <v-container>
      <v-row>
        <v-col cols="6" lg="6" sm="6">
          <v-btn v-if="props.isModify" class="btn" color="green lighten-2" text @click="showEdit()">
            Modify
          </v-btn>
        </v-col>
        <v-col cols="6" lg="6" sm="6">
          <v-btn
            v-if="props.isModify"
            class="btn"
            color="red lighten-2"
            text
            @click="showConfirmDelete = true"
          >
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <ConfirmDialog
    v-if="showConfirmDelete"
    v-model="showConfirmDelete"
    v-model:result="resultConfirm"
    :retain-focus="false"
    title="Delete document"
    @close="confirmDeletePost"
  />

  <ConfirmDialog
    v-if="showConfirm"
    v-model="showConfirm"
    v-model:result="resultConfirm"
    :just-accept="true"
    message="The recipe is deleted successfully!"
    ok-btn="OK"
    :retain-focus="false"
    title="Successful delete"
    @close="confirm"
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
</template>
<style scoped>
  .card {
    background-color: #00000040;
    border-radius: 1rem;
    padding: 1rem;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  .title {
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
  }
  .img-div {
    width: 80%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
    margin-bottom: 1rem;
    border: 1px solid black;
    border-radius: 1rem;
    box-shadow: 1px 1px 10px 2px black;
  }

  .img-in {
    min-width: 20rem;
    min-height: 16rem;
    flex-shrink: 0;
  }

  .btn {
    justify-content: center !important;
    display: flex !important;
  }

  .rate {
    margin: auto;
    justify-content: center;
    display: flex;
  }
</style>
