<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { requiredValidator } from '@/utils/validators'
import { formActionDefault } from '@/utils/supabase.js'
import { useAuthUserStore } from '@/stores/authUser'
import { ref } from 'vue'

const authStore = useAuthUserStore()

const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const formAction = ref({ ...formActionDefault })
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await authStore.updateUserPassword(formData.value)

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Password changed successfully.'
    formData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  }

  formAction.value.formProcess = false
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
      <v-col cols="12">
        <v-text-field
          v-model="formData.currentPassword"
          label="Current Password"
          type="password"
          :rules="[requiredValidator]"
          prepend-inner-icon="mdi-lock"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.newPassword"
          label="New Password"
          type="password"
          :rules="[requiredValidator]"
          prepend-inner-icon="mdi-lock-reset"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.confirmPassword"
          label="Confirm Password"
          type="password"
          :rules="[requiredValidator]"
          prepend-inner-icon="mdi-lock-check"
        />
      </v-col>
    </v-row>

    <v-btn
      type="submit"
      class="mt-4"
      color="teal-darken-2"
      prepend-icon="mdi-lock"
      variant="elevated"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
    >
      Change Password
    </v-btn>
  </v-form>
</template>
