<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useRegister } from '@/composables/auth/register'
import { ref } from 'vue'

const { formData, formAction, refVForm, onFormSubmit } = useRegister()

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.firstname"
          label="Firstname"
          persistent-placeholder
          hide-details="auto"
          density="comfortable"
          :rules="[requiredValidator]"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.lastname"
          label="Lastname"
          persistent-placeholder
          hide-details="auto"
          density="comfortable"
          :rules="[requiredValidator]"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          label="Email"
          persistent-placeholder
          prepend-inner-icon="mdi-email-outline"
          hide-details="auto"
          density="comfortable"
          :rules="[requiredValidator, emailValidator]"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.password"
          label="Password"
          persistent-placeholder
          prepend-inner-icon="mdi-lock-outline"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          hide-details="auto"
          density="comfortable"
          :rules="[requiredValidator, passwordValidator]"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.password_confirmation"
          label="Password Confirmation"
          persistent-placeholder
          :type="isPasswordConfirmVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
          hide-details="auto"
          density="comfortable"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password_confirmation, formData.password),
          ]"
        />
      </v-col>
    </v-row>

    <v-btn
      class="mt-2"
      type="submit"
      color="red-darken-4"
      prepend-icon="mdi-account-plus"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      block
    >
      Register
    </v-btn>
  </v-form>
</template>
