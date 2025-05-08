<script setup>
// import AppLayout from '@/components/layout/AppLayout.vue'
// import { useDisplay } from 'vuetify'
import RegisterForm from '@/components/auth/RegisterForm.vue'

// const { mobile } = useDisplay()
</script>

<template>
  <!-- 🌄 Background image wrapper with scrollable fix -->
  <div
    class="register-bg"
  >
    <v-container fluid>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" sm="10" md="6" lg="5">
          <v-card
            elevation="20"
            class="pa-6 register-card"
          >
            <v-card-title class="text-center">
              <v-img
                class="mx-auto register-logo"
                src="/images/final-logo.png"
                :width="120"
                height="auto"
              ></v-img>
              <h3 class="mt-2 register-title">
                MealSavers
              </h3>
            </v-card-title>

            <v-card-text class="bg-white bg-opacity-90 rounded-lg pt-4">
              <v-sheet class="mx-auto" :width="'100%'">
                <RegisterForm />
                <v-divider class="my-5"></v-divider>
                <h5 class="text-center mb-5 register-link">
                  Already have an account?
                  <RouterLink class="text-danger font-weight-medium" to="/"
                    >Click here to Login</RouterLink
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

<style>
.register-bg {
  background-image: url('/images/LoginPageBG.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 40px 0;
  overflow-y: auto;
}
.register-card {
  border-radius: 20px;
  background: rgba(255,255,255,0.97);
  box-shadow: 0 8px 32px rgba(109,76,65,0.12);
  opacity: 1;
  backdrop-filter: blur(2px);
}
.register-logo {
  box-shadow: 0 2px 12px rgba(109,76,65,0.10);
  border-radius: 12px;
  background: #fffbe6;
}
.register-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1.8rem;
  color: #4e342e;
  text-shadow: 0 2px 8px rgba(255,255,255,0.2);
}
.register-link {
  color: #4e342e;
  font-size: 1rem;
}
@media (max-width: 960px) {
  .register-card {
    margin-top: 32px;
  }
}
</style>
