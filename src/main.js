import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import router from './router'

Vue.use(VueMaterial)
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
})
