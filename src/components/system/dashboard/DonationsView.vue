<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4 donations-bg">
        <v-row align="center" justify="center" class="ma-0" style="max-width: 1200px; width: 100%">
          <!-- Donation Form Card -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="pa-6 rounded-lg" color="#ffffff" elevation="4">
              <div class="text-center mb-6">
                <v-avatar size="72" class="mb-3 donation-icon">
                  <v-icon size="56" color="brown-darken-2">mdi-hand-heart</v-icon>
                </v-avatar>
                <h1 class="text-h4 font-weight-bold text-brown-darken-2 mb-2">
                  Make a Donation
                </h1>
                <p class="text-body-1 text-grey-darken-3 mb-2">
                  Your contribution helps us reduce food waste and support those in need
                </p>
                <v-card class="pa-3 mb-4 quote-card" color="brown-lighten-5" elevation="0">
                  <v-icon color="brown-darken-2" size="24" class="me-2">mdi-format-quote-open</v-icon>
                  <span class="font-italic text-brown-darken-2">“Giving is not just about making a donation. It's about making a difference.”</span>
                </v-card>
              </div>

              <v-form @submit.prevent="handleSubmit" ref="form">
                <v-row>
                  <!-- Charity Selection -->
                  <v-col cols="12">
                    <v-select
                      v-model="donation.charity_id"
                      :items="charities"
                      item-title="name"
                      item-value="id"
                      label="Select Charity"
                      variant="outlined"
                      :rules="[v => !!v || 'Charity is required']"
                      required
                      class="form-field"
                    >
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props">
                          <v-list-item-subtitle>{{ item.raw.description }}</v-list-item-subtitle>
                        </v-list-item>
                      </template>
                      <template v-slot:selection="{ item }">
                        <v-list-item>
                          <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>

                  <!-- Donation Type -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="donation.type"
                      :items="donationTypes"
                      label="Donation Type"
                      variant="outlined"
                      :rules="[v => !!v || 'Donation type is required']"
                      required
                      class="form-field"
                    ></v-select>
                  </v-col>

                  <!-- Amount -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="donation.amount"
                      label="Amount"
                      type="number"
                      variant="outlined"
                      :rules="[v => !!v || 'Amount is required']"
                      required
                      class="form-field"
                      step="any"
                      min="0.01"
                    ></v-text-field>
                  </v-col>

                  <!-- Description -->
                  <v-col cols="12">
                    <v-textarea
                      v-model="donation.description"
                      label="Description"
                      variant="outlined"
                      rows="3"
                      :rules="[v => !!v || 'Description is required']"
                      required
                      class="form-field"
                    ></v-textarea>
                  </v-col>

                  <!-- Submit Button -->
                  <v-col cols="12" class="text-center">
                    <v-btn
                      type="submit"
                      color="brown-darken-2"
                      size="large"
                      :loading="loading"
                      :disabled="loading"
                      class="px-8 submit-btn"
                    >
                      <v-icon left>mdi-gift</v-icon>
                      Submit Donation
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>

          <!-- Donation History Card -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="rounded-lg" color="#ffffff" elevation="4">
              <v-card-title class="text-h6 text-brown-darken-2 pa-6">
                <v-icon color="brown-darken-2" class="me-2">mdi-history</v-icon>
                Recent Donations
              </v-card-title>
              <v-card-text>
                <v-table class="donations-table">
                  <thead>
                    <tr>
                      <th class="text-left"><v-icon size="18" color="brown-darken-2" class="me-1">mdi-calendar</v-icon>Date</th>
                      <th class="text-left"><v-icon size="18" color="brown-darken-2" class="me-1">mdi-account-group</v-icon>Charity</th>
                      <th class="text-left"><v-icon size="18" color="brown-darken-2" class="me-1">mdi-tag</v-icon>Type</th>
                      <th class="text-left"><v-icon size="18" color="brown-darken-2" class="me-1">mdi-currency-usd</v-icon>Amount</th>
                      <th class="text-left"><v-icon size="18" color="brown-darken-2" class="me-1">mdi-check-circle</v-icon>Status</th>
                      <th class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in filteredDonations" :key="item.id" class="donation-row">
                      <td>{{ formatDate(item.created_at) }}</td>
                      <td>{{ item.charities?.name || getCharityName(item.charity_id) }}</td>
                      <td>{{ item.type }}</td>
                      <td>${{ item.amount }}</td>
                      <td>
                        <v-chip
                          :color="getStatusColor(item.status)"
                          size="small"
                        >
                          {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
                        </v-chip>
                      </td>
                      <td class="text-right">
                        <v-btn
                          icon="mdi-eye"
                          variant="text"
                          size="small"
                          color="brown-darken-2"
                          @click="viewDonation(item)"
                        ></v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <div class="thank-you-msg mt-4 text-center text-brown-darken-2">
                  <v-icon color="success" class="me-1">mdi-emoticon-happy</v-icon>
                  Thank you for making a difference!
                </div>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn
                  color="brown-darken-2"
                  variant="text"
                  class="text-none"
                  @click="viewAllDonations"
                >
                  View All Donations
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Donation Details Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="dialog-card">
            <v-card-title class="text-h6 text-brown-darken-2 d-flex align-center">
              <v-icon color="brown-darken-2" class="me-2">mdi-gift</v-icon>
              Donation Details
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="brown-darken-2">mdi-calendar</v-icon>
                  </template>
                  <v-list-item-title>Date</v-list-item-title>
                  <v-list-item-subtitle>{{ formatDate(selectedDonation?.created_at) }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="brown-darken-2">mdi-account-group</v-icon>
                  </template>
                  <v-list-item-title>Charity</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedDonation?.charities?.name || getCharityName(selectedDonation?.charity_id) }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="brown-darken-2">mdi-tag</v-icon>
                  </template>
                  <v-list-item-title>Type</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedDonation?.type }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="brown-darken-2">mdi-currency-usd</v-icon>
                  </template>
                  <v-list-item-title>Amount</v-list-item-title>
                  <v-list-item-subtitle>${{ selectedDonation?.amount }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="brown-darken-2">mdi-text-box</v-icon>
                  </template>
                  <v-list-item-title>Description</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedDonation?.description }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="brown-darken-2" variant="text" @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const route = useRoute()
const authStore = useAuthUserStore()
const form = ref(null)
const loading = ref(false)
const dialog = ref(false)
const selectedDonation = ref(null)
const charities = ref([])
const recentDonations = ref([])
const selectedCharity = ref(null)

// Computed property for filtered donations
const filteredDonations = computed(() => {
  return recentDonations.value.filter(donation => 
    donation.user_id === authStore.userData?.id
  )
})

const donationTypes = [
  'Fresh Food',
  'Canned Goods',
  'Baked Goods',
  'Dairy Products',
  'Frozen Food',
  'Other'
]

const donation = ref({
  charity_id: '',
  type: '',
  amount: '',
  description: '',
  status: 'pending'
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
    'available': 'info',
    'claimed': 'success',
    'pending': 'warning',
    'cancelled': 'error'
  }
  return colors[status] || 'grey'
}

// Get charity name helper
const getCharityName = (charityId) => {
  const charity = charities.value.find(c => c.id === charityId)
  return charity ? charity.name : 'Unknown Charity'
}

// Watch for route changes to update selected charity
watch(
  () => route.query.charity_id,
  async (newCharityId) => {
    if (newCharityId) {
      const charity = charities.value.find(c => c.id === newCharityId)
      if (charity) {
        selectedCharity.value = charity
        donation.value.charity_id = charity.id
      }
    }
  },
  { immediate: true }
)

// Fetch charities
const fetchCharities = async () => {
  try {
    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .eq('status', 'active')
      .order('name')

    if (error) throw error
    charities.value = data

    // If there's a charity_id in the route, set it as selected
    if (route.query.charity_id) {
      const charity = data.find(c => c.id === route.query.charity_id)
      if (charity) {
        selectedCharity.value = charity
        donation.value.charity_id = charity.id
      }
    }
  } catch (error) {
    console.error('Error fetching charities:', error)
  }
}

// Fetch user's donations
const fetchDonations = async () => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select(`
        *,
        charities (
          name,
          description,
          image_url
        ),
        users (
          firstname,
          lastname
        )
      `)
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

const ensureUserExists = async () => {
  try {
    // Check if user exists in users table
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', authStore.userData.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking user:', fetchError);
      throw fetchError;
    }

    if (!existingUser) {
      console.log('User not found in users table, creating...');
      // Create user record if it doesn't exist
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: authStore.userData.id,
            firstname: authStore.userData.user_metadata?.firstname || '',
            lastname: authStore.userData.user_metadata?.lastname || '',
            email: authStore.userData.email,
            role: 'user'
          }
        ]);

      if (insertError) {
        console.error('Error creating user:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error in ensureUserExists:', error);
    throw error;
  }
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  
  if (valid) {
    loading.value = true
    try {
      // Ensure user exists in users table before submitting donation
      await ensureUserExists();

      console.log('Submitting donation:', {
        user_id: authStore.userData.id,
        charity_id: donation.value.charity_id,
        type: donation.value.type,
        amount: parseFloat(donation.value.amount),
        description: donation.value.description,
        status: 'available'
      });

      // Insert donation
      const { data: donationData, error: donationError } = await supabase
        .from('donations')
        .insert([
          {
            user_id: authStore.userData.id,
            charity_id: donation.value.charity_id,
            type: donation.value.type,
            amount: parseFloat(donation.value.amount),
            description: donation.value.description,
            status: 'available'
          }
        ])
        .select()
        .single()

      if (donationError) {
        console.error('Donation insertion error:', donationError);
        throw donationError;
      }

      console.log('Donation created successfully:', donationData);

      // Add to donation status history
      const { error: historyError } = await supabase
        .from('donation_status_history')
        .insert([
          {
            donation_id: donationData.id,
            status: 'available',
            notes: 'Donation created and available for claiming'
          }
        ])

      if (historyError) {
        console.error('Status history insertion error:', historyError);
        throw historyError;
      }

      // Reset form after successful submission
      form.value.reset()
      
      // Show success message
      alert('Donation submitted successfully!')
      
      // Refresh donations list
      await fetchDonations()
    } catch (error) {
      console.error('Detailed error submitting donation:', error);
      alert(`Error submitting donation: ${error.message || 'Please try again.'}`);
    } finally {
      loading.value = false
    }
  }
}

const viewDonation = (donation) => {
  selectedDonation.value = donation
  dialog.value = true
}

const viewAllDonations = () => {
  router.push({ name: 'DonationsHistory' })
}

onMounted(async () => {
  // Ensure user data is loaded
  if (!authStore.userData) {
    console.log('No user data found, fetching...');
    await authStore.getUserInformation();
  }
  
  console.log('Current user data:', authStore.userData);
  
  // Fetch initial data
  await fetchCharities();
  await fetchDonations();
  
  // Set up real-time subscription
  const subscription = setupRealtimeSubscription();
  
  // Cleanup subscription on component unmount
  onUnmounted(() => {
    subscription.unsubscribe();
  });
});
</script>

<style scoped>
.donations-bg {
  background: linear-gradient(135deg, #fffbe6 0%, #ffe0b2 100%);
}
.v-card {
  backdrop-filter: blur(10px);
}
.donation-icon {
  background: #fffbe6;
  border: 2px solid rgb(var(--v-theme-brown-darken-2));
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.3s;
}
.donation-icon:hover {
  transform: scale(1.08);
}
.quote-card {
  display: flex;
  align-items: center;
  font-size: 1rem;
  background: #fffbe6;
  border-left: 4px solid #a1887f;
}
.form-field :deep(.v-input__control) {
  transition: box-shadow 0.3s;
}
.form-field :deep(.v-input__control):focus-within {
  box-shadow: 0 0 0 2px #a1887f33;
}
.submit-btn {
  text-transform: none !important;
  font-weight: bold;
  letter-spacing: 0.5px;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(109,76,65,0.08);
  transition: background 0.3s, box-shadow 0.3s;
}
.submit-btn:hover {
  background: #8d6e63 !important;
  box-shadow: 0 8px 24px rgba(109,76,65,0.16);
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
  padding: 12px 16px;
}
.donations-table .v-table__wrapper > table > tbody > tr > td {
  padding: 12px 16px;
  color: rgb(var(--v-theme-grey-darken-3));
}
.donation-row {
  transition: background-color 0.3s;
}
.donation-row:hover {
  background-color: #fffbe6;
}
.thank-you-msg {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.dialog-card {
  border-left: 4px solid #a1887f;
  background: #fffbe6;
  box-shadow: 0 4px 24px rgba(109,76,65,0.10);
}
</style> 