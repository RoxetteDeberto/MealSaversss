<script setup>
import {
  mainNav,
  menuItemsNav1,
  menuItemsNav2,
  menuItemsNav3,
  menuItemsNav4,
  menuItemsNav5,
} from './sideNavigation'
import { useAuthUserStore } from '@/stores/authUser'
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isDrawerVisible'])

const { mobile } = useDisplay()
const authStore = useAuthUserStore()

const noAccessPages = ref([])
const editableMenuItemsNav1 = ref([...menuItemsNav1])
const editableMenuItemsNav2 = ref([...menuItemsNav2])
const editableMenuItemsNav3 = ref([...menuItemsNav3])
const editableMenuItemsNav4 = ref([...menuItemsNav4])
const editableMenuItemsNav5 = ref([...menuItemsNav5])

const onFilterPages = () => {
  if (authStore.userRole === 'Super Administrator') return

  const menuItems = [
    { items: editableMenuItemsNav1, title: mainNav[0][0] },
    { items: editableMenuItemsNav2, title: mainNav[1][0] },
    { items: editableMenuItemsNav3, title: mainNav[2][0] },
    { items: editableMenuItemsNav4, title: mainNav[3][0] },
    { items: editableMenuItemsNav5, title: mainNav[4][0] },
  ]

  menuItems.forEach(({ items, title }) => {
    items.value = items.value.filter((item) => authStore.authPages.includes(item[3]))
    if (items.value.length === 0) noAccessPages.value.push(title)
  })
}

onMounted(() => {
  onFilterPages()
})
</script>

<template>
  <v-navigation-drawer
    :model-value="props.isDrawerVisible"
    :persistent="mobile"
    :temporary="mobile"
    :permanent="!mobile"
    close-delay="2000"
    width="300"
    expand-on-hover
    rail
    class="pa-2"
    style="background-color: #b2ebf2"
  >
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" title="Home" subtitle="About Us" to="/"></v-list-item>

      <v-list-item prepend-icon="mdi-hand-heart" title="Donations" to="/donations"></v-list-item>

      <v-list-item prepend-icon="mdi-account-group" title="Charities" to="/charities"></v-list-item>

      <v-list-item prepend-icon="mdi-account" title="My Profile" to="/profile"></v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item prepend-icon="mdi-logout" title="Logout" @click="authStore.logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-list-item {
  border-radius: 12px;
  transition: background-color 0.3s ease;
}
.v-list-item:hover {
  background-color: #4dd0e1;
  color: white;
}
</style>
