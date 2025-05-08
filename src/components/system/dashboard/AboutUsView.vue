<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'

const showInfo = ref(false)

onMounted(() => {
  setTimeout(() => {
    showInfo.value = true
  }, 400)
})

const steps = [
  {
    icon: 'mdi-food-apple',
    title: 'Collect Surplus Food',
    desc: 'We partner with food establishments to collect surplus, edible food.'
  },
  {
    icon: 'mdi-truck-fast',
    title: 'Distribute to Communities',
    desc: 'Our volunteers and partners deliver food to those in need.'
  },
  {
    icon: 'mdi-hand-heart',
    title: 'Nourish & Empower',
    desc: 'We help reduce waste and nourish communities, one meal at a time.'
  }
]
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4 about-bg">
        <transition name="slide-fade-right">
          <v-row
            v-if="showInfo"
            align="center"
            justify="center"
            class="ma-0"
            style="max-width: 1200px; width: 100%"
          >
            <v-col cols="12" md="8">
              <v-card class="pa-8 rounded-lg" color="#ffffff" elevation="4">
                <div class="text-center mb-6">
                  <h1 class="text-h3 font-weight-bold text-brown-darken-2 mb-2">
                    🤝 Welcome to MealSavers
                  </h1>
                  <v-divider class="my-4"></v-divider>
                </div>

                <div class="text-body-1 text-grey-darken-3 space-y-6">
                  <v-card class="pa-6 rounded-lg" color="brown-lighten-5" elevation="0">
                    <p class="mb-6">
                      In response to the global food waste crisis, MealSavers emerges as a transformative
                      initiative aimed at reducing food waste and combating hunger. Our platform bridges
                      the gap between food establishments with surplus food and communities in need.
                    </p>
                  </v-card>

                  <!-- Timeline/Stepper: How MealSavers Works -->
                  <div class="my-8">
                    <h2 class="text-h5 font-weight-bold text-brown-darken-2 mb-4 text-center">How MealSavers Works</h2>
                    <v-row class="justify-center align-center stepper-row">
                      <v-col v-for="(step, i) in steps" :key="i" cols="12" md="4" class="text-center">
                        <v-avatar size="64" class="stepper-avatar mb-2">
                          <v-icon :icon="step.icon" size="40" color="brown-darken-2" class="stepper-icon" />
                        </v-avatar>
                        <h3 class="text-h6 font-weight-bold mb-1 text-brown-darken-2">{{ step.title }}</h3>
                        <p class="text-body-2 text-grey-darken-3">{{ step.desc }}</p>
                        <div v-if="i < steps.length - 1" class="stepper-arrow">
                          <v-icon color="brown-darken-2" size="32">mdi-arrow-right-bold</v-icon>
                        </div>
                      </v-col>
                    </v-row>
                  </div>

                  <v-row>
                    <v-col cols="12" md="4">
                      <v-card class="pa-4 rounded-lg text-center h-100" color="brown-lighten-5" elevation="0">
                        <v-icon size="48" color="brown-darken-2" class="mb-4">mdi-handshake</v-icon>
                        <h3 class="text-h6 font-weight-bold mb-2 text-brown-darken-2">Community Engagement</h3>
                        <p class="text-body-2 text-grey-darken-3">
                          By fostering partnerships with local businesses and volunteers, we create a
                          network dedicated to sustainability and social responsibility.
                        </p>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card class="pa-4 rounded-lg text-center h-100" color="brown-lighten-5" elevation="0">
                        <v-icon size="48" color="brown-darken-2" class="mb-4">mdi-cellphone-link</v-icon>
                        <h3 class="text-h6 font-weight-bold mb-2 text-brown-darken-2">Technology-Driven</h3>
                        <p class="text-body-2 text-grey-darken-3">
                          Utilizing a user-friendly app, we streamline the process of food donation,
                          making it accessible and efficient for all participants.
                        </p>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card class="pa-4 rounded-lg text-center h-100" color="brown-lighten-5" elevation="0">
                        <v-icon size="48" color="brown-darken-2" class="mb-4">mdi-heart-multiple</v-icon>
                        <h3 class="text-h6 font-weight-bold mb-2 text-brown-darken-2">Our Vision</h3>
                        <p class="text-body-2 text-grey-darken-3">
                          We envision a world where food is valued, waste is minimized, and
                          communities are nourished.
                        </p>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-divider class="my-6"></v-divider>

                  <!-- Testimonial/Impact Card -->
                  <v-card class="pa-6 rounded-lg testimonial-card mx-auto" color="#fffbe6" elevation="2" max-width="500">
                    <div class="d-flex align-center mb-2">
                      <v-avatar size="48" class="me-3">
                        <v-icon size="36" color="brown-darken-2">mdi-account-heart</v-icon>
                      </v-avatar>
                      <div>
                        <span class="font-weight-bold text-brown-darken-2">Maria S.</span>
                        <span class="text-caption text-grey-darken-2"> &mdash; Community Volunteer</span>
                      </div>
                    </div>
                    <div class="text-brown-darken-2 font-italic">
                      "MealSavers has changed lives in our neighborhood. We see less waste and more smiles every day!"
                    </div>
                  </v-card>

                  <p class="text-center text-h6 font-italic text-brown-darken-1 mt-8">
                    Together, we ensure that no meal goes to waste and no family goes hungry.
                  </p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </transition>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.about-bg {
  background: linear-gradient(135deg, #fffbe6 0%, #ffe0b2 100%);
}
.slide-fade-right-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-right-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.space-y-6 > * + * {
  margin-top: 1.5rem;
}
.v-card {
  backdrop-filter: blur(10px);
}
.stepper-row {
  position: relative;
  margin-bottom: 2rem;
}
.stepper-avatar {
  background: #fffbe6;
  border: 2px solid #a1887f;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.3s;
}
.stepper-avatar:hover {
  transform: scale(1.08);
}
.stepper-icon {
  animation: bounce 1.2s infinite alternate;
}
@keyframes bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}
.stepper-arrow {
  margin-top: 0.5rem;
}
.testimonial-card {
  border-left: 4px solid #a1887f;
  background: #fffbe6;
  font-size: 1.1rem;
  margin-top: 2rem;
}
</style>
