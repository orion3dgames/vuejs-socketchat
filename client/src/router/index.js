import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: "login"},
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/chats',
      name: 'chats',
      meta: { layout: "sidebar"},
      component: () => import('../views/Chats.vue'),
      props: route => ({ active_tab: route.query.active_tab })
    },
    {
      path: '/chat/:id',
      name: 'chat',
      meta: { layout: "sidebar", 'opened': true },
      component: () => import('../views/Chat.vue'),
      beforeEnter: (to, from, next) => {
        document.querySelector("#chatbox").classList.add('opened');
        next()
      }
    },
    {
      path: '/meetings',
      name: 'meetings',
      component: () => import('../views/Meetings.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/Activity.vue')
    },

    // otherwise redirect to home
    { path: '*', redirect: '/login' }

  ]
})