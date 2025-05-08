<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4 home-bg">
        <transition name="slide-fade">
          <v-row
            v-if="showText"
            align="center"
            justify="center"
            class="ma-0"
            style="max-width: 1200px; width: 100%"
          >
            <!-- Card with image -->
            <v-col cols="12" md="6">
              <v-card elevation="6" class="pa-0 rounded-lg overflow-hidden" color="#ffffff">
                <v-img
                  src="/images/Soup_kitchen.jpg"
                  alt="Food Waste Awareness"
                  height="400"
                  cover
                  class="rounded"
                />
                <!-- Motivational Quote -->
                <v-card class="mt-6 pa-4 rounded-lg quote-card" color="brown-lighten-5" elevation="0">
                  <v-icon color="brown-darken-2" size="32" class="me-2">mdi-format-quote-open</v-icon>
                  <span class="text-h6 font-italic text-brown-darken-2">Every meal saved is a life touched. Join us in making a difference!</span>
                </v-card>
              </v-card>
            </v-col>

            <!-- Text beside the image -->
            <v-col cols="12" md="6" class="d-flex flex-column justify-center pa-6">
              <v-card class="pa-6 rounded-lg" color="#ffffff" elevation="4">
                <h1 class="text-h4 font-weight-bold text-brown-darken-2 mb-4">
                  🌍 The Global Food Waste Crisis
                </h1>
                <div class="text-body-1 text-grey-darken-3 space-y-4">
                  <v-card class="pa-4 rounded-lg stat-card" color="brown-lighten-5" elevation="0">
                    <v-row align="center">
                      <v-col cols="auto">
                        <v-icon color="brown-darken-2" size="36">mdi-food-apple</v-icon>
                      </v-col>
                      <v-col>
                        <p class="mb-1 font-weight-bold text-brown-darken-2">Meals Saved</p>
                        <span class="text-h5 font-weight-bold animated-number">{{ mealsSaved }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card class="pa-4 rounded-lg stat-card" color="brown-lighten-5" elevation="0">
                    <v-row align="center">
                      <v-col cols="auto">
                        <v-icon color="brown-darken-2" size="36">mdi-account-group</v-icon>
                      </v-col>
                      <v-col>
                        <p class="mb-1 font-weight-bold text-brown-darken-2">People Helped</p>
                        <span class="text-h5 font-weight-bold animated-number">{{ peopleHelped }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card class="pa-4 rounded-lg stat-card" color="brown-lighten-5" elevation="0">
                    <v-row align="center">
                      <v-col cols="auto">
                        <v-icon color="brown-darken-2" size="36">mdi-leaf</v-icon>
                      </v-col>
                      <v-col>
                        <p class="mb-1 font-weight-bold text-brown-darken-2">CO₂ Saved (kg)</p>
                        <span class="text-h5 font-weight-bold animated-number">{{ co2Saved }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
                <!-- Call to Action -->
                <v-btn color="brown-darken-2" class="mt-6 cta-btn" size="large" to="/donations" elevation="4">
                  <v-icon left>mdi-hand-heart</v-icon>
                  Start Saving Meals
                </v-btn>
              </v-card>
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

// Animated stats
const mealsSaved = ref(0)
const peopleHelped = ref(0)
const co2Saved = ref(0)

function animateValue(refVar, target, duration = 1200) {
  let start = 0
  const increment = target / (duration / 16)
  function step() {
    start += increment
    if (start < target) {
      refVar.value = Math.floor(start)
      requestAnimationFrame(step)
    } else {
      refVar.value = target
    }
  }
  step()
}

onMounted(() => {
  setTimeout(() => {
    showText.value = true
    animateValue(mealsSaved, 12500)
    animateValue(peopleHelped, 3200)
    animateValue(co2Saved, 8700)
  }, 300)
})
</script>

<style scoped>
.home-bg {
  background: linear-gradient(135deg, #fffbe6 0%, #ffe0b2 100%);
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.space-y-4 > * + * {
  margin-top: 1rem;
}
.v-card {
  backdrop-filter: blur(10px);
}
.quote-card {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  background: #fffbe6;
  border-left: 4px solid #a1887f;
}
.animated-number {
  color: #6d4c41;
  font-size: 2rem;
  transition: color 0.3s;
}
.cta-btn {
  text-transform: none !important;
  font-weight: bold;
  letter-spacing: 0.5px;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(109,76,65,0.08);
  transition: background 0.3s, box-shadow 0.3s;
}
.cta-btn:hover {
  background: #8d6e63 !important;
  box-shadow: 0 8px 24px rgba(109,76,65,0.16);
}
.stat-card {
  transition: box-shadow 0.3s;
}
.stat-card:hover {
  box-shadow: 0 4px 16px rgba(109,76,65,0.10);
}
</style>
