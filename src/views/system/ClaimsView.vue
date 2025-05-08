<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = useRouter()
const donations = ref([])
const charities = ref([])
const loading = ref(true)
const showContent = ref(false)
const showSuccessSnackbar = ref(false)
const successMessage = ref('')

// Fetch available donations and charities from Supabase
const fetchData = async () => {
  try {
    // Fetch donations
    const { data: donationsData, error: donationsError } = await supabase
      .from('donations')
      .select(`
        *,
        charities (
          name,
          image_url,
          description
        ),
        users (
          firstname,
          lastname
        )
      `)
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (donationsError) throw donationsError
    donations.value = donationsData

    // Fetch charities
    const { data: charitiesData, error: charitiesError } = await supabase
      .from('charities')
      .select('*')
      .eq('status', 'active')
      .order('name')

    if (charitiesError) throw charitiesError
    charities.value = charitiesData

  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

// Set up real-time subscription for donations
const setupRealtimeSubscription = () => {
  const subscription = supabase
    .channel('donations_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'donations'
      },
      (payload) => {
        // Update donations list when changes occur
        fetchData()
      }
    )
    .subscribe()

  return subscription
}

// Handle claim action
const handleClaim = async (donation) => {
  try {
    loading.value = true
    
    // Simply update the status to claimed
    const { error } = await supabase
      .from('donations')
      .update({ 
        status: 'claimed'
      })
      .eq('id', donation.id)

    if (error) throw error
    
    // Show success message
    successMessage.value = 'Donation claimed successfully!'
    showSuccessSnackbar.value = true

    // Refresh the donations list
    await fetchData()
  } catch (error) {
    console.error('Error claiming donation:', error)
    successMessage.value = 'Error claiming donation. Please try again.'
    showSuccessSnackbar.value = true
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()
  setTimeout(() => {
    showContent.value = true
  }, 300)

  // Set up real-time subscription
  const subscription = setupRealtimeSubscription()
  
  // Cleanup subscription on component unmount
  onUnmounted(() => {
    subscription.unsubscribe()
  })
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
                  <div class="d-flex justify-end mb-4">
                    <v-btn
                      color="brown-darken-2"
                      variant="outlined"
                      prepend-icon="mdi-arrow-left"
                      @click="router.push('/')"
                    >
                      Back to Login
                    </v-btn>
                  </div>
                  <h1 class="text-h3 font-weight-bold text-brown-darken-2 mb-4">
                    🍽️ Available Donations
                  </h1>
                  <p class="text-body-1 text-grey-darken-3">
                    Browse through the available food donations and claim what you need.
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

            <!-- Donation Cards -->
            <v-col
              v-for="donation in donations"
              :key="donation.id"
              cols="12"
              md="4"
              class="mb-4"
            >
              <v-card class="h-100 rounded-lg" color="#ffffff" elevation="4">
                <v-img
                  :src="donation.charities?.image_url || '/default-charity.jpg'"
                  height="200"
                  cover
                  class="align-end"
                >
                  <v-card-title class="text-white text-shadow">
                    {{ donation.charities?.name }}
                  </v-card-title>
                </v-img>
                <v-card-text class="pt-4">
                  <h3 class="text-h6 mb-2">{{ donation.type }} Donation</h3>
                  <p class="text-body-1 text-grey-darken-3 mb-4">
                    {{ donation.description }}
                  </p>
                  <!-- <div class="d-flex align-center mt-2">
                    <v-icon size="small" color="brown-darken-2" class="me-1">mdi-account</v-icon>
                    <span class="text-body-2 text-grey-darken-3">
                      Donated by: {{ donation.users?.firstname }} {{ donation.users?.lastname }}
                    </span>
                  </div> -->
                  <div class="d-flex align-center mt-2">
                    <v-icon size="small" color="brown-darken-2" class="me-1">mdi-clock-outline</v-icon>
                    <span class="text-body-2 text-grey-darken-3">
                      Posted: {{ new Date(donation.created_at).toLocaleDateString() }}
                    </span>
                  </div>
                  <div class="d-flex align-center mt-2">
                    <v-icon size="small" color="brown-darken-2" class="me-1">mdi-map-marker</v-icon>
                    <span class="text-body-2 text-grey-darken-3">{{ donation.location }}</span>
                  </div>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn
                    color="brown-darken-2"
                    variant="elevated"
                    class="text-none"
                    @click="handleClaim(donation)"
                  >
                    Claim Donation
                    <v-icon end>mdi-hand-heart</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- Partner Charities Section -->
            <v-col cols="12" class="mt-8">
              <v-card class="pa-6 rounded-lg" color="#ffffff" elevation="4">
                <div class="text-center mb-6">
                  <h2 class="text-h4 font-weight-bold text-brown-darken-2">
                    🤝 Our Partner Charities
                  </h2>
                  <p class="text-body-1 text-grey-darken-3">
                    These amazing organizations are working with us to make a difference.
                  </p>
                </div>
                <v-row>
                  <v-col
                    v-for="charity in charities"
                    :key="charity.id"
                    cols="12"
                    md="4"
                    class="mb-4"
                  >
                    <v-card class="h-100 rounded-lg" color="#ffffff" elevation="2">
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
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </transition>

        <!-- Success Snackbar -->
        <v-snackbar
          v-model="showSuccessSnackbar"
          :color="successMessage.includes('Error') ? 'error' : 'success'"
          timeout="3000"
          location="top"
        >
          {{ successMessage }}
          <template v-slot:actions>
            <v-btn
              color="white"
              variant="text"
              @click="showSuccessSnackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
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
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style> 