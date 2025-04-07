<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>
<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" image="/images/bg-card.jpg" elevation="10">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="/public/final-logo.png"
                :width="mobile ? '75%' : '25%'"
              ></v-img>
              <h3 class="font-weight-black">MealSavers</h3>
              <p>Register Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>
              <v-sheet class="mx-auto" width="300">
                <v-form fast-fail @submit.prevent>
                  <v-text-field label="First Name" variant="outlined"></v-text-field>
                  <v-text-field label="Last Name" variant="outlined"></v-text-field>
                  <v-text-field label="Email" variant="outlined"></v-text-field>

                  <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

                  <v-text-field
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                  ></v-text-field>

                  <v-btn
                    class="mt-2"
                    type="submit"
                    block
                    color="red-darken-1"
                    prepend-icon="mdi-account-plus"
                    >Register</v-btn
                  >
                  <v-divider class="my-5"></v-divider>
                  <h5 class="text-center">
                    Already have account?
                    <RouterLink class="text-primary" to="/">Click here to Login</RouterLink>
                  </h5>
                </v-form>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
