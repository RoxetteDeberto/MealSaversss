<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const authStore = useAuthUserStore()

const isLoggedIn = ref(false)
const isDrawerVisible = ref(mobile.value ? false : true)

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="isLoggedIn"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation v-if="isLoggedIn">
      <SideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="pa-10 text-center elevation-10 rounded-xl" width="100%" max-width="500">
          <v-icon icon="mdi-block-helper" color="red-darken-4" size="64" />
          <h1 class="text-h3 font-weight-bold text-red-darken-4 mt-4">403 - Forbidden</h1>
          <p class="text-body-1 mt-2 mb-6">You don't have permission to access this page.</p>
          <v-btn color="red-darken-4" prepend-icon="mdi-home" to="/">
            Back to {{ isLoggedIn ? 'Dashboard' : 'Homepage' }}
          </v-btn>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>
