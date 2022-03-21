<script setup lang="ts">
  import {
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VDialog,
    VRow,
    VSpacer,
  } from "vuetify/components";
  import rate from "../components/Rating.vue";
  import { computed, ref } from "vue";

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      default: "Delete record",
    },
    message: {
      type: String,
      default: "Are yue sure?",
    },
    okBtn: {
      type: String,
      default: "Yes",
    },
    cancelBtn: {
      type: String,
      default: "No",
    },
    result: {
      type: Boolean,
      default: true,
      required: true,
    },
    resultData: {
      type: Number,
      default: 200,
      required: true,
    },
    justAccept: {
      type: Boolean,
      default: false,
      required: false,
    },
    color: {
      type: String,
      default: "Green",
      required: false,
    },
  });
  const emit = defineEmits(["update:modelValue", "update:result", "close", "resultData"]);

  const rating = ref(0);

  const show = computed({
    get() {
      return props.modelValue;
    },
    set(value: boolean) {
      return emit("update:modelValue", value);
    },
  });

  const res = computed({
    get() {
      return props.result;
    },
    set(value: boolean) {
      return emit("update:result", value);
    },
  });

  function pressOk() {
    res.value = true;
    show.value = false;
    emit("resultData", rating.value);
    emit("close");
  }

  function pressCancel() {
    res.value = false;
    show.value = false;
    emit("close");
  }

  function addRating(data) {
    rating.value = data;
  }
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="fab-transition">
      <v-card :color="props.color">
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <v-card-text v-if="message != 'rating'">{{ message }}</v-card-text>
        <rate
          v-if="message == 'rating'"
          :justShow="true"
          onlyStar="false"
          title=""
          @rating="addRating"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-lighten-3" @click="pressOk">{{ okBtn }}</v-btn>
          <v-btn color="red-lighten-3" v-if="!props.justAccept" @click="pressCancel">
            {{ cancelBtn }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
