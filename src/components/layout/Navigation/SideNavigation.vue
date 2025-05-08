<script setup>
import { useAuthUserStore } from '@/stores/authUser'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isDrawerVisible'])

const { mobile } = useDisplay()
const authStore = useAuthUserStore()
const { proxy } = getCurrentInstance() || {}

const onFilterPages = (path) => {
  if (authStore.userRole === 'Super Administrator') return true
  return authStore.authPages.includes(path)
}

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <v-navigation-drawer
    :model-value="props.isDrawerVisible"
    :permanent="!mobile"
    :temporary="mobile"
    :rail="!mobile"
    expand-on-hover
    width="300"
    class="elevation-2"
    style="background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px)"
  >
    <!-- Sidebar Header: MealSavers Logo and Name -->
    <div class="pa-4 text-center sidebar-header">
      <v-tooltip v-if="!mobile && !props.isDrawerVisible" location="right">
        <template #activator="{ props: tooltipProps }">
          <v-avatar v-bind="tooltipProps" size="48" class="sidebar-logo">
            <v-icon size="36" color="brown-darken-2">mdi-food-apple</v-icon>
          </v-avatar>
        </template>
        <span>MealSavers</span>
      </v-tooltip>
      <template v-else>
        <v-avatar size="48" class="sidebar-logo mb-2">
          <v-icon size="36" color="brown-darken-2">mdi-food-apple</v-icon>
        </v-avatar>
        <!-- <div class="sidebar-title text-brown-darken-2 font-weight-bold text-h6 mt-1">MealSaverss</div> -->
      </template>
    </div>

    <v-divider class="mb-4"></v-divider>

    <v-list nav class="px-2">
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        to="/homeview"
        :active="true"
        class="nav-item"
      />
      <v-list-item
        prepend-icon="mdi-information"
        title="About Us"
        to="/aboutusview"
        class="nav-item"
      />
      <v-list-item
        prepend-icon="mdi-hand-heart"
        title="Donations"
        to="/donations"
        class="nav-item"
      />
      <v-list-item
        prepend-icon="mdi-account-group"
        title="Charities"
        to="/charities"
        class="nav-item"
      />
      <v-list-item
        prepend-icon="mdi-account"
        title="My Profile"
        to="/profile"
        class="nav-item"
      />
      <v-divider class="my-4" />
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        @click="handleLogout"
        class="nav-item logout-item"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.nav-item {
  border-radius: 12px;
  margin: 4px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(76, 175, 80, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-item:hover::before {
  transform: translateX(0);
}

.nav-item:hover {
  background-color: rgba(76, 175, 80, 0.1);
  transform: translateX(8px);
}

.nav-item:hover .v-list-item__prepend {
  transform: scale(1.1);
}

.nav-item--active {
  background-color: rgba(76, 175, 80, 0.15);
  color: rgb(var(--v-theme-brown-darken-2));
}

.nav-item--active .v-list-item__prepend {
  color: rgb(var(--v-theme-brown-darken-2));
}

.logout-item:hover {
  background-color: rgba(244, 67, 54, 0.1);
  color: rgb(244, 67, 54);
}

.logout-item:hover .v-list-item__prepend {
  color: rgb(244, 67, 54);
}

.v-list-item__prepend {
  transition: transform 0.3s ease;
}

.v-avatar {
  border: 3px solid rgb(var(--v-theme-brown-darken-2));
  transition: transform 0.3s ease;
}

.v-avatar:hover {
  transform: scale(1.05);
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}
.sidebar-logo {
  background: #fffbe6;
  border: 2px solid rgb(var(--v-theme-brown-darken-2));
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.3s;
}
.sidebar-logo:hover {
  transform: scale(1.08);
}
.sidebar-title {
  letter-spacing: 1px;
  font-size: 1.2rem;
  transition: opacity 0.3s;
}
</style>
