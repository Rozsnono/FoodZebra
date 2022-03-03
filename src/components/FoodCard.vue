<script setup lang="ts">
import { computed, ref } from "vue";
import rating from "../components/Rating.vue";
const props = defineProps<{ item: object, isModify: boolean }>();

const show = ref(true);
const showDetail = ref(false);

function picToBase64(code) {
  return "data:image/png;base64," + code;
}

function showDetails(id) {
  return "/food/" + id;
  console.log(id);
}

function closeDetails() {
  showDetail.value = false;
}
</script>

<template>
  <v-card class="mx-auto card" max-width="344" :to="props.isModify ? '' : showDetails(item._id)">
    <v-img class="img" :src="picToBase64(item.pic)"></v-img>

    <v-card-title>{{ item.name }}</v-card-title>

    <v-card-actions class="rate">
      <rating :rating="item.rate" :onlyStar="false" />
    </v-card-actions>
    <v-btn color="green lighten-2" text class="btn" v-if="props.isModify">Modify</v-btn>
    <v-btn color="red lighten-2" text class="btn" v-if="props.isModify">Delete</v-btn>
  </v-card>
</template>
<style scoped>
.img {
  width: 90%;
  height: 10rem;
  margin: auto;
}

.btn{
  margin: 1rem;
  justify-content: center;
  display: flex;
}

.rate {
  margin: auto;
  justify-content: center;
  display: flex;
}
</style>