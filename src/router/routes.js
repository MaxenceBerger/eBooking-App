const routes = [
  {
    path: '/',
    name: 'HomePublicPage',
    component: () => import('pages/HomePublic.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/home',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('pages/Home.vue'),
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
