<script setup lang="ts">
import { PropType, computed, ref } from "vue";

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
import { IPost, useReceiptStore } from "../store/receiptStore";
import ConfirmDialog from "./ConfirmDialog.vue";

const ReceiptStore = useReceiptStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "close"]);

const show = ref(true);

// const show = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(value: boolean) {
//     return emit("update:modelValue", value);
//   },
// });
// const recepit = computed(() => props.post);
// const origTitle = recepit.value.name;
// const origContent = recepit.value.content;
// const showConfirmEdit = ref(false);
// const showConfirmDelete = ref(false);
// const showConfirmClose = ref(false);
// const resultConfirm = ref(false);

// function confirmEditPost() {
//   if (resultConfirm.value) {
//     ReceiptStore.editPostById({
//       _id: recepit.value._id,
//       title: recepit.value.name,
//       content: recepit.value.content,
//     });
//     show.value = false;
//     emit("close");
//   } else {
//     showConfirmEdit.value = false;
//   }
// }

// function confirmDeletePost() {
//   if (resultConfirm.value) {
//     ReceiptStore.deletePostById({
//       _id: recepit.value._id,
//     });
//     show.value = false;
//     emit("close");
//   } else {
//     showConfirmDelete.value = false;
//   }
// }

// function confirmCloseDialog() {
//   if (resultConfirm.value) {
//     recepit.value.name = origTitle;
//     recepit.value.content = origContent;
//     show.value = false;
//     emit("close");
//   } else {
//     showConfirmClose.value = false;
//   }
// }

// function showConfigForClose() {
//   if (isChanged.value) {
//     showConfirmClose.value = true;
//   } else {
//     show.value = false;
//     emit("close");
//   }
// }

// const isChanged = computed(
//   () => recepit.value.name != origTitle || recepit.value.content != origContent
// );

// function revertChanges() {
//   recepit.value.name = origTitle;
//   recepit.value.content = origContent;
// }
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card>
        <v-col cols="12" sm="12">
          <h1 class="title">Edit receipt</h1>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <v-text-field
            v-model="name"
            class="inputs"
            label="Name"
            prepend-icon="mdi-food-outline"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" lg="6">
          <v-text-field
            v-model="type"
            class="inputs"
            label="Type"
            prepend-icon="mdi-food-fork-drink"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" lg="12">
          <v-file-input
            accept="image/*"
            truncate-length="15"
            @change="Tobase64($event)"
            label="Picture"
            prepend-icon="mdi-panorama-variant-outline"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <v-textarea
            v-model="description"
            class="inputs"
            filled
            label="Description"
            rows="6"
            shaped
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <v-textarea
            v-model="ingredients"
            class="inputs"
            filled
            label="Ingredients"
            shaped
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <v-text-field
            v-model="energy"
            class="inputs"
            label="Energy"
            prepend-icon="mdi-lightning-bolt-circle"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <v-text-field
            v-model="time"
            class="inputs"
            label="Time"
            prepend-icon="mdi-clock-time-five"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
          <rating title="Price" @rating="ChoosePriceRate"></rating>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
          <rating title="Serving" @rating="ChooseServingRate"></rating>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
          <rating title="Difficulty" @rating="ChooseDifficultyRate"></rating>
        </v-col>
        <!-- <v-card-text>Post: {{ props.post }}</v-card-text> -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="yellow-lighten-3"
            :disabled="!isChanged"
            elevation="5"
            @click="revertChanges"
          >
            Reset
          </v-btn>
          <v-btn
            color="green-lighten-3"
            :disabled="!isChanged"
            elevation="5"
            @click="showConfirmEdit = true"
          >
            Save
          </v-btn>
          <v-btn color="blue-lighten-3" elevation="5" @click="showConfigForClose">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmDialog
      v-if="showConfirmEdit"
      v-model="showConfirmEdit"
      v-model:result="resultConfirm"
      title="Save changes"
      @close="confirmEditPost"
    />
    <ConfirmDialog
      v-if="showConfirmDelete"
      v-model="showConfirmDelete"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Delete document"
      @close="confirmDeletePost"
    />
    <ConfirmDialog
      v-if="showConfirmClose"
      v-model="showConfirmClose"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Close dialog"
      @close="confirmCloseDialog"
    />
  </v-row>
</template>
