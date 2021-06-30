import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('../views/About.vue')
  },
  {
    path: '/principal',
    name: 'Principal',
    component: () => import('../components/siscmpfc/Principal.vue')
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: () => import('../components/siscmpfc/inventario/Inventario.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
