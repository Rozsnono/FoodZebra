<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VContainer } from "vuetify/components";
import { useReceiptStore } from "../store/receiptStore";
import rating from "../components/Rating.vue";
import { useUsersStore } from "@/store/usersStore";
import { useRoute } from "vue-router";
import card from "../components/FoodCard.vue";

const receiptStore = useReceiptStore();
let allReceipt = ref([]);
const rerender = ref(0);
const load = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const router = useRoute();

async function Loading() {
  await receiptStore.auhtorReceipt(sessionStorage.getItem("currentUser"));
  allReceipt.value = receiptStore.getAuthorReceipt.receipt;
  load.value = true;
  
  return load;
}

// const search = computed(() => receiptStore.auhtorReceipt("61d400c63aea8d9b36f5f4c9"));

const show = ref(true);

onMounted(() => {
  receiptStore.fetchPosts();
});

function Reload() {
  rerender.value += 1;
  Loading();
}

function picToBase64(code) {
  return "data:image/png;base64," + code;
}
</script>

<template>
  <div :key="rerender">
    <v-container class="page" v-if="Loading()">
      <v-row>
        <v-col v-for="(item, i) in allReceipt" :key="i" cols="12" lg="3" md="4" sm="6">
          <card :item="item" :isModify="true" @reload="Reload()" />
        </v-col>
      </v-row>
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
