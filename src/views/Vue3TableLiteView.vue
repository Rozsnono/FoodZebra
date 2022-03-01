<script setup lang="ts">
  import rating from "../components/Rating.vue";
</script>

<template>
  <v-card class="mx-auto card">
    <v-card-title class="title">Add new Food</v-card-title>
    <v-text-field v-model="name" class="inputs" label="Name"></v-text-field>
    <v-file-input accept="image/*" truncate-length="15"></v-file-input>
    <v-text-field v-model="type" class="inputs" label="Type"></v-text-field>
    <v-textarea
      v-model="description"
      class="inputs"
      filled
      label="Description"
      rows="6"
      shaped
    ></v-textarea>
    <v-text-field v-model="energy" class="inputs" label="Energy"></v-text-field>
    <v-text-field v-model="time" class="inputs" label="Time"></v-text-field>
    <rating title="Price"></rating>
    <rating title="Serving"></rating>
    <rating title="Difficulty"></rating>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green-lighten-3"
        :disabled="!isChanged"
        elevation="5"
        @click="showConfirmSave = true"
      >
        Save
      </v-btn>
      <v-btn color="blue-lighten-3" elevation="5" @click="closeDialog">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  .card {
    width: 40rem !important;
  }

  #file-input {
    text-align: center !important;
  }
  .title {
    font-family: "Courier New", Courier, monospace;
    font-size: 4rem;
    text-align: center;
    margin: 2.5rem;
  }

  .inputs {
    margin: 0.5rem;
  }
</style>
