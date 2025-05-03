<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import LoginForm from '@/components/auth/LoginForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <div
        style="
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/LoginPageBG.png');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          padding: 40px 0;
        "
      >
        <v-container fluid>
          <v-row class="fill-height" align="center" justify="center">
            <!-- ✨ Left Text Section (hidden on mobile) -->
            <v-col
              cols="12"
              md="6"
              class="text-white px-12 d-flex flex-column justify-center"
              v-show="!mobile"
            >
              <div
                class="fade-in-text"
                style="
                  max-width: 1000px;
                  background-color: rgba(255, 255, 255, 0.1);
                  padding: 24px;
                  border-radius: 12px;
                "
              >
                <h1 style="font-family: 'Playfair Display', serif; font-size: 40px">
                  Welcome to MealSavers
                </h1>
                <p class="mt-4" style="font-size: 18px">
                  Join a community that believes in sharing, reducing waste, and making a difference
                  one meal at a time.
                </p>
                <p class="mt-2" style="font-size: 16px">
                  Save food. Help others. Be a MealSaver today.
                </p>
              </div>
            </v-col>

            <!-- ✨ Right Side Login Card -->
            <v-col cols="12" sm="10" md="5" lg="4" class="pr-md-16" :offset-md="1">
              <v-card
                elevation="20"
                class="pa-6"
                style="
                  border-radius: 20px;
                  opacity: 0.9;
                  background-image: url('/images/bg-card.jpg');
                  background-size: cover;
                  background-position: center;
                "
              >
                <v-card-title class="text-center">
                  <v-img
                    class="mx-auto"
                    src="/final-logo.png"
                    :width="mobile ? '75%' : '120'"
                    height="auto"
                  ></v-img>
                  <h3
                    class="mt-2"
                    style="
                      font-family: 'Playfair Display', serif;
                      font-weight: 500;
                      font-size: 28px;
                    "
                  >
                    MealSavers
                  </h3>
                  <p
                    class="font-weight-medium mt-2"
                    style="font-family: 'Poppins', sans-serif; font-size: 15px"
                  >
                    From your kitchen to their hearts
                  </p>
                </v-card-title>

                <v-card-text class="bg-white bg-opacity-75 rounded-lg pt-4">
                  <v-divider class="my-5"></v-divider>
                  <v-sheet class="mx-auto" width="300">
                    <LoginForm />
                    <v-divider class="my-5"></v-divider>
                    <h5 class="text-center mb-5">
                      Don't have an account?
                      <RouterLink class="text-danger font-weight-bold" to="/register"
                        >Click here to Register</RouterLink
                      >
                    </h5>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </AppLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');

.fade-in-text {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
