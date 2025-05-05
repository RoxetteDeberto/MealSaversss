<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import { ref } from 'vue'

const showNotFound = ref(false) // Simulate route not found
const hasAccess = ref(false) // Simulated access check
const isDrawerVisible = ref(true)

const initials = ref('')
const fullName = ref('')
const email = ref('')
</script>

<template>
  <AppLayout>
    <template #default>
      <v-container fluid class="pa-0">
        <v-layout>
          <SideNavigation v-if="hasAccess" :isDrawerVisible="isDrawerVisible" />

          <v-main
            style="
              min-height: 100vh;
              background: url('/images/LoginPageBG.png') center/cover no-repeat;
            "
          >
            <ForbiddenView v-if="!hasAccess && !showNotFound" />
            <NotFoundView v-if="showNotFound" />
            <div v-else class="pa-4">
              <p>Initials: {{ initials }}</p>
              <p>Full Name: {{ fullName }}</p>
              <p>Email: {{ email }}</p>

              <router-view />
            </div>
          </v-main>
        </v-layout>
      </v-container>
    </template>
  </AppLayout>
</template>
