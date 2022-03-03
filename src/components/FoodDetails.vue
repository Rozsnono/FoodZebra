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
  set(value: boolean) {},
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
      <v-card :loading="loading" class="card">
        <v-img height="250" :src="picToBase64(receipt.pic)"></v-img>

        <v-card-title>
          {{ receipt.name }}
          <div class="end">
            <v-chip>{{ receipt.type }}</v-chip>
          </div>
        </v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <rating :rating="receipt.rate" :onlyStar="false"></rating>
          </v-row>

          <div>
            {{ receipt.description }}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fuga nemo nam nisi in pariatur est placeat sint, excepturi quas officiis ut, non nulla exercitationem voluptate itaque adipisci architecto? Expedita?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consectetur cum qui praesentium reiciendis voluptatem aperiam repellendus dolorem consequuntur pariatur. Vel, sequi commodi. Ipsum exercitationem inventore aperiam nam, deserunt nostrum?
            Illum deleniti error et corrupti velit a tenetur quaerat dolores doloremque hic animi vel qui deserunt beatae officiis sed aliquid quia, nemo dolor excepturi culpa blanditiis quas nobis porro? Ea?
            Soluta et ea nobis, adipisci, facere sapiente velit a vero veritatis commodi ipsam magnam, laboriosam minus provident tempora dolor. Quos odit molestiae eos. Corporis ullam accusamus porro commodi nobis sed!
            Ipsam obcaecati, ab maxime reiciendis cum voluptates repellendus explicabo magni odit eum provident nihil, quidem corporis porro dolores adipisci labore qui assumenda unde soluta accusamus fuga vero alias! Magni, odio!
            Cupiditate hic fuga placeat exercitationem qui aliquid quasi possimus, laudantium nam vero sit doloribus accusamus recusandae maiores! Ullam sunt est et omnis consequatur reprehenderit, qui quidem sequi vitae ab animi.
          </div>

          <div class="my-4 text-subtitle-1"></div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Ingredients:</v-card-title>

        <v-card-text>
          <ul>
            <li v-for="(item, i) in receipt.ingredients" :key="i">{{ item }}</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="closeDialog()">Close</v-btn>
          <v-btn color="green lighten-2" text @click="closeDialog()">Rating</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped>
.card {
  position: absolute;
  top: -20rem;
  width: 100rem;
  margin: auto;
}
.end {
  float: right;
  text-align: end;
  display: flex;
  justify-content: end;
  position: absolute;
  right: 0;
  margin-right: 1rem;
}
</style>