<script setup lang="ts">
import { computed, ref } from "vue";
import rating from "../components/Rating.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";

import { useReceiptStore } from "@/store/receiptStore";
const props = defineProps<{ item: object; isModify: boolean }>();

const show = ref(true);
const showDetail = ref(false);
const showConfirmDelete = ref(false);
const showConfirm = ref(false);
const showError = ref(false);

const title = ref("");

const resultConfirm = ref(false);

const emit = defineEmits(["reload", "modify"]);

const ReceiptStore = useReceiptStore();
const receipt = props.item;

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

function confirm() {
  showConfirm.value = false;
  emit("reload");
}

async function confirmDeletePost() {
  if (resultConfirm.value) {
    await ReceiptStore.deleteReceiptById({
      _id: receipt._id,
    });
    let ok = await ReceiptStore.getCode;
    show.value = false;
    console.log(ok);
    if (ok != 200) {
      showError.value = true;
    } else {
      showConfirm.value = true;
    }
  } else {
    showConfirmDelete.value = false;
  }
}

function showEdit() {
  emit("modify", props.item);
}
</script>

<template>
  <v-card
    class="mx-auto card"
    max-width="344"
    :to="props.isModify ? '' : showDetails(item._id)"
    v-if="!showConfirmEdit"
  >
    <v-img class="img" :src="picToBase64(item.pic)"></v-img>

    <v-card-title>{{ item.name }}</v-card-title>

    <v-card-actions class="rate">
      <rating :rating="item.rate" :onlyStar="false" />
    </v-card-actions>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" lg="6">
          <v-btn color="green lighten-2" text class="btn" v-if="props.isModify" @click="showEdit()">
            Modify
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" lg="6">
          <v-btn
            color="red lighten-2"
            text
            class="btn"
            v-if="props.isModify"
            @click="showConfirmDelete = true"
          >
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <ConfirmDialog
    v-if="showConfirmDelete"
    v-model="showConfirmDelete"
    v-model:result="resultConfirm"
    :retain-focus="false"
    title="Delete document"
    @close="confirmDeletePost"
  />

  <ConfirmDialog
    v-if="showConfirm"
    v-model="showConfirm"
    v-model:result="resultConfirm"
    :retain-focus="false"
    title="Successful delete"
    okBtn="OK"
    :justAccept="true"
    message="The receipt is deleted successfully!"
    @close="confirm"
  />

  <ConfirmDialog
      v-if="showError"
      v-model="showError"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Opss.."
      okBtn="OK"
      :justAccept="true"
      message="Something went wrong!"
      @close="confirm"
      color="danger"
    />
</template>
<style scoped>
.card {
  background-color: #00000040;
  border-radius: 1rem;
  padding: 1rem;
}

.img {
  width: 90%;
  height: 10rem;
  margin: auto;
}

.btn {
  justify-content: center !important;
  display: flex !important;
}

.rate {
  margin: auto;
  justify-content: center;
  display: flex;
}
</style>