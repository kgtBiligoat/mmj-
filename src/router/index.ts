import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Index.vue'
import processManagement from '../views/processManagement/Index.vue'
import askLeaveManagement from '../views/askLeaveManagement/Index.vue'
import LoginView from '../views/components/LoginView.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/Login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/processManagement',
    component: Home,
    children:[
      {
        path: 'processManagement',
        name: 'processManagement',
        component: processManagement
      },
      {
        path: 'askLeaveManagement',
        name: 'askLeaveManagement',
        component: askLeaveManagement
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
