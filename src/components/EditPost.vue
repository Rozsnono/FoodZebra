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

  const show = computed({
    get() {
      return props.modelValue;
    },
    set(value: boolean) {
      return emit("update:modelValue", value);
    },
  });
  const recepit = computed(() => props.post);
  const origTitle = recepit.value.name;
  const origContent = recepit.value.content;
  const showConfirmEdit = ref(false);
  const showConfirmDelete = ref(false);
  const showConfirmClose = ref(false);
  const resultConfirm = ref(false);

  function confirmEditPost() {
    if (resultConfirm.value) {
      ReceiptStore.editPostById({
        _id: recepit.value._id,
        title: recepit.value.name,
        content: recepit.value.content,
      });
      show.value = false;
      emit("close");
    } else {
      showConfirmEdit.value = false;
    }
  }

  function confirmDeletePost() {
    if (resultConfirm.value) {
      ReceiptStore.deletePostById({
        _id: recepit.value._id,
      });
      show.value = false;
      emit("close");
    } else {
      showConfirmDelete.value = false;
    }
  }

  function confirmCloseDialog() {
    if (resultConfirm.value) {
      recepit.value.name = origTitle;
      recepit.value.content = origContent;
      show.value = false;
      emit("close");
    } else {
      showConfirmClose.value = false;
    }
  }

  function showConfigForClose() {
    if (isChanged.value) {
      showConfirmClose.value = true;
    } else {
      show.value = false;
      emit("close");
    }
  }

  const isChanged = computed(
    () => recepit.value.name != origTitle || recepit.value.content != origContent
  );

  function revertChanges() {
    recepit.value.name = origTitle;
    recepit.value.content = origContent;
  }
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card>
        <v-card-title class="text-h5">Post: {{ recepit._id }}</v-card-title>
        <!-- <v-card-text>Post: {{ props.post }}</v-card-text> -->
        <v-text-field v-model="recepit.name" class="mb-1" label="Title"></v-text-field>
        <v-textarea v-model="recepit.content" filled label="Content" rows="6" shaped></v-textarea>
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
            color="red-lighten-3"
            :disabled="isChanged"
            elevation="5"
            @click="showConfirmDelete = true"
          >
            Delete
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
