import store from '../store/index.js'

const routes = [
  {
    path: '/',

    component: () => import('layouts/MainPublicLayout.vue'),
    children: [
      {
        path: '/',
        name: 'HomePublicPage',
        component: () => import('pages/HomePublic.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/login',
        name: 'LoginPage',
        component: () => import('pages/AuthPages/Login.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/reset-password',
        name: 'ResetPasswordPage',
        component: () => import('pages/AuthPages/ResetPassword.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/terms-and-conditions',
        name: 'TermsAndConditionsPage',
        component: () => import('pages/TermsAndConditions.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/register',
        name: 'RegisterPage',
        component: () => import('pages/AuthPages/Register.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/home',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('pages/PropertyPages/Home.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/rent',
        name: 'RentPage',
        component: () => import('pages/PropertyPages/Rent.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/publication/:idPublication',
        name: 'PublicationDetailPage',
        component: () => import('pages/PropertyPages/PublicationDetail.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/reservation/:idReservation',
        name: 'ReservationDetailPage',
        component: () => import('pages/PropertyPages/ReservationDetail.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/unlock',
        name: 'UnlockPage',
        component: () => import('pages/Unlock.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/account',
        name: 'MyAccountPage',
        component: () => import('pages/AccountConfigPages/MyAccount.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/account/information',
        name: 'MyAccountInformationPage',
        component: () => import('pages/AccountConfigPages/MyAccountInformation.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/dashboard/host',
        name: 'DashboardPublicationsAndRentsPage',
        component: () => import('pages/AccountConfigPages/DashboardPublicationsAndRents.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/account/modify-password',
        name: 'MyAccountModifyPWPage',
        component: () => import('pages/AccountConfigPages/MyAccountModifyPW.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/advertisement/create',
        name: 'AdvertisementCreatePage',
        component: () => import('pages/AccountConfigPages/AdvertisementCreate.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/general-conditions',
        name: 'GeneralConditionsPage',
        component: () => import('pages/AccountConfigPages/GeneralConditions.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/smart-key/install',
        name: 'SmartKeyInstallPage',
        component: () => import('pages/AccountConfigPages/SmartKeyInstall.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/dashboard',
        name: 'AdminDashboardPage',
        component: () => import('pages/Admin/AdminDashboard.vue'),
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          if (store.getters.getRole !== 'ADMIN') {
            next({ path: '/home' })
          } else {
            next()
          }
        }
      }
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
