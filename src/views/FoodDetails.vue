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
  import rating from "../components/Rating.vue";
  import { useReceiptStore } from "../store/receiptStore";
  import { useRoute } from "vue-router";
  import ConfirmDialog from "../components/ConfirmDialog.vue";

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

  const load = ref(false);
  const receipt = ref({});

  const showDetail = ref(false);
  const showConfirmRate = ref(false);
  const resultConfirm = ref(false);

  const rerender = ref(0);

  const rate = ref(0);

  async function Loading() {
    await receiptStore.getReceiptById(router.params.id.toString());
    receipt.value = receiptStore.getOneReceipt;
    console.log(receipt);
    load.value = true;
    return load;
  }

  function picToBase64(code) {
    return "data:image/png;base64," + code;
  }

  function difficult(dif: string): string {
    switch (dif) {
      case 1:
        return "Very easy";
        break;
      case 2:
        return "Easy";
        break;
      case 3:
        return "Medium";
        break;
      case 4:
        return "Hard";
        break;
      case 5:
        return "Really hard";
        break;
      default:
        return "Impossible";
        break;
    }
  }

  function ShowRate() {
    showConfirmRate.value = true;
    console.log("asd");
  }

  function getRating(v) {
    rate.value = v;
  }

  function receiptRateCounter(plusRate: number) {
    return receipt.value == 0
      ? plusRate
      : (receipt.value.rate == null ? 0 : receipt.value.rate + plusRate) / 2;
  }

  function confirmRate() {
    if (resultConfirm.value) {
      receiptStore.ratingReceipt({
        _id: receipt.value._id,
        rate: receiptRateCounter(rate.value),
      });
      Loading();
      rerender.value += 1;
      show.value = false;
    } else {
      showConfirmRate.value = false;
    }
  }
</script>

<template>
  <v-container v-if="Loading()" class="popup" :key="rerender">
    <ConfirmDialog
      v-if="showConfirmRate"
      v-model="showConfirmRate"
      v-model:result="resultConfirm"
      cancel-btn="Close"
      message="rating"
      ok-btn="Rating"
      :retain-focus="false"
      title="Rating Receipt"
      @close="confirmRate"
      @resultData="getRating"
    />
    <v-row>
      <v-col cols="12" sm="12">
        <v-img alt="Food" class="img" :src="picToBase64(receipt.pic)"></v-img>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="name">
          {{ receipt.name }}
        </div>
        <div class="type">
          <v-chip>{{ receipt.type }}</v-chip>
        </div>
      </v-col>
      <div class="rating">
        <v-rating
          v-model="receipt.rate"
          background-color="yellow lighten-3"
          class="ratingStars"
          color="yellow"
          large
          readonly
        ></v-rating>
        <v-btn color="yellow lighten-2" text @click="ShowRate()">Rating</v-btn>
      </div>

      <v-divider></v-divider>
      <v-col class="icon" cols="12" lg="4" sm="12">
        <v-icon class="in-icon">mdi-clock</v-icon>
        <div class="in-text">{{ receipt.time }} min</div>
      </v-col>
      <v-col class="icon" cols="12" lg="4" sm="12">
        <v-icon class="in-icon">mdi-lightning-bolt-circle</v-icon>
        <div class="in-text">{{ receipt.energy }} cal</div>
      </v-col>
      <v-col class="icon" cols="12" lg="4" sm="12">
        <v-icon class="in-icon">mdi-chef-hat</v-icon>
        <div class="in-text">{{ difficult(receipt.difficulty) }}</div>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="5" sm="12">
        <h2 class="i-title">Description</h2>
        <p class="description">
          {{ receipt.description }}
        </p>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" md="5" sm="12">
        <div class="ingredients">
          <h2 class="i-title">Ingredients</h2>
          <ul>
            <li v-for="(item, i) in receipt.ingredients" :key="i">{{ item }}</li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
  .popup {
    background-color: #00000020;
    border-radius: 2rem;
    padding: 2rem;
    width: 100%;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
      sans-serif;
  }

  .name {
    float: left;
    margin: 2rem;
    font-size: 2rem;
  }
  .type {
    float: right;
    margin: 2rem;
    font-size: 2rem;
  }
  .description {
    text-align: justify;
    margin-top: 3rem;
  }
  .img {
    width: 30%;
    margin: auto;
  }

  @media only screen and (max-width: 600px) {
    .img {
      margin: auto;
      width: 50%;
    }
  }
  .icon {
    font-size: 3rem;
    justify-content: center;
    display: flex;
    .in-text {
      font-size: 2rem;
      margin: auto;
      margin-left: 0.5rem;
    }
  }
  .ratingStars {
  }
  .i-title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .rating {
    display: flex;
    justify-content: center;
    margin-left: 2rem;

    .v-btn {
      margin: 0.3rem;
    }
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
