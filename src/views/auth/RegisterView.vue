<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="brown-lighten-1">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto">
              <v-card
                class="mx-auto"
                prepend-icon="mdi-account-plus"
                subtitle="Register"
                image="/images/bg-card.jpg"
                elevation="10"
              >
                <template v-slot:title>
                  <span class="font-weight-black">MealSavers</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent>
                      <v-text-field label="First Name" variant="outlined"></v-text-field>
                      <v-text-field label="Last Name" variant="outlined"></v-text-field>
                      <v-text-field label="Email" variant="outlined"></v-text-field>

                      <v-text-field
                        label="Password"
                        type="password"
                        variant="outlined"
                      ></v-text-field>

                      <v-text-field
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                      ></v-text-field>

                      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
        </v-container>
      </v-main>

      <v-footer color="brown-lighten-1" border app>2025 - MealSavers</v-footer>
    </v-app>
  </v-responsive>
</template>
