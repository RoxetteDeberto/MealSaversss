import { supabase, formActionDefault } from '@/utils/supabase.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter

export function useRegister() {
  const router = useRouter() // Initialize router

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
  const refVForm = ref()

  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          firstname: formData.value.firstname,
          lastname: formData.value.lastname,
          // is_admin: false, just turn on for admin user
          // role: 'Administrator' if role based
        },
      },
    })

    if (error) {
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } else if (data) {
      formAction.value.formSuccessMessage = 'Successfully Registered Account.'
      router.replace('/dashboard') // Redirect to Dashboard
    }

    refVForm.value?.reset()
    formAction.value.formProcess = false
  }

  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
