<script setup>
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Use Pinia Store
const authStore = useAuthUserStore()

// Load Variables
const isLoggedIn = computed(() => authStore.isAuthenticated())
const isDrawerVisible = ref(mobile.value ? false : true)

// Load Functions during component rendering
onMounted(async () => {
  // This could be handled by a computed value now
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="isLoggedIn"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation v-if="isLoggedIn">
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container
        fluid
        class="pa-0"
        style="background: url('/images/LoginPageBG.png') center/cover no-repeat; min-height: 100vh"
      >
        <v-row justify="center" align="center" style="min-height: 100vh">
          <v-col class="text-center" cols="12" lg="4">
            <h1 class="text-h1 font-weight-black text-red-darken-4">404</h1>
            <h2 class="text-h2 font-weight-black mb-2">Page Not Found</h2>

            <p class="text-subtitle-1 font-weight-bold mb-4">Page does not exist.</p>

            <v-btn class="mt-2" color="red-darken-4" prepend-icon="mdi-home" to="/">
              Back to {{ isLoggedIn ? 'Dashboard' : 'Homepage' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
