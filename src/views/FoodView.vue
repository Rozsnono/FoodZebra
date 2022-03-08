<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VContainer } from "vuetify/components";
import { useReceiptStore } from "../store/receiptStore";
import card from "../components/FoodCard.vue";

const onePages = ref(["10", "20", "30", "50"]);
const Categories = ref([
  "Főétel",
  "Leves",
  "Valami",
  "ASD",
  "Főétel2",
  "Leves2",
  "Valami2",
  "ASD2",
]);
const load = ref(false);

const reload = ref(0);

const offset = ref(0);
const onePage = ref(10);

const allReceipt = ref([]);
const pages = ref([]);
const currentPage = ref(1);
const receiptStore = useReceiptStore();
const catValue = ref([]);

async function Loading() {
  pages.value = parseInt(receiptStore.getNumberOfReceipt / onePage.value) + 1;
  reload.value += 1;
  offset.value = (currentPage.value - 1) * onePage.value;
  await receiptStore.fetchPaginatedReceipt({
    offset: offset.value,
    limit: onePage.value.toString(),
  });
  allReceipt.value = receiptStore.getPaginatedReceipt;

  console.log(onePage.value);
  console.log(pages.value);
  load.value = true;
  return load;
}

// const allReceipt = computed(() => receiptStore.getReceipt);

const show = ref(true);

onMounted(() => {
  // receiptStore.fetchPosts();
  Loading();
});

function setPage(p) {
  console.log(currentPage.value);
}
</script>

<template>
  <v-container class="page">
    <v-row>
      <v-col cols="12" lg="3" sm="12">
        <v-text-field
          v-model="name"
          class="inputs"
          label="Search"
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="12">
        <v-select
          v-on:input="setPage($event)"
          :items="Categories"
          v-model="catValue"
          filled
          label="Category"
          prepend-icon="mdi-shape-outline"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="2" sm="12">
        <v-select
          v-on:input="setPage($event)"
          :items="onePages"
          v-model="onePage"
          filled
          label="On one page"
          prepend-icon="mdi-book-open-page-variant-outline"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="2" sm="12">
        <v-btn depressed color="success" class="btn" @click="Loading">Search</v-btn>
      </v-col>

      <v-col cols="12" lg="3" sm="12">
        <v-pagination v-model="currentPage" :length="pages" circle @click="Loading"></v-pagination>
      </v-col>
    </v-row>
    <v-row :key="reload">
      <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
        <card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.btn {
  width: 100% !important;
  margin: auto;
  margin-top: 0.5rem;
}
</style>
