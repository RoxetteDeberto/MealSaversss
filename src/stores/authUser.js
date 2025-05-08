import { supabase } from '@/utils/supabase'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthUserStore = defineStore('authUser', () => {
  // States
  const userData = ref(null)
  const router = useRouter()

  const authPages = ref([])
  const authBranchIds = ref([])

  // Getters
  // Computed Properties; Use for getting the state but not modifying its reactive state
  const userRole = computed(() => {
    if (!userData.value) return null
    return userData.value?.is_admin ? 'Super Administrator' : userData.value.user_role
  })

  // Reset State Action
  function $reset() {
    userData.value = null
    authPages.value = []
    authBranchIds.value = []
  }

  // Actions
  // Retrieve User Session if Logged
  async function isAuthenticated() {
    const { data } = await supabase.auth.getSession()

    if (data.session) {
      const { id, email, user_metadata } = data.session.user
      userData.value = { id, email, ...user_metadata }
    }

    return !!data.session
  }

  // Retrieve User Information
  async function getUserInformation() {
    const {
      data: {
        // Retrieve Id, Email and Metadata thru Destructuring
        user: { id, email, user_metadata },
      },
    } = await supabase.auth.getUser()

    // Set the retrieved information to state
    userData.value = { id, email, ...user_metadata }
  }

  // Retrieve User Roles Pages
  async function getAuthPages(name) {
    const { data } = await supabase
      .from('user_roles')
      .select('*, pages: user_role_pages (page)')
      .eq('user_role', name)

    // Set the retrieved data to state
    if (data.length > 0) authPages.value = data[0].pages.map((p) => p.page)
  }

  // Retrieve Branch Ids
  async function getAuthBranchIds() {
    const { data } = await supabase
      .from('branches')
      .select('id')
      .in('name', userData.value.branch.split(','))

    authBranchIds.value = data.map((b) => b.id)
  }

  // Logout function
  async function logout() {
    try {
      await supabase.auth.signOut()
      $reset()
      router.replace('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  // Update User Information
  async function updateUserInformation(updatedData) {
    const {
      data: {
        // Retrieve Id, Email and Metadata thru Destructuring
        user: { id, email, user_metadata },
      },
      error,
    } = await supabase.auth.updateUser({
      data: {
        ...updatedData,
      },
    })

    // Check if it has error
    if (error) {
      return { error }
    }
    // If no error set updatedData to userData state
    else if (user_metadata) {
      userData.value = { id, email, ...user_metadata }

      return { data: userData.value }
    }
  }

  // Update User Profile Image
  async function updateUserImage(file) {
    try {
      if (!file) {
        return { error: { message: 'No file provided' } }
      }

      // Create a unique filename using user ID and timestamp
      const timestamp = new Date().getTime()
      const filePath = `avatars/${userData.value.id}/${timestamp}-avatar.png`

      // Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return { error: uploadError }
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath)

      // Update user metadata with the new image URL
      const { data: updateData, error: updateError } = await supabase.auth.updateUser({
        data: { 
          ...userData.value,
          image_url: publicUrl 
        }
      })

      if (updateError) {
        console.error('Update error:', updateError)
        return { error: updateError }
      }

      // Update local state
      userData.value = { 
        ...userData.value,
        image_url: publicUrl 
      }

      return { data: updateData }
    } catch (error) {
      console.error('Profile image update error:', error)
      return { error }
    }
  }

  return {
    userData,
    userRole,
    authPages,
    authBranchIds,
    $reset,
    isAuthenticated,
    getUserInformation,
    getAuthPages,
    getAuthBranchIds,
    logout,
    updateUserInformation,
    updateUserImage,
  }
})
