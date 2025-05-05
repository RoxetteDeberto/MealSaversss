<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { imageValidator, requiredValidator } from '@/utils/validators'
import { formActionDefault } from '@/utils/supabase.js'
import { useAuthUserStore } from '@/stores/authUser'
import { fileExtract } from '@/utils/helpers'
import { ref, watch, onMounted } from 'vue'

const authStore = useAuthUserStore()

const formDataDefault = { image: null }
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const imgPreview = ref('/images/img-profile.png')

// When user data becomes available, update preview
watch(
  () => authStore.userData,
  (newUserData) => {
    if (newUserData?.image_url) {
      imgPreview.value = newUserData.image_url
    }
  },
  { immediate: true },
)

const onPreview = async (event) => {
  const { fileObject, fileUrl } = await fileExtract(event)
  formData.value.image = fileObject
  imgPreview.value = fileUrl
}

const onPreviewReset = () => {
  imgPreview.value = authStore.userData?.image_url || '/images/img-profile.png'
}

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await authStore.updateUserImage(formData.value.image)

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Profile image updated successfully.'
  }

  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

// Ensure user data is fetched
onMounted(async () => {
  if (!authStore.userData) {
    await authStore.getUserInformation()
  }
})
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row class="align-center">
      <v-col cols="12" md="4" class="text-center">
        <v-avatar size="140" class="mx-auto">
          <v-img :src="imgPreview" alt="Profile Preview" cover />
        </v-avatar>
        <p class="mt-3 text-caption text-grey-darken-1">Image Preview (JPG, PNG, BMP)</p>
      </v-col>

      <v-col cols="12" md="8">
        <v-file-input
          :rules="[requiredValidator, imageValidator]"
          accept="image/png, image/jpeg, image/bmp"
          label="Upload Profile Picture"
          prepend-icon="mdi-camera"
          variant="outlined"
          show-size
          clearable
          @change="onPreview"
          @click:clear="onPreviewReset"
        />

        <v-btn
          type="submit"
          class="mt-4"
          color="teal-darken-2"
          variant="elevated"
          prepend-icon="mdi-upload"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
        >
          Upload Image
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
