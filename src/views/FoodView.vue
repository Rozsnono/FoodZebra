<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useReceiptStore } from "../store/receiptStore";
  import card from "../components/FoodCard.vue";

  const onePages = ref(["10", "20", "30", "50"]);
  const Categories = ref(["Főétel", "Leves", "Valami", "ASD"]);
  const load = ref(false);

  const offset = ref(0);
  const onePage = ref(10);

  const allReceipt = ref([]);
  const pages = ref([]);
  const receiptStore = useReceiptStore();

  async function Loading() {
    await receiptStore.fetchPaginatedReceipt({
      offset: 0,
      limit: "10",
    });
    allReceipt.value = receiptStore.getPaginatedReceipt;
    for (
      let index = 0;
      index < parseInt(receiptStore.getNumberOfReceipt / onePage.value) + 1;
      index++
    ) {
      pages.value.push(index + 1);
    }

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
      <v-col cols="12" lg="3" sm="12">
        <v-select
          :items="Categories"
          filled
          label="Categories"
          prepend-icon="mdi-shape-outline"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" sm="12">
        <v-select
          :items="onePages"
          v-model="onePage"
          filled
          label="On one page"
          prepend-icon="mdi-book-open-page-variant-outline"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" sm="12">
        <v-pagination v-model="pages" :length="4" circle></v-pagination>
      </v-col>
    </v-row>
    <v-row v-if="Loading()">
      <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
        <card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
