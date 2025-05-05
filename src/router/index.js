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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/homeview',
      name: 'homeview',
      component: HomeView,
    },
    {
      path: '/aboutusview',
      name: 'aboutusview',
      component: AboutUsView,
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
    },
    {
      path: '/',
      component: AppLayout, // your dashboard layout
      children: [
        {
          path: 'homeview',
          name: 'HomeView',
          component: () => import('@/components/system/dashboard/HomeView.vue'),
        },
        // other child routes...
      ],
    },
  ],
})

export default router
// import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthUserStore } from '@/stores/authUser'
// import { routes } from './routes'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// router.beforeEach(async (to) => {
//   // Use Pinia Store
//   const authStore = useAuthUserStore()
//   // Load if user is logged in
//   const isLoggedIn = await authStore.isAuthenticated()

//   // Redirect to appropriate page if accessing home route
//   if (to.name === 'home') {
//     return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
//   }

//   // If logged in, prevent access to login or register pages
//   if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
//     // redirect the user to the dashboard page
//     return { name: 'dashboard' }
//   }

//   // If not logged in, prevent access to system pages
//   if (!isLoggedIn && to.meta.requiresAuth) {
//     // redirect the user to the login page
//     return { name: 'login' }
//   }

//   // Check if the user is logged in
//   if (isLoggedIn) {
//     // Load user data if not already done
//     if (!authStore.userData) await authStore.getUserInformation()

//     // Get the user role
//     const isSuperAdmin = authStore.userRole === 'Super Administrator'

//     // Load if not super admin
//     if (!isSuperAdmin) {
//       if (authStore.authPages.length == 0) await authStore.getAuthPages(authStore.userRole)

//       // Check page that is going to if it is in role pages
//       const isAccessible = authStore.authPages.includes(to.path)

//       // Forbid access if not in role pages and if page is not default page
//       if (!isAccessible && !to.meta.isDefault) {
//         return { name: 'forbidden' }
//       }
//     }
//   }
// })

// export default router
