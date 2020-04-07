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
        component: () => import('../pages/Login.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/register',
        name: 'RegisterPage',
        component: () => import('../pages/Register.vue'),
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
        component: () => import('pages/Home.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/search',
        name: 'SearchPage',
        component: () => import('pages/Search.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/rent',
        name: 'RentPage',
        component: () => import('pages/Rent.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/publication/:idPublication',
        name: 'PublicationDetailPage',
        component: () => import('pages/PublicationDetail.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/reservation/:idReservation',
        name: 'ReservationDetailPage',
        component: () => import('pages/ReservationDetail.vue'),
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
        component: () => import('pages/MyAccount.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/account/information',
        name: 'MyAccountInformationPage',
        component: () => import('pages/MyAccountInformation.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/dashboard/host',
        name: 'DashboardPublicationsAndRentsPage',
        component: () => import('pages/DashboardPublicationsAndRents.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/account/modify-password',
        name: 'MyAccountModifyPWPage',
        component: () => import('pages/MyAccountModifyPW.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/advertisement/create',
        name: 'AdvertisementCreatePage',
        component: () => import('pages/AdvertisementCreate.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/general-conditions',
        name: 'GeneralConditionsPage',
        component: () => import('pages/GeneralConditions.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/smart-key/install',
        name: 'SmartKeyInstallPage',
        component: () => import('pages/SmartKeyInstall.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
