<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { integerValidator, requiredValidator } from '@/utils/validators'
import { formActionDefault } from '@/utils/supabase.js'
import { useAuthUserStore } from '@/stores/authUser'
import { reactive, ref, watchEffect } from 'vue'

const authStore = useAuthUserStore()

const formData = reactive({
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  phone: '',
})

// Fill the form data reactively when userData becomes available
watchEffect(() => {
  if (authStore.userData) {
    formData.firstname = authStore.userData.firstname || ''
    formData.middlename = authStore.userData.middlename || ''
    formData.lastname = authStore.userData.lastname || ''
    formData.email = authStore.userData.email || ''
    formData.phone = authStore.userData.phone || ''
  }
})

const formAction = reactive({ ...formActionDefault })
const refVForm = ref()

const onSubmit = async () => {
  formAction.formProcess = true
  formAction.formSuccessMessage = ''
  formAction.formErrorMessage = ''

  const { data, error } = await authStore.updateUserInformation({ ...formData })

  if (error) {
    formAction.formErrorMessage = error.message
    formAction.formStatus = error.status
  } else if (data) {
    formAction.formSuccessMessage = 'Account info updated.'
  }

  formAction.formProcess = false
}

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
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row dense>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="formData.firstname"
          label="First Name"
          :rules="[requiredValidator]"
          prepend-inner-icon="mdi-account"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="formData.middlename"
          label="Middle Name"
          prepend-inner-icon="mdi-account"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="formData.lastname"
          label="Last Name"
          :rules="[requiredValidator]"
          prepend-inner-icon="mdi-account"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.email"
          label="Email Address"
          prepend-inner-icon="mdi-email"
          readonly
          disabled
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.phone"
          label="Phone Number"
          prepend-inner-icon="mdi-phone"
          prefix="+63"
          :rules="[requiredValidator, integerValidator]"
        />
      </v-col>
    </v-row>

    <v-btn
      type="submit"
      class="mt-4"
      color="teal-darken-2"
      prepend-icon="mdi-content-save-edit"
      variant="elevated"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
    >
      Save Changes
    </v-btn>
  </v-form>
</template>
