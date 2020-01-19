const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/Produtos/:id', component: () => import('pages/Produtos.vue') },
      { path: '/Estoque', component: () => import('pages/Estoque.vue') },
      { path: '/Vendas', component: () => import('pages/Vendas.vue') }
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
