<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useReceiptStore } from "../store/receiptStore";

  const receiptStore = useReceiptStore();

  const allReceipt = computed(() => receiptStore.getReceipt);

  const show = ref(false);
  const showing = () => {
    show.value = !show.value;
  };

  onMounted(() => {
    receiptStore.fetchPosts();
  });
</script>

<template>
  <v-container class="page">
    <v-card v-for="(item, i) in allReceipt" :key="i" class="mx-auto" max-width="344">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>

      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-subtitle>????</v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text>More</v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="showing">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>
