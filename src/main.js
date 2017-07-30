import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App)
})
