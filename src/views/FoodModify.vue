<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useRecipeStore } from "../store/recipeStore";
  import rating from "../components/Rating.vue";
  import { useUsersStore } from "@/store/usersStore";
  import { useRoute } from "vue-router";
  import card from "../components/FoodCard.vue";
  import EditDialog from "../views/FoodAdd.vue";

  const recipeStore = useRecipeStore();
  const usersStore = useUsersStore();
  let allRecipe = ref([]);
  let user = ref({});
  const rerender = ref(0);
  const load = ref(false);
  const item = ref({});

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
  });

  const router = useRoute();
  const showConfirmEdit = ref(false);
  const resultConfirm = ref(false);

  async function Loading() {
    await usersStore.getUserById(sessionStorage.getItem("currentUser"));
    user.value = usersStore.getUser;
    console.log(user.value);
    if (user.value.name == "admin") {
      allRecipe.value = recipeStore.getRecipe;
    } else {
      await recipeStore.auhtorRecipe(sessionStorage.getItem("currentUser"));
      allRecipe.value = recipeStore.getAuthorRecipe.recipe;
    }
    load.value = true;
    console.log(sessionStorage.getItem("currentUser"));
    return load;
  }

  // const search = computed(() => recipeStore.auhtorRecipe("61d400c63aea8d9b36f5f4c9"));

  const show = ref(true);

  onMounted(() => {
    recipeStore.fetchRecipe();
  });

  function Reload() {
    showConfirmEdit.value = false;
    rerender.value += 1;
    Loading();
  }

  function picToBase64(code) {
    return "data:image/png;base64," + code;
  }

  function Modify(i) {
    item.value = i;
    showConfirmEdit.value = true;
  }
</script>

<template>
  <div :key="rerender">
    <v-container class="page" v-if="Loading()">
      <v-row v-if="!showConfirmEdit">
        <v-col v-for="(item, i) in allRecipe" :key="i" cols="12" lg="3" md="3" sm="6">
          <card :item="item" :isModify="true" @reload="Reload()" @modify="Modify" />
        </v-col>
      </v-row>
      <EditDialog
        v-if="showConfirmEdit"
        v-model="showConfirmEdit"
        v-model:result="resultConfirm"
        :retain-focus="false"
        title="Edit recipe"
        :item="item"
        isModify="true"
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
</style>
