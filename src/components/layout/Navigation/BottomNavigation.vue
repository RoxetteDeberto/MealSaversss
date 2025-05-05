<script setup>
import { useAuthUserStore } from '@/stores/authUser'

const props = defineProps(['theme'])

const authStore = useAuthUserStore()

const onFilterPages = (path) => {
  if (authStore.userRole === 'Super Administrator') return true
  return authStore.authPages.includes(path)
}
</script>

<template>
  <v-bottom-navigation
    :bg-color="props.theme === 'light' ? 'light-blue lighten-5' : 'light-blue darken-4'"
    color="primary"
    grow
    elevation="4"
    class="rounded-t-xl"
  >
    <v-btn to="/dashboard">
      <v-icon>mdi-view-dashboard</v-icon>
      <span class="text-caption">Dashboard</span>
    </v-btn>

    <v-btn v-if="onFilterPages('/inventory/sales')" to="/inventory/sales">
      <v-icon>mdi-cart-outline</v-icon>
      <span class="text-caption">Check Out</span>
    </v-btn>

    <v-btn v-if="onFilterPages('/inventory/stockin')" to="/inventory/stockin">
      <v-icon>mdi-tray-arrow-down</v-icon>
      <span class="text-caption">Stock In</span>
    </v-btn>

    <v-btn v-if="onFilterPages('/inventory/segregate')" to="/inventory/segregate">
      <v-icon>mdi-tray-full</v-icon>
      <span class="text-caption">Segregate</span>
    </v-btn>
  </v-bottom-navigation>
</template>
