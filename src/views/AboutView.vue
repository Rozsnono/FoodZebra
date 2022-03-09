<script setup lang="ts">
import { VAlert, VBtn, VContainer, VImg } from "vuetify/components";
</script>

<template>
  <v-container class="page text-center" style="min-height: 90vh">
    <v-row class="card">
      <v-col cols="12" lg="8" sm="8">
        <h1>About us</h1>
        <v-divider class="hr"></v-divider>
        <p>
          A weboldal azért jött létre, hogy a főzés iránt érdeklődő emberek megtudják osztani
          másokkal a receptjeiket vagy éppen a mások által megosztottak között böngészhessenek.
        </p>
        <v-divider class="hr"></v-divider>
        <h2 class="mb-3">Functions:</h2>
        <ul>
          <li>Felhasználó fiók</li>
          <li>Receptek böngészése</li>
          <li>Recept létrehozása, meglévő módosítása, törlése</li>
          <li>Recept értékelése</li>
        </ul>
        <v-divider class="hr"></v-divider>
        <h3 class="mb-3">Creators:</h3>
        <ul>
          <li>Rozs Norbert</li>
          <li>Szebik Levente</li>
        </ul>
      </v-col>
      <v-col cols="12" lg="4" sm="4">
        <div class="img-div">
          <img src="../assets/logo.png" alt="logo" class="img" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card {
  width: 100% !important;
  background-color: #00000030;
  border-radius: 2rem;
  padding: 2rem;
}
.hr {
  margin: 1rem;
}
.img-div {
  display: flex;
  justify-content: center;
  vertical-align: middle;
  padding: 35%;
}
.img {
  border-radius: 1rem;
  box-shadow: 1px 1px 20px 3px black;
}
h1{
  text-transform: uppercase;
  letter-spacing: 0.2rem;
}
</style>
