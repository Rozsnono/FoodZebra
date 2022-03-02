<script setup lang="ts">
import { computed, ref } from "vue";
import {
  VBtn,
  VCard,
  VCardActions,
  VCardTitle,
  VDialog,
  VRow,
  VSpacer,
  VTextarea,
  VTextField,
} from "vuetify/components";
import ConfirmDialog from "./ConfirmDialog.vue";
import rating from "../components/Rating.vue";
import { useReceiptStore } from "../store/receiptStore";

const ReceiptStore = useReceiptStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
  },
});

const title = ref("");
const content = ref("");

const receipt = props.item;
console.log(receipt);

const showConfirmSave = ref(false);
const showConfirmClose = ref(false);
const resultConfirm = ref(false);


function closeDialog() {
  show.value = false;
    emit("close");
}

function picToBase64(code) {
  return "data:image/png;base64," + code;
}

const isChanged = computed(() => title.value != "" && content.value != "");
</script>

<template>
  <v-row justify="center ">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card :loading="loading" class="mx-auto card" max-width="374">
        <v-img height="250" :src="picToBase64(receipt.pic)"></v-img>

        <v-card-title>{{ receipt.name }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <rating
              :rating="receipt.rate"
              :onlyStar="false"
            ></rating>
          </v-row>

          
          <div class="my-4 text-subtitle-1"><v-chip>{{ receipt.type }}</v-chip></div>

          <div>
            {{ receipt.description }}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Ingredients:</v-card-title>

        <v-card-text>
          <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
            <v-chip>5:30PM</v-chip>

            <v-chip>7:30PM</v-chip>

            <v-chip>8:00PM</v-chip>

            <v-chip>9:00PM</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="closeDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped>
  .card{
    margin-top: -50%;
  }
</style>