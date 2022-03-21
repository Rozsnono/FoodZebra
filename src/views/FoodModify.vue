<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useRecipeStore } from "../store/recipeStore";
  import card from "../components/FoodCard.vue";
  import EditDialog from "../views/FoodAdd.vue";

  const recipeStore = useRecipeStore();
  const allRecipe = ref([]);
  let user: string[] = [];
  let tmpUser: string;
  const rerender = ref(0);
  const load = ref(false);
  const item = ref({});

  const showConfirmEdit = ref(false);
  const resultConfirm = ref(false);

  const noR = ref(0);
  const empty = ref(false);

  const isLoading = ref(false);

  async function Loading() {
    isLoading.value = true;
    tmpUser = sessionStorage.getItem("currentUser") as string;
    user = tmpUser.split(",");

    if (user[2] == "admin@admin.com") {
      allRecipe.value = recipeStore.getRecipe as [];
    } else {
      await recipeStore.auhtorRecipe(user[0]);
      allRecipe.value = recipeStore.getAuthorRecipe.recipe;
    }
    noR.value = recipeStore.getNumberOfRecipe;
    if (noR.value === 0) {
      empty.value = true;
    } else {
      empty.value = false;
    }
    load.value = true;

    isLoading.value = false;
    return load;
  }

  // const search = computed(() => recipeStore.auhtorRecipe("61d400c63aea8d9b36f5f4c9"));

  onMounted(() => {
    recipeStore.fetchRecipe();
  });

  function Reload() {
    showConfirmEdit.value = false;
    rerender.value += 1;
    Loading();
  }

  function Modify(i) {
    item.value = i;
    showConfirmEdit.value = true;
  }

  onMounted(() => {
    Loading();
  });
</script>

<template>
  <div :key="rerender">
    <v-container class="page">
      <v-row v-if="!showConfirmEdit" class="rows">
        <v-alert v-if="empty" class="mb-5 mt-5" color="green lighten-2" dark>
          You don't have any recipes yet. Add some new one now...
          <v-btn to="addRecipe">Add</v-btn>
        </v-alert>
        <v-col v-for="(item, i) in allRecipe" :key="i" cols="12" lg="3" md="3" sm="6">
          <card :is-modify="true" :item="item" @modify="Modify" @reload="Reload()" />
        </v-col>
      </v-row>
      <v-dialog v-model="isLoading" hide-overlay persistent>
        <v-card color="background">
          <v-card-text>
            Please wait...
            <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <EditDialog
        v-if="showConfirmEdit"
        v-model="showConfirmEdit"
        v-model:result="resultConfirm"
        :isModify="true"
        :item="item"
        :retain-focus="false"
        title="Edit recipe"
        @close="Reload()"
      />
    </v-container>
  </div>
</template>
<style scoped>
  .img {
    width: 90%;
    height: 10rem;
    margin: auto;
  }

  .page {
    min-height: 90vh;
  }

  .rows {
    display: flex;
    justify-content: center;
  }
</style>
