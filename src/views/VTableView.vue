<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { VContainer } from "vuetify/components";
  import { useReceiptStore } from "../store/receiptStore";
  import rating from "../components/Rating.vue";

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
        <v-card class="mx-auto" max-width="344">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>

          <v-card-title>{{ item.name }}</v-card-title>

          <v-card-subtitle>????</v-card-subtitle>

          <v-card-actions class="mx-auto">
            <rating rate="2" />
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
      </v-col>
    </v-row>
  </v-container>
</template>
