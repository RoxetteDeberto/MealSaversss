<script setup>


import AppLayout from '@/components/layout/AppLayout.vue'

import { useDisplay } from 'vuetify'
import { ref } from 'vue'

// Use Pinia Store


// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables

const isDrawerVisible = ref(mobile.value ? false : true)
const theme = ref(localStorage.getItem('theme') ?? 'light')

// On Theme Update
const onThemeUpdate = (value) => {
  theme.value = value
}
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
    @theme="onThemeUpdate"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>

    </template>
  </AppLayout>
</template>
