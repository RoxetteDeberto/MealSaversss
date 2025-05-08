<script setup>
import PasswordForm from '@/components/system/account-settings/PasswordForm.vue'
import PictureForm from '@/components/system/account-settings/PictureForm.vue'
import ProfileForm from '@/components/system/account-settings/ProfileForm.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/Navigation/SideNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { ref, computed, onMounted } from 'vue'

const { mobile } = useDisplay()
const authStore = useAuthUserStore()

const isDrawerVisible = ref(mobile.value ? false : true)

// Computed fallback-safe bindings
const firstname = computed(() => authStore.userData?.firstname || '')
const lastname = computed(() => authStore.userData?.lastname || '')
const email = computed(() => authStore.userData?.email || '')
const phone = computed(() => authStore.userData?.phone || '')
const imageUrl = computed(() => authStore.userData?.image_url || '/images/img-profile.png')

// Make sure user info is loaded
onMounted(async () => {
  if (!authStore.userData) {
    await authStore.getUserInformation()
  }
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container>
        <v-card class="mb-6 elevation-2 pa-4" color="light-blue-lighten-5">
          <v-breadcrumbs :items="['Account', 'Settings']">
            <template #prepend>
              <v-icon size="small" class="me-2">mdi-wrench</v-icon>
            </template>
          </v-breadcrumbs>
          <h2 class="text-h5 font-weight-bold ms-2">Account Settings</h2>
          <p class="ms-2">Manage your profile, picture and password.</p>
        </v-card>

        <v-row>
          <!-- Profile Overview Card -->
          <v-col cols="12" md="4">
            <v-card class="pa-4 elevation-2 rounded-xl">
              <v-avatar size="140" class="mx-auto mb-4">
                <v-img :src="imageUrl" cover />
              </v-avatar>
              <h3 class="text-center">{{ authStore.userRole }}</h3>
              <v-divider class="my-4" />
              <div class="text-center">
                <p><strong>Fullname:</strong> {{ firstname }} {{ lastname }}</p>
                <p><strong>Email:</strong> {{ email }}</p>
                <p><strong>Contact No.:</strong> {{ phone }}</p>
              </div>
            </v-card>
          </v-col>

          <!-- Editable Forms -->
          <v-col cols="12" md="8">
            <v-card class="mb-5 pa-4 elevation-2 rounded-xl">
              <h3 class="text-h6 font-weight-bold mb-4">Update Profile Picture</h3>
              <PictureForm />
            </v-card>

            <v-card class="mb-5 pa-4 elevation-2 rounded-xl">
              <h3 class="text-h6 font-weight-bold mb-4">Update Profile Information</h3>
              <ProfileForm />
            </v-card>

            <v-card
              v-if="authStore.userRole === 'Super Administrator'"
              class="mb-5 pa-4 elevation-2 rounded-xl"
            >
              <h3 class="text-h6 font-weight-bold mb-4">Change Password</h3>
              <PasswordForm />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
