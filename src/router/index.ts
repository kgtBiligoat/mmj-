import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import dataMigration from '../views/dataMigration/Index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/dataMigration',
    name: 'dataMigration',
    component: dataMigration
  },
]

const router = new VueRouter({
  routes
})

export default router
