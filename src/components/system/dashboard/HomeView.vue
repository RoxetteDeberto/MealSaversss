<template>
  <div class="p-6">
    <transition name="slide-fade">
      <div v-if="showText" class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-red-600">Welcome to MealSavers</h1>
        <p class="text-xl text-gray-700">Connecting food donors with those in need</p>
        <p class="text-lg text-brown-600 italic">
          Reducing waste and feeding hope, one meal at a time.
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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
  transform: translateX(-50px);
}
</style>
