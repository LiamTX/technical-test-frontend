import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Views.vue'),
    children: [
     {
      path: '/Feed',
      name: 'Feed',
      component: () => import('../views/pages/Feed.vue')
     }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router