import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import styles
import "@/scss/site.scss";

// IMPORT LIBS
import { Dropdown } from 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// IMPORT TIMEAGO
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
})

// ADD FILTERS
import moment from 'moment/moment'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

// IMPORT LAYOUTS
import Default from "./layouts/Default";
import SidebarLayout from "./layouts/Sidebar";
import LoginLayout from "./layouts/Login";
Vue.component('default_layout', Default);
Vue.component('sidebar_layout', SidebarLayout);
Vue.component('login_layout', LoginLayout);

// START SOCKET IO
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3008/chat',
  options: {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 1
  }
}));

// INITIALIZE VUE
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// CHECK BEFORE EACH ROUTE CHANGE IF USER IS LOGGED IN
router.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    });
  }
  next();

})