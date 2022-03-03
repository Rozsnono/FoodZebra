<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VContainer } from "vuetify/components";
import { useReceiptStore } from "../store/receiptStore";
import rating from "../components/Rating.vue";
import { useUsersStore } from "@/store/usersStore";
import { useRoute } from "vue-router";

const receiptStore = useReceiptStore();
let allReceipt = ref([]);
const load = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

const router = useRoute();

async function Loading() {
  // await receiptStore.auhtorReceipt();
  console.log(router.params);
  allReceipt.value = receiptStore.getAuthorReceipt.receipt;
  console.log(allReceipt);
  load.value = true;
  return load;
}

// const search = computed(() => receiptStore.auhtorReceipt("61d400c63aea8d9b36f5f4c9"));

const show = ref(true);

onMounted(() => {
  receiptStore.fetchPosts();
});

function picToBase64(code) {
  return "data:image/png;base64," + code;
}
</script>

<template>
  <v-container class="page" v-if="Loading()">
    <v-row>
      <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
        <v-card class="mx-auto" max-width="344">
          <v-img class="img" :src="picToBase64(item.pic)"></v-img>

          <v-card-title>{{ item.name }}</v-card-title>

          <v-card-subtitle>????</v-card-subtitle>

          <v-card-actions class="mx-auto">
            <rating :rating="item.rate" />
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
<style scoped>
.img {
  width: 90%;
  height: 10rem;
  margin: auto;
}
</style>
