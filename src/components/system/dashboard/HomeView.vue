<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4">
        <transition name="slide-fade">
          <v-row
            v-if="showText"
            align="center"
            justify="center"
            class="ma-0"
            style="max-width: 900px; width: 100%"
          >
            <!-- Card with image -->
            <v-col cols="12" md="6">
              <v-card elevation="6" class="pa-0 rounded-lg" color="#fff8e1">
                <v-img
                  src="/images/Soup_kitchen.jpg"
                  alt="Food Waste Awareness"
                  height="300"
                  cover
                  class="rounded"
                />
              </v-card>
            </v-col>

            <!-- Text beside the image, not inside card -->
            <v-col cols="12" md="6" class="d-flex flex-column justify-center">
              <h1 class="text-h5 font-weight-bold text-red">🌍 The Global Food Waste Crisis</h1>
              <p class="text-body-1 text-grey-darken-2">
                📊 In 2022, 1.05 billion tonnes of food were wasted globally, with households
                responsible for 60%. Meanwhile, 783 million people face hunger.
                <br /><br />
                🌱 Food waste causes 8–10% of global greenhouse gas emissions, mainly methane.
                <br /><br />
                💰 The economic impact is $1 trillion per year.
              </p>
            </v-col>
          </v-row>
        </transition>
      </v-container>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'

const showText = ref(false)

onMounted(() => {
  setTimeout(() => {
    showText.value = true
  }, 300)
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
