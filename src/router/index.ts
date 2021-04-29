import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Index.vue'
import dataMigration from '../views/dataMigration/Index.vue'
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
    redirect: '/dataMigration',
    component: Home,
    children:[
      {
        path: 'dataMigration',
        name: 'dataMigration',
        component: dataMigration
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
