import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import UserManagementView from '../views/UserManagementView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import AccessDenied from '../views/AccessDeniedView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user-management',
    name: 'user-management',
    component: UserManagementView
  },
  {
    path: '/access-denied',
    name: 'access-denied',
    component: AccessDenied
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
