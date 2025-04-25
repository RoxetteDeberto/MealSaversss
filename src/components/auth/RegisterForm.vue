<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator, confirmedValidator } from '@/utils/validators'

const refVForm = ref()
const visible = ref(false)
const isPassConfirmVisible = ref(false)

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

const onSubmit = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.firstname"
      density="compact"
      label="First Name"
      variant="outlined"
      :rules="[requiredValidator]"
    ></v-text-field>
    <v-text-field
      v-model="formData.firstname"
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

    <v-btn class="mt-2" type="submit" block color="red-darken-1" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
