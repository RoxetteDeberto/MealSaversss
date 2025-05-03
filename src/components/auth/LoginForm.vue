<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useLogin } from '@/composables/auth/login'

const { formData, formAction, refVForm, onFormSubmit } = useLogin()
const visible = ref(false)
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      label="Email"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      density="comfortable"
      :rules="[requiredValidator, emailValidator]"
      hide-details="auto"
    />

    <v-text-field
      v-model="formData.password"
      label="Password"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      variant="outlined"
      density="comfortable"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator, passwordValidator]"
      hide-details="auto"
    />

    <v-btn class="mt-2" type="submit" block color="red-darken-1" prepend-icon="mdi-login">
      Login
    </v-btn>
  </v-form>
</template>
