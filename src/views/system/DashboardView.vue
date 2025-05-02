<template>
  <v-container fluid class="pa-0">
    <!-- Header with background and mascot -->
    <div class="header-section d-flex flex-column align-center justify-center">
      <v-img src="https://your-mascot-image-url.png" max-width="150" class="mt-6" contain></v-img>
      <h2 class="text-center font-weight-bold">MealSavers</h2>
      <span class="text-center">Register Form</span>
    </div>

    <!-- Register Form -->
    <v-container class="form-container">
      <v-card class="pa-4" elevation="3">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Firstname" outlined dense />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Lastname" outlined dense />
          </v-col>
        </v-row>

        <v-text-field label="Email" prepend-inner-icon="mdi-email" type="email" outlined dense />

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Password"
              prepend-inner-icon="mdi-lock"
              type="password"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Password Confirmation"
              prepend-inner-icon="mdi-lock"
              type="password"
              outlined
              dense
            />
          </v-col>
        </v-row>

        <v-btn color="red darken-3" class="white--text mt-4" block elevation="2">
          <v-icon left>mdi-account-plus</v-icon>
          REGISTER
        </v-btn>

        <div class="text-center mt-4">
          <small>Already have an account? <a href="/login">Click here to Login</a></small>
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardView',
}
</script>

<style scoped>
.header-section {
  background-color: #00cfe8;
  padding: 2rem 0;
  background-image: url('/path-to-utensil-pattern.png');
  background-size: cover;
  background-repeat: repeat;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
