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
