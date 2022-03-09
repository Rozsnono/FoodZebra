<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VContainer } from "vuetify/components";
import { useReceiptStore } from "../store/receiptStore";
import card from "../components/FoodCard.vue";

const onePages = ref(["12", "20", "32", "48"]);
const Categories = ref([]);
const load = ref(false);

const reload = ref(0);
const isLoading = ref(false);

const offset = ref(0);
const onePage = ref(12);

const allReceipt = ref([]);
const pages = ref([]);
const currentPage = ref(1);
const receiptStore = useReceiptStore();
const catValue = ref("");

const name = ref("");

async function Loading() {
  isLoading.value = true;
  reload.value += 1;
  offset.value = (currentPage.value - 1) * onePage.value;
  await receiptStore.fetchPaginatedReceipt({
    offset: offset.value,
    limit: onePage.value.toString(),
    keyword: name.value,
  });
  allReceipt.value = receiptStore.getPaginatedReceipt;
  pages.value =
    parseInt(
      (receiptStore.getNumberOfReceipt ? receiptStore.getNumberOfReceipt : 0) / onePage.value
    ) + 1;
  console.log(onePage.value);
  console.log(pages.value);
  load.value = true;
  isLoading.value = false;
  return load;
}

// const allReceipt = computed(() => receiptStore.getReceipt);

const show = ref(true);

onMounted(() => {
  Loading();
});

function setPage(v) {
  console.log(v);
}
</script>

<template>
  <v-container class="page" style="min-height: 90vh">
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
          :items="onePages"
          v-model="onePage"
          filled
          label="On one page"
          prepend-icon="mdi-book-open-page-variant-outline"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" sm="12">
        <v-btn depressed color="success" class="btn" @click="Loading">Search</v-btn>
      </v-col>

      <v-col cols="12" lg="4" sm="12">
        <v-pagination v-model="currentPage" :length="pages" circle @click="Loading"></v-pagination>
      </v-col>
    </v-row>
    <v-row :key="reload">
      <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
        <card :item="item" />
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="isLoading" hide-overlay persistent>
    <v-card color="background">
      <v-card-text>
        Please wait...
        <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.btn {
  width: 100% !important;
  margin: auto;
  margin-top: 0.5rem;
}
</style>
