<script setup>
import BottomNavigation from '@/components/layout/navigation/BottomNavigation.vue'
// import TopProfileNavigation from '@/components/layout/navigation/TopProfileNavigation.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const emit = defineEmits(['theme'])

const { mobile } = useDisplay()
const authStore = useAuthUserStore()

const isLoggedIn = ref(false)
const isMobileLogged = ref(false)
const theme = ref(localStorage.getItem('theme') ?? 'light')

const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  emit('theme', theme.value)
}

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isMobileLogged.value = mobile.value && isLoggedIn.value
})
</script>
<template>
  <v-app :theme="theme" style="background-color: #f5f5dc">
    <!-- Side Navigation -->
    <SideNavigation v-if="isLoggedIn" :isDrawerVisible="true" />

    <!-- Top App Bar -->
    <v-app-bar
      v-if="isLoggedIn"
      color="transparent"
      flat
      class="elevation-2"
      style="backdrop-filter: blur(10px)"
    >
      <v-btn variant="text" class="text-h6 font-weight-bold text-white" href="#">
        MealSavers
      </v-btn>
      <v-spacer />
      <div class="d-flex align-center">
        <v-avatar size="40" class="me-2">
          <v-img :src="authStore.userData.image_url || '/images/img-profile.png'" />
        </v-avatar>
      </div>
    </v-app-bar>

    <!-- Page Content Slot -->
    <slot name="content" />

    <!-- Dark Mode Toggle -->
    <v-btn
      icon
      @click="onToggleTheme"
      class="position-fixed"
      color="brown-darken-3"
      size="large"
      elevation="8"
      style="bottom: 24px; right: 24px"
    >
      <v-icon>
        {{ theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
      </v-icon>
    </v-btn>

    <!-- Bottom Navigation for Mobile -->
    <BottomNavigation v-if="isMobileLogged" />
  </v-app>
</template>
