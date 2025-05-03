<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import RegisterForm from '@/components/auth/RegisterForm.vue'
// import { ref } from 'vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <!-- 🌄 Background image wrapper -->
      <div
        style="
          background-image: url('/images/LoginPageBG.png');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          padding: 40px 0;
        "
      >
        <v-container fluid>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" sm="10" md="6" lg="5">
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
                    Don't go hungry and Register <v-icon size="18">mdi-thumb-up</v-icon>
                  </p>
                </v-card-title>

                <v-card-text class="bg-white bg-opacity-75 rounded-lg pt-4">
                  <v-divider class="my-5"></v-divider>
                  <v-sheet class="mx-auto" width="300">
                    <RegisterForm />
                    <v-divider class="my-5"></v-divider>
                    <h5 class="text-center mb-5">
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
  </AppLayout>
</template>
