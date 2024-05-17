import { createRouter, createWebHistory } from 'vue-router'
import BienvenidaView from '../views/BienvenidaView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import InicioView from '../views/InicioView.vue'
import ProductosView from '../views/ProductosView.vue'
import CarritoView from '../views/CarritoView.vue'
import VerificarView from '../views/VerificarView.vue'
import HistorialView from '../views/HistorialView.vue'
import PerfilView from '../views/PerfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bienvenida',
      component: BienvenidaView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/verificar',
      name: 'verificar',
      component: VerificarView
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/productos/:id',
      name: 'productos',
      component: ProductosView
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoView
    },
    {
      path: '/historial',
      name: 'historial',
      component: HistorialView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView
    },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
