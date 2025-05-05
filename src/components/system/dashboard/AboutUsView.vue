<script setup>
import { ref, onMounted } from 'vue'

const showInfo = ref(false)

onMounted(() => {
  setTimeout(() => {
    showInfo.value = true
  }, 400)
})
</script>

<template>
  <div class="p-6">
    <transition name="slide-fade-right">
      <div v-if="showInfo" class="space-y-3">
        <h2 class="text-3xl font-bold text-red-700">About Us</h2>
        <p class="text-lg text-gray-700">
          MealSavers is more than just a platform — it’s a movement to reduce food waste and fight
          hunger. We bridge the gap between food donors and communities in need.
        </p>
        <p class="text-md text-gray-600 italic">
          Together, we ensure that no meal goes to waste and no family goes hungry.
        </p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-right-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-right-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
</style>
