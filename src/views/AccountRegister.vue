<script setup lang="ts">
  import { computed, reactive, ref } from "vue";
  import {
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VCol,
    VContainer,
    VDialog,
    VForm,
    VIcon,
    VProgressLinear,
    VRow,
    VSpacer,
    VTextField,
  } from "vuetify/components";
  import { useUsersStore } from "../store/usersStore";

  const usersStore = useUsersStore();

  const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));
  const isLoading = computed(() => usersStore.getLoading);

  const errorMsg = computed(() => usersStore.getErrorMsg);
  const isErrorMsg = computed(() => usersStore.getErrorMsg != "");

  const email = ref("");
  const name = ref("");
  const password = ref("");
  const picture = ref("");

  const setImage = (img) => {
    picture.value = img;
  };

  function Tobase64(event) {
    const selected = event.target?.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result?.toString().split(",")[1]);
    };
    reader.readAsDataURL(selected);
  }
</script>

<template>
  <v-container fluid style="min-height: 90vh">
    <v-row justify="center">
      <v-col md="4" sm="8" xs="12">
        <v-card class="elevation-12">
          <v-card-title v-if="!anyLoggedUser">
            Register form
            <v-icon>mdi-login</v-icon>
          </v-card-title>
          <v-card-title v-else>
            Logout form
            <v-icon>mdi-logout</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                :disabled="anyLoggedUser"
                :label="anyLoggedUser ? 'Email' : 'E-mail'"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>
              <v-text-field
                v-if="!anyLoggedUser"
                id="password"
                v-model="password"
                :disabled="anyLoggedUser"
                label="Password"
                name="password"
                prepend-icon="mdi-key"
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="name"
                :disabled="anyLoggedUser"
                :label="anyLoggedUser ? 'Username' : 'Username'"
                name="login"
                prepend-icon="mdi-account-details"
                type="text"
              ></v-text-field>
              <v-file-input
                accept="image/*"
                label="User avatar (max. 50 Kb)"
                prepend-icon="mdi-account-box"
                truncate-length="15"
                @change="Tobase64($event)"
              ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!anyLoggedUser"
              color="success"
              @click="
                usersStore.UserRegister({
                  email: email,
                  password: password,
                  name: name,
                  picture: picture,
                })
              "
            >
              Register
            </v-btn>
            <v-btn v-else class="mt-3" color="warning" @click="usersStore.logOut()">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Dialog1: Wait for login response -->
    <v-dialog v-model="isLoading" hide-overlay persistent>
      <v-card color="background">
        <v-card-text>
          Please wait..
          <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Dialog 2: Show error messages -->
    <v-dialog v-model="isErrorMsg">
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>{{ errorMsg }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="usersStore.clearErrorMsg()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
