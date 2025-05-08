<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = useRouter()
const charities = ref([])
const loading = ref(true)
const showContent = ref(false)

// Fetch charities from Supabase
const fetchCharities = async () => {
  try {
    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .eq('status', 'active')
      .order('name')

    if (error) throw error
    charities.value = data
  } catch (error) {
    console.error('Error fetching charities:', error)
  } finally {
    loading.value = false
  }
}

// Navigate to donations with selected charity
const navigateToDonations = (charity) => {
  router.push({
    name: 'donations',
    query: { charity_id: charity.id }
  })
}

onMounted(async () => {
  await fetchCharities()
  setTimeout(() => {
    showContent.value = true
  }, 300)
})
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4">
        <transition name="slide-fade">
          <v-row
            v-if="showContent"
            align="center"
            justify="center"
            class="ma-0"
            style="max-width: 1200px; width: 100%"
          >
            <!-- Header Section -->
            <v-col cols="12" class="mb-6">
              <v-card class="pa-6 rounded-lg" color="#ffffff" elevation="4">
                <div class="text-center">
                  <h1 class="text-h3 font-weight-bold text-brown-darken-2 mb-4">
                    🤝 Our Partner Charities
                  </h1>
                  <p class="text-body-1 text-grey-darken-3">
                    Discover the amazing organizations we work with to make a difference in our community.
                  </p>
                </div>
              </v-card>
            </v-col>

            <!-- Loading State -->
            <v-col v-if="loading" cols="12" class="text-center">
              <v-progress-circular
                indeterminate
                color="brown-darken-2"
                size="64"
              ></v-progress-circular>
            </v-col>

            <!-- Charity Cards -->
            <v-col
              v-for="charity in charities"
              :key="charity.id"
              cols="12"
              md="4"
              class="mb-4"
            >
              <v-card class="h-100 rounded-lg" color="#ffffff" elevation="4">
                <v-img
                  :src="charity.image_url || '/default-charity.jpg'"
                  height="200"
                  cover
                  class="align-end"
                >
                  <v-card-title class="text-white text-shadow">
                    {{ charity.name }}
                  </v-card-title>
                </v-img>
                <v-card-text class="pt-4">
                  <p class="text-body-1 text-grey-darken-3 mb-4">
                    {{ charity.description }}
                  </p>
                  <div class="d-flex align-center mt-2">
                    <v-icon size="small" color="brown-darken-2" class="me-1">mdi-map-marker</v-icon>
                    <span class="text-body-2 text-grey-darken-3">{{ charity.location }}</span>
                  </div>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn
                    color="brown-darken-2"
                    variant="elevated"
                    class="text-none"
                    @click="navigateToDonations(charity)"
                  >
                    Donate Now
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </transition>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.v-card {
  transition: transform 0.2s, box-shadow 0.2s;
  backdrop-filter: blur(10px);
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}

.v-btn:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
</style> 