<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <v-text-field
    label="Email Address"
    density="compact"
    prepend-inner-icon="mdi-email-outline"
    variant="outlined"
  ></v-text-field>

  <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"></div>
  <v-form fast-fail @submit.prevent>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn class="mt-2" type="submit" block color="red-darken-1" prepend-icon="mdi-login"
      >Login</v-btn
    >
  </v-form>
</template>
