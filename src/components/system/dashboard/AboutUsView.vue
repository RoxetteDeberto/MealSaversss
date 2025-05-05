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
        <h2 class="text-3xl font-bold text-red-700">🤝 Introducing MealSavers</h2>
        <p class="text-lg text-gray-700">
          In response to this crisis, MealSavers emerges as a transformative initiative aimed at
          reducing food waste and combating hunger. Here's how it works: Connecting Donors and
          Recipients: MealSavers bridges the gap between food establishments with surplus food and
          communities in need, ensuring that excess food reaches those who can benefit from it.
          Community Engagement: By fostering partnerships with local businesses and volunteers,
          MealSavers creates a network dedicated to sustainability and social responsibility.
          Technology-Driven Solutions: Utilizing a user-friendly app, MealSavers streamlines the
          process of food donation, making it accessible and efficient for all participants. Through
          MealSavers, we envision a world where food is valued, waste is minimized, and communities
          are nourished.
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
