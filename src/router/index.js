import Vue from 'vue'
import Router from 'vue-router'
import dentists from './../components/dentists.vue'
import test from './../components/test.vue'


Vue.use(Router)

export default new Router({
   routes: [
     {
       path: '/',
       name: 'dentist',
       component: dentists
     },
     {
       path: '/test/',
       name: 'test',
       component: test,
     }
   ]
})