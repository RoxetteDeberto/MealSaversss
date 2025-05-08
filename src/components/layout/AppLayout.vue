<script setup>
import BottomNavigation from '@/components/layout/Navigation/BottomNavigation.vue'
// import TopProfileNavigation from '@/components/layout/Navigation/TopProfileNavigation.vue'
import SideNavigation from '@/components/layout/Navigation/SideNavigation.vue'
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
      <v-btn variant="text" class="text-h6 font-weight-bold" :class="theme === 'dark' ? 'text-white' : 'text-brown-darken-2'" href="#">
        <div class="d-flex align-center">
          <v-img src="/images/bear.jpg" alt="Bear Logo" width="36" height="36" class="me-2" style="border-radius: 50%; box-shadow: 0 2px 8px rgba(109,76,65,0.10); background: #fffbe6;" />
          MealSavers
        </div>
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
    <!-- <v-btn
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
    </v-btn> -->

    <!-- Bottom Navigation for Mobile -->
    <BottomNavigation v-if="isMobileLogged" />
  </v-app>
</template>

<style scoped>
.logo-container {
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.logo-container.dark-bg {
  background-color: rgba(0, 0, 0, 0.7);
}

.logo-image {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.v-app-bar {
  backdrop-filter: blur(10px);
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-btn:hover .v-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
