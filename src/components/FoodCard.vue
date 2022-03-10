<script setup lang="ts">
import { computed, ref } from "vue";
import rating from "../components/Rating.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";

import { useRecipeStore } from "@/store/recipeStore";
const props = defineProps<{ item: object; isModify: boolean }>();

const show = ref(true);
const showDetail = ref(false);
const showConfirmDelete = ref(false);
const showConfirm = ref(false);
const showError = ref(false);

const title = ref("");

const resultConfirm = ref(false);

const emit = defineEmits(["reload", "modify"]);

const RecipeStore = useRecipeStore();
const recipe = props.item;

function picToBase64(code) {
  return "data:image/png;base64," + code;
}

function showDetails(id) {
  return "/recipe/" + id;
}

function closeDetails() {
  showDetail.value = false;
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
  <v-card
    class="mx-auto card"
    max-width="344"
    :to="props.isModify ? '' : showDetails(item._id)"
    v-if="!showConfirmEdit"
  >
    <v-img class="img">
      <v-img class="img-in" :src="picToBase64(item.pic)"></v-img>
    </v-img>

    <v-card-title class="title">{{ item.name }}</v-card-title>

    <v-card-actions class="rate">
      <rating :rating="item.rate" :onlyStar="false" />
    </v-card-actions>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" lg="6">
          <v-btn color="green lighten-2" text class="btn" v-if="props.isModify" @click="showEdit()">
            Modify
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" lg="6">
          <v-btn
            color="red lighten-2"
            text
            class="btn"
            v-if="props.isModify"
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
    :retain-focus="false"
    title="Successful delete"
    okBtn="OK"
    :justAccept="true"
    message="The recipe is deleted successfully!"
    @close="confirm"
  />

  <ConfirmDialog
    v-if="showError"
    v-model="showError"
    v-model:result="resultConfirm"
    :retain-focus="false"
    title="Opss.."
    okBtn="OK"
    :justAccept="true"
    message="Something went wrong!"
    @close="confirm"
    color="danger"
  />
</template>
<style scoped>
.card {
  background-color: #00000040;
  border-radius: 1rem;
  padding: 1rem;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.title{
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
}
.img {
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
  min-width: 100%;
  min-height: 100%;
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
