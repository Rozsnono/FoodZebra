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
import { useRoute } from "vue-router";

const receiptStore = useReceiptStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

const router = useRoute();
const emit = defineEmits(["close"]);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {},
});

let receipt;

await receiptStore.getReceiptById(router.params.id.toString());
receipt = receiptStore.getOneReceipt;
console.log(receipt._id);


function picToBase64(code) {
  return "data:image/png;base64," + code;
}
</script>

<template>
  <v-container class="popup">
    <v-row>
      <v-col cols="12" sm="12">
        <v-img :src="picToBase64(receipt.pic)" alt="Food" class="img"></v-img>
      </v-col>
      <v-col cols="12" sm="12">
        <div>
          {{ receipt.name }}
        </div>
        <div>
          <v-chip>{{ receipt.type }}</v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-row justify="center ">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card :loading="loading" class="card">
        

        <v-card-title>
          
          <div class="end">
            
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
  </v-row> -->
</template>
<style scoped>
.popup {
  background-color: aliceblue;
  width: 200%;
}

.img {
  width: 50%;
}
.card {
  position: absolute;
  top: -0rem;
  left: -30rem;
  width: 80rem;
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