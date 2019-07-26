import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Rooms from '@/views/Room.vue'
import Games from './views/Games.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'game',
      component: Game
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/games/:id',
      name: 'games',
      component: Games
    }
]
})
