<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="fill-height d-flex justify-center align-center pa-4 claims-bg">
        <v-row align="center" justify="center" class="ma-0" style="max-width: 900px; width: 100%">
          <v-col cols="12">
            <v-card class="rounded-lg" color="#ffffff" elevation="4">
              <v-card-title class="text-h6 text-brown-darken-2 pa-6">
                <v-icon color="brown-darken-2" class="me-2">mdi-hand-extended</v-icon>
                Claimable Donations
              </v-card-title>
              <v-card-text>
                <v-table class="claims-table">
                  <thead>
                    <tr>
                      <th class="text-left">Date</th>
                      <th class="text-left">Charity</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Amount</th>
                      <th class="text-left">Status</th>
                      <th class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in claimableDonations" :key="item.id" class="claim-row">
                      <td>{{ formatDate(item.created_at) }}</td>
                      <td>{{ item.charities?.name || getCharityName(item.charity_id) }}</td>
                      <td>{{ item.type }}</td>
                      <td>${{ item.amount }}</td>
                      <td>
                        <v-chip :color="getStatusColor(item.status)" size="small">
                          {{ item.status }}
                        </v-chip>
                      </td>
                      <td class="text-right">
                        <v-btn
                          color="success"
                          variant="elevated"
                          size="small"
                          :disabled="item.status === 'Claimed' || claimingId === item.id"
                          @click="claimDonation(item)"
                        >
                          <v-icon left>mdi-hand-extended</v-icon>
                          Claim
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <div v-if="claimableDonations.length === 0" class="mt-4 text-center text-brown-darken-2">
                  <v-icon color="warning" class="me-1">mdi-information</v-icon>
                  No donations available to claim at this time.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase } from '@/utils/supabase'

const authStore = useAuthUserStore()
const claimableDonations = ref([])
const charities = ref([])
const claimingId = ref(null)

const fetchCharities = async () => {
  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .eq('status', 'active')
    .order('name')
  if (!error) charities.value = data
}

const fetchClaimableDonations = async () => {
  const { data, error } = await supabase
    .from('donations')
    .select(`*, charities (name, description)`)
    .in('status', ['Available', 'Pending'])
    .order('created_at', { ascending: false })
  if (!error) claimableDonations.value = data
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  const colors = {
    'Available': 'info',
    'Pending': 'warning',
    'Claimed': 'success',
    'Completed': 'success',
    'Cancelled': 'error'
  }
  return colors[status] || 'grey'
}

const getCharityName = (charityId) => {
  const charity = charities.value.find(c => c.id === charityId)
  return charity ? charity.name : 'Unknown Charity'
}

const claimDonation = async (item) => {
  claimingId.value = item.id
  try {
    const { error } = await supabase
      .from('donations')
      .update({ status: 'Claimed', claimed_by: authStore.userData.id })
      .eq('id', item.id)
    if (!error) {
      await fetchClaimableDonations()
      alert('Donation claimed successfully!')
    } else {
      alert('Error claiming donation: ' + error.message)
    }
  } catch (e) {
    alert('Error claiming donation: ' + e.message)
  } finally {
    claimingId.value = null
  }
}

onMounted(async () => {
  await fetchCharities()
  await fetchClaimableDonations()
})
</script>

<style scoped>
.claims-bg {
  background: linear-gradient(135deg, #fffbe6 0%, #ffe0b2 100%);
}
.claim-row {
  transition: background-color 0.3s;
}
.claim-row:hover {
  background-color: #fffbe6;
}
</style> 