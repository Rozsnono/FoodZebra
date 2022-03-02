<script setup lang="ts">
import { computed, ref } from "vue";
import rating from "../components/Rating.vue";
import detail from "./FoodDetails.vue";
const props = defineProps<{ item: object }>();

const show = ref(true);
const showDetail = ref(false);

function picToBase64(code) {
  return "data:image/png;base64," + code;
}

function showDetails(id) {
  console.log(id);
  showDetail.value = true;
}

function closeDetails(){
    showDetail.value = false;
}
</script>

<template>
  <v-card class="mx-auto card" max-width="344" @click="showDetails(item._id)">
    <v-img class="img" :src="picToBase64(item.pic)"></v-img>

    <v-card-title>{{ item.name }}</v-card-title>

    <v-card-actions class="rate">
      <rating :rating="item.rate" :onlyStar="false" />
    </v-card-actions>
  </v-card>

  <detail v-if="showDetail" v-model="showDetail" :item="item" @close="closeDetails"/>
</template>
<style scoped>
.img {
  width: 90%;
  height: 10rem;
  margin: auto;
}

.rate {
  margin: auto;
  justify-content: center;
  display: flex;
}
</style>