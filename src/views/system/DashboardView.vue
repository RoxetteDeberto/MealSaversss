<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
// import { ref } from 'vue'

const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com',
}
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
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded>Account Settings</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
    <template #content>
      <v-container fluid>
        <v-layout>
          <v-navigation-drawer expand-on-hover rail>
            <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
              <v-list-item
                prepend-icon="mdi-account-multiple"
                title="Shared with me"
                value="shared"
              ></v-list-item>
              <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
            </v-list>
          </v-navigation-drawer>

          <v-main style="height: 850px"></v-main>
        </v-layout>
      </v-container>
    </template>
  </AppLayout>
</template>
