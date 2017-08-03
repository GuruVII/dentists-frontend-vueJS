import Vue from 'vue'
import Router from 'vue-router'
import dentists from './../components/dentists.vue'
import about from './../components/about.vue'


Vue.use(Router)

export default new Router({
   routes: [
     {
       path: '/',
       name: 'dentist',
       component: dentists
     },
     {
       path: '/about/',
       name: 'about',
       component: about,
     }
   ]
})