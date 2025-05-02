<script setup>
import { ref } from 'vue'
import AlertNotification from '@/components/common/AlertNotification.vue'

import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const refVForm = ref()
const visible = ref(false)
const isPassConfirmVisible = ref(false)
// Load Variables
const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})
// Register Functionality
const onSubmit = async () => {
  // Register form Action utils
  formAction.value = { ...formActionDefault }
  // turn on processing
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        is_admin: true,
      },
    },
  })
  if (error) {
    // Add error message and status code
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    // add success message
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered!'
    // Add here more actions if you like
    router.replace('/dashboard')
  }
  // reset form
  refVForm.value?.reset()
  //  Turn of processing
  formAction.value.formProcess = false
}

// Trigger Validators
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  >
  </AlertNotification>
  <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.firstname"
      density="compact"
      label="First Name"
      variant="outlined"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.lastname"
      density="compact"
      label="Last Name"
      variant="outlined"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.email"
      density="compact"
      label="Email"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    ></div>

    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Enter your password"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator, passwordValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password_confirmation"
      :append-inner-icon="isPassConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPassConfirmVisible ? 'text' : 'password'"
      density="compact"
      label="Confirm Password"
      variant="outlined"
      @click:append-inner="isPassConfirmVisible = !isPassConfirmVisible"
      :rules="[
        requiredValidator,
        confirmedValidator(formData.password_confirmation, formData.password),
      ]"
    ></v-text-field>

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="red-darken-1"
      prepend-icon="mdi-account-plus"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      >Register</v-btn
    >
  </v-form>
</template>
