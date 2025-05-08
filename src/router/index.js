import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import AccountSettings from '@/views/system/AccountSettings.vue'
import HomeView from '@/components/system/dashboard/HomeView.vue'
import AboutUsView from '@/components/system/dashboard/AboutUsView.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import DonationsView from '@/components/system/dashboard/DonationsView.vue'
import CharitiesView from '@/views/system/CharitiesView.vue'
import ProfileView from '@/views/system/ProfileView.vue'
import ClaimsView from '@/views/system/ClaimsView.vue'
import { useAuthUserStore } from '@/stores/authUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/homeview',
      name: 'homeview',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/aboutusview',
      name: 'aboutusview',
      component: AboutUsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: NotFoundView,
    },
    {
      path: '/accountsettings',
      name: 'accountsettings',
      component: AccountSettings,
      meta: { requiresAuth: true }
    },
    {
      path: '/charities',
      name: 'charities',
      component: CharitiesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/donations',
      name: 'donations',
      component: DonationsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/claims',
      name: 'claims',
      component: ClaimsView,
      meta: { requiresGuest: true }
    },
  ],
})

// Navigation Guards
router.beforeEach(async (to) => {
  const authStore = useAuthUserStore()
  const isAuthenticated = await authStore.isAuthenticated()

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  // If route requires guest and user is authenticated
  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'homeview' }
  }

  // If user is authenticated and tries to access login/register
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return { name: 'homeview' }
  }

  return true
})

export default router
