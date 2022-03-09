<script setup lang="ts">
import { useReceiptStore } from "@/store/receiptStore";
import card from "../components/FoodCard.vue";
import { ref } from "vue";
const version = ref(5);
const receiptStore = useReceiptStore();
const allReceipt = ref([]);

async function Loading() {
  await receiptStore.fetchPaginatedReceipt({
    offset: 0,
    limit: "3",
    keyword: "",
  });
  allReceipt.value = receiptStore.getPaginatedReceipt;
  console.log(allReceipt);
  return true;
}
</script>
<template>
  <div class="d-flex flex-column text-center" style="min-height: 90vh">
    <h1 class="title linear-wipe">Welcome to FoodZebra</h1>
    <h5 class="slogan">Where your favourite receipt find you</h5>
    <v-container>
      <v-row :key="reload" v-if="Loading()">
        <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
          <card :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.title {
  font-size: 4rem !important;
  letter-spacing: 0.2rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
    sans-serif;
}

.slogan {
  font-style: italic;
  letter-spacing: 0.1rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
    sans-serif;
}

.linear-wipe {
  text-align: center;

  background: linear-gradient(to right, #0f0 20%, #060 40%, #060 60%, #0f0 80%);
  background-size: 200% auto;

  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: shine 15s linear infinite;
}
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>