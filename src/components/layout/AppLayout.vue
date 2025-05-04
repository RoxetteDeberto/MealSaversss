<script setup>
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" :color="theme === 'light' ? 'cyan-lighten-1' : 'cyan-darken-2'">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>
      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-footer class="d-flex justify-end px-6" color="cyan-lighten-1" border app>
        <div class="text-right">
          <div class="text-body-2">© 2025 - MealSavers</div>
        </div>
      </v-footer>
    </v-app>
  </v-responsive>
</template>
