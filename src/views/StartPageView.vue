<script setup lang="ts">
  import { ref } from "vue";
  const version = ref(5);
</script>
<template>
  <div class="d-flex flex-column text-center justify-center" style="height: 90vh">
    <h1>{{ $t("startPage") }}</h1>
    <p>with Bootstrap {{ version }}</p>
  </div>
</template>
