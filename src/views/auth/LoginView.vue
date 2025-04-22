<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import LoginForm from '@/components/auth/LoginForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" image="/images/bg-card.jpg" elevation="10">
            <v-card-title class="text-center">
              <v-img class="mx-auto" src="/final-logo.png" :width="mobile ? '75%' : '25%'"></v-img>
              <h3 class="font-weight-black">MealSavers</h3>
              <p>Login or Sign up</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>
              <v-sheet class="mx-auto" width="300">
                <LoginForm>
                  <template #content> </template>
                </LoginForm>

                <v-divider class="my-5"></v-divider>
                <h5 class="text-center mb-5">
                  Don't have an account?
                  <RouterLink class="text-danger font-weight-black" to="/register"
                    ><u prepend-icon="mdi-login"> Click here to Register</u></RouterLink
                  >
                </h5>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
