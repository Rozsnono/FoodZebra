<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useReceiptStore } from "../store/receiptStore";
  import card from "../components/FoodCard.vue"


  const receiptStore = useReceiptStore();

  const allReceipt = computed(() => receiptStore.getReceipt);

  const show = ref(true);

  onMounted(() => {
    receiptStore.fetchPosts();
  });

  
</script>

<template>
  <v-container class="page">
    <v-row>
      <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
        <card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
