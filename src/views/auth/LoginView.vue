<script setup>
// import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import LoginForm from '@/components/auth/LoginForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <div
    class="login-bg"
  >
    <v-container fluid>
      <v-row class="fill-height" align="center" justify="center">
        <!-- ✨ Left Text Section (hidden on mobile) -->
        <v-col
          cols="12"
          md="6"
          class="px-12 d-flex flex-column justify-center left-section"
          v-show="!mobile"
        >
          <div class="fade-in-text left-text-card">
            <h1 class="welcome-title">
              Welcome to <span class="brand-highlight">MealSavers</span>
            </h1>
            <p class="mt-4 welcome-desc">
              Join a community that believes in sharing, reducing waste, and making a difference one meal at a time.
            </p>
            <p class="mt-2 welcome-desc">
              <span class="brand-highlight">Save food. Help others. Be a MealSaver today.</span>
            </p>
          </div>
        </v-col>

        <!-- ✨ Right Side Login Card -->
        <v-col cols="12" sm="10" md="5" lg="4" class="pr-md-16" :offset-md="1">
          <v-card
            elevation="20"
            class="pa-6 login-card"
          >
            <v-card-title class="text-center">
              <v-img
                class="mx-auto login-logo"
                src="/images/bear.jpg"
                :width="mobile ? '75%' : '120'"
                height="auto"
              ></v-img>
              <h3 class="mt-2 login-title">
                MealSavers
              </h3>
            </v-card-title>

            <v-card-text class="bg-white bg-opacity-90 rounded-lg pt-4">
              <v-divider class="my-5"> </v-divider>
              <v-sheet class="mx-auto" :width="mobile ? '100%' : 300" style="max-width: 100%">
                <LoginForm />
                <v-divider class="my-5"></v-divider>
                <h5 class="text-center mb-5 login-link">
                  Don't have an account?
                  <RouterLink class="text-danger font-weight-bold" to="/register"
                    >Click here to Register</RouterLink
                  >
                </h5>
                <v-btn
                  color="brown-darken-2"
                  variant="outlined"
                  block
                  class="mt-2"
                  to="/claims"
                >
                  <v-icon start>mdi-food</v-icon>
                  View Available Donations
                </v-btn>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');

.login-bg {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/LoginPageBG.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 40px 0;
}
.left-section {
  z-index: 2;
}
.left-text-card {
  max-width: 1000px;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 32px 28px;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
}
.welcome-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #4e342e;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.brand-highlight {
  color: #8d6e63;
  font-weight: 700;
}
.welcome-desc {
  font-size: 1.15rem;
  color: #5d4037;
  line-height: 1.6;
}
.login-card {
  border-radius: 20px;
  background: rgba(255,255,255,0.97);
  box-shadow: 0 8px 32px rgba(109,76,65,0.12);
  opacity: 1;
  backdrop-filter: blur(2px);
}
.login-logo {
  box-shadow: 0 2px 12px rgba(109,76,65,0.10);
  border-radius: 12px;
  background: #fffbe6;
}
.login-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1.8rem;
  color: #4e342e;
  text-shadow: 0 2px 8px rgba(255,255,255,0.2);
}
.login-link {
  color: #4e342e;
  font-size: 1rem;
}
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
@media (max-width: 960px) {
  .left-section {
    display: none !important;
  }
  .login-card {
    margin-top: 32px;
  }
}
</style>
