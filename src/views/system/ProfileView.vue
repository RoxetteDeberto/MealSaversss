<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import AppLayout from '@/components/layout/AppLayout.vue'
import { supabase } from '@/utils/supabase'

const authStore = useAuthUserStore()
const showContent = ref(false)
const recentDonations = ref([])

// Mock donation history data - In real app, this would come from your backend
const donationHistory = ref([
  {
    id: 1,
    date: '2024-03-15',
    charity: 'Food Bank Foundation',
    amount: 50.00,
    type: 'Monetary',
    status: 'Completed'
  },
  {
    id: 2,
    date: '2024-03-10',
    charity: 'Community Kitchen',
    amount: 25.00,
    type: 'Food Items',
    status: 'Completed'
  },
  {
    id: 3,
    date: '2024-03-05',
    charity: 'Meal Rescue Network',
    amount: 100.00,
    type: 'Monetary',
    status: 'Completed'
  }
])

const totalDonations = computed(() => {
  return recentDonations.value.reduce((sum, donation) => sum + donation.amount, 0)
})

const donationCount = computed(() => {
  return recentDonations.value.length
})

// Format date helper
const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get status color helper
const getStatusColor = (status) => {
  const colors = {
    'Completed': 'success',
    'Pending': 'warning',
    'Cancelled': 'error'
  }
  return colors[status] || 'grey'
}

// Fetch user's donations
const fetchDonations = async () => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', authStore.userData.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) throw error
    recentDonations.value = data
  } catch (error) {
    console.error('Error fetching donations:', error)
  }
}

// Set up real-time subscription
const setupRealtimeSubscription = () => {
  const subscription = supabase
    .channel('donations_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'donations',
        filter: `user_id=eq.${authStore.userData.id}`
      },
      (payload) => {
        // Update donations list when changes occur
        fetchDonations()
      }
    )
    .subscribe()

  return subscription
}

onMounted(async () => {
  // Ensure user data is loaded
  if (!authStore.userData) {
    await authStore.getUserInformation()
  }
  
  // Fetch initial donations
  await fetchDonations()
  
  // Set up real-time subscription
  const subscription = setupRealtimeSubscription()
  
  // Cleanup subscription on component unmount
  onUnmounted(() => {
    subscription.unsubscribe()
  })

  setTimeout(() => {
    showContent.value = true
  }, 300)
})
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4">
        <v-row align="center" justify="center" class="ma-0" style="max-width: 1200px; width: 100%">
          <!-- User Information Card -->
          <v-col cols="12" md="4" class="mb-6">
            <v-card 
              class="rounded-lg profile-card" 
              color="#ffffff" 
              elevation="4"
              :class="{ 'slide-in': showContent }"
            >
              <v-card-text class="text-center pa-6">
                <div class="profile-image-container mb-4">
                  <v-avatar
                    :image="authStore.userData?.image_url || '/images/img-profile.png'"
                    size="150"
                    class="profile-avatar"
                  >
                    <v-icon size="64" color="brown-darken-2">mdi-account</v-icon>
                  </v-avatar>
                  <div class="profile-status"></div>
                </div>
                <h2 class="text-h5 font-weight-bold text-brown-darken-2 mb-2">
                  {{ authStore.userData?.firstname }} {{ authStore.userData?.lastname }}
                </h2>
                <p class="text-subtitle-1 text-grey-darken-3 mb-4">
                  {{ authStore.userData?.email }}
                </p>
                <v-chip
                  color="brown-darken-2"
                  class="text-white mb-4"
                  size="small"
                >
                  {{ authStore.userRole }}
                </v-chip>
                <v-divider class="my-4"></v-divider>
                <div class="text-left">
                  <p class="mb-3 d-flex align-center">
                    <v-icon color="brown-darken-2" class="me-2">mdi-calendar</v-icon>
                    <span>Member since: {{ formatDate(authStore.userData?.created_at) }}</span>
                  </p>
                  <p class="mb-3 d-flex align-center">
                    <v-icon color="brown-darken-2" class="me-2">mdi-phone</v-icon>
                    <span>Phone: {{ authStore.userData?.phone || 'Not provided' }}</span>
                  </p>
                  <p class="mb-3 d-flex align-center">
                    <v-icon color="brown-darken-2" class="me-2">mdi-map-marker</v-icon>
                    <span>Location: {{ authStore.userData?.location || 'Not provided' }}</span>
                  </p>
                </div>
                <v-btn
                  color="brown-darken-2"
                  class="mt-4 edit-profile-btn"
                  prepend-icon="mdi-account-edit"
                  to="/accountsettings"
                  elevation="2"
                >
                  Edit Profile
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Donation Statistics Card -->
          <v-col cols="12" md="8" class="mb-6">
            <v-card 
              class="rounded-lg stats-card" 
              color="#ffffff" 
              elevation="4"
              :class="{ 'slide-in': showContent }"
            >
              <v-card-title class="text-h6 text-brown-darken-2 pa-6">
                Donation Statistics
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card class="rounded-lg stat-card" color="brown-lighten-5" elevation="2">
                      <v-card-text class="text-center">
                        <v-icon color="brown-darken-2" size="48" class="mb-2 stat-icon">mdi-currency-usd</v-icon>
                        <h3 class="text-h4 font-weight-bold text-brown-darken-2">
                          ${{ totalDonations.toFixed(2) }}
                        </h3>
                        <p class="text-subtitle-1 text-grey-darken-3">Total Donations</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card class="rounded-lg stat-card" color="brown-lighten-5" elevation="2">
                      <v-card-text class="text-center">
                        <v-icon color="brown-darken-2" size="48" class="mb-2 stat-icon">mdi-hand-heart</v-icon>
                        <h3 class="text-h4 font-weight-bold text-brown-darken-2">
                          {{ donationCount }}
                        </h3>
                        <p class="text-subtitle-1 text-grey-darken-3">Donations Made</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Recent Donations Table -->
            <v-card 
              class="rounded-lg mt-6 donations-card" 
              color="#ffffff" 
              elevation="4"
              :class="{ 'slide-in': showContent }"
            >
              <v-card-title class="text-h6 text-brown-darken-2 pa-6">
                Recent Donations
              </v-card-title>
              <v-card-text>
                <v-table class="donations-table">
                  <thead>
                    <tr>
                      <th class="text-left">Date</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Amount</th>
                      <th class="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="donation in recentDonations" :key="donation.id" class="donation-row">
                      <td>{{ formatDate(donation.created_at) }}</td>
                      <td>{{ donation.type }}</td>
                      <td>${{ donation.amount.toFixed(2) }}</td>
                      <td>
                        <v-chip
                          :color="getStatusColor(donation.status)"
                          size="small"
                          class="status-chip"
                        >
                          {{ donation.status }}
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.profile-image-container {
  position: relative;
  display: inline-block;
}

.profile-avatar {
  border: 4px solid rgb(var(--v-theme-brown-darken-2));
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.05);
}

.profile-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: #4CAF50;
  border: 3px solid white;
  border-radius: 50%;
}

.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.stat-icon {
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.donations-table {
  background: transparent !important;
}

.donations-table .v-table__wrapper > table {
  width: 100%;
  border-spacing: 0;
}

.donations-table .v-table__wrapper > table > thead > tr > th {
  color: rgb(var(--v-theme-brown-darken-2));
  font-weight: 600;
  padding: 16px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.donations-table .v-table__wrapper > table > tbody > tr > td {
  padding: 16px;
  color: rgb(var(--v-theme-grey-darken-3));
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.donation-row {
  transition: background-color 0.3s ease;
}

.donation-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.status-chip {
  transition: transform 0.3s ease;
}

.status-chip:hover {
  transform: scale(1.05);
}

.edit-profile-btn {
  transition: all 0.3s ease;
}

.edit-profile-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}
</style> 