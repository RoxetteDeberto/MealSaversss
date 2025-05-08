<script setup>
// import BottomNavigation from '@/components/layout/Navigation/BottomNavigation.vue'
// import TopProfileNavigation from '@/components/layout/Navigation/TopProfileNavigation.vue'
import SideNavigation from '@/components/layout/Navigation/SideNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { getAvatarText } from '@/utils/helpers'

const emit = defineEmits(['theme'])

const { mobile } = useDisplay()
const authStore = useAuthUserStore()

const isLoggedIn = computed(() => {
  return !!authStore.userData
})

const isMobile = computed(() => {
  return mobile.value
})

const theme = ref(localStorage.getItem('theme') ?? 'light')
const isDrawerVisible = ref(!mobile.value)
const formAction = ref({
  formProcess: false
})

const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  emit('theme', theme.value)
}

const onLogout = async () => {
  formAction.value.formProcess = true
  await authStore.logout()
  formAction.value.formProcess = false
}

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isDrawerVisible.value = !mobile.value
})
</script>
<template>
  <v-app :theme="theme" style="background-color: #f5f5dc">
    <!-- Side Navigation -->
    <SideNavigation v-if="isLoggedIn" :isDrawerVisible="isDrawerVisible" />

    <!-- Top App Bar -->
    <v-app-bar
      v-if="isLoggedIn"
      color="transparent"
      flat
      class="elevation-2"
      style="backdrop-filter: blur(10px)"
    >
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click="isDrawerVisible = !isDrawerVisible"
        class="d-flex d-md-none"
      ></v-app-bar-nav-icon>
      
      <v-btn variant="text" class="text-h6 font-weight-bold" :class="theme === 'dark' ? 'text-white' : 'text-brown-darken-2'" href="#">
        <div class="d-flex align-center">
          <v-img src="/images/bear.jpg" alt="Bear Logo" width="36" height="36" class="me-2" style="border-radius: 50%; box-shadow: 0 2px 8px rgba(109,76,65,0.10); background: #fffbe6;" />
          MealSavers
        </div>
      </v-btn>
      <v-spacer />
      <div class="d-flex align-center">
        <v-menu min-width="200px" rounded>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar
                v-if="authStore.userData?.image_url"
                :image="authStore.userData.image_url"
                color="brown-darken-2"
                size="40"
              ></v-avatar>
              <v-avatar v-else color="brown-darken-2" size="40">
                <span class="text-h6 text-white">
                  {{ getAvatarText(authStore.userData?.firstname + ' ' + authStore.userData?.lastname) }}
                </span>
              </v-avatar>
            </v-btn>
          </template>

          <v-card class="mt-1">
            <v-card-text>
              <v-list>
                <v-list-item
                  :subtitle="authStore.userData?.email"
                  :title="authStore.userData?.firstname + ' ' + authStore.userData?.lastname"
                >
                  <template #prepend>
                    <v-avatar
                      v-if="authStore.userData?.image_url"
                      :image="authStore.userData.image_url"
                      color="brown-darken-2"
                      size="40"
                    ></v-avatar>
                    <v-avatar v-else color="brown-darken-2" size="40">
                      <span class="text-h6 text-white">
                        {{ getAvatarText(authStore.userData?.firstname + ' ' + authStore.userData?.lastname) }}
                      </span>
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-list>

              <v-divider class="my-3"></v-divider>

              <v-btn prepend-icon="mdi-wrench" variant="plain" to="/accountsettings">
                Account Settings
              </v-btn>

              <v-divider class="my-3"></v-divider>

              <v-btn
                prepend-icon="mdi-logout"
                variant="plain"
                @click="onLogout"
                :loading="formAction.formProcess"
                :disabled="formAction.formProcess"
              >
                Logout
              </v-btn>
            </v-card-text>
          </v-card>
        </v-menu>
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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

/* Add responsive styles */
@media (max-width: 600px) {
  .v-app-bar {
    padding: 0 8px;
  }
  
  .v-btn {
    padding: 0 8px;
  }
  
  .v-avatar {
    width: 32px !important;
    height: 32px !important;
  }
}

/* Ensure content doesn't get hidden behind the app bar */
.v-main {
  padding-top: 64px !important;
}

@media (max-width: 600px) {
  .v-main {
    padding-top: 56px !important;
  }
}
</style>
