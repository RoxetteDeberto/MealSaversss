<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <v-text-field density="compact" label="First Name" variant="outlined"></v-text-field>
  <v-text-field density="compact" label="Last Name" variant="outlined"></v-text-field>
  <v-text-field density="compact" label="Email address" variant="outlined"></v-text-field>

  <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"></div>
  <v-form fast-fail @submit.prevent>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Enter your password"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Confirm Password"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn class="mt-2" type="submit" block color="red-darken-1" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
