<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/Navigation/SideNavigation.vue'
import { ref } from 'vue'

const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com',
}

const isDrawerVisible = ref(true)
</script>

<template>
  <AppLayout>
    <template #avatar>
      <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large" class="me-5">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown" class="me-5">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">{{ user.email }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded>Account Settings</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded>Logout</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>

    <template #content>
      <v-container fluid class="pa-0">
        <v-layout>
          <!-- Elegant Light Blue Sidebar as Component -->
          <SideNavigation :isDrawerVisible="isDrawerVisible" />

          <!-- Main Content Area -->
          <v-main
            style="
              min-height: 100vh;
              background: url('/images/LoginPageBG.png') center/cover no-repeat;
            "
          >
            <router-view />
          </v-main>
        </v-layout>
      </v-container>
    </template>
  </AppLayout>
</template>
