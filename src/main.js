import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin.js'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'
import TooltipDerective from '@/directives/tooltip.derective.js'
import VueMeta from 'vue-meta'

import Paginate from 'vuejs-paginate'

require('babel-polyfill')

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import currencyFilter from './filters/currency.filter'
import localizeFilter from '@/filters/localize.filter.js'
import dateFilter from '@/filters/date.filter.js'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)

Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('dateFilter', dateFilter)

Vue.directive('tooltip', TooltipDerective)

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
    apiKey: 'AIzaSyB9wd7iZAocmzPdt5QcJBh_Kvr4rO6e2tg',
    authDomain: 'vue-crm-project-d2fa9.firebaseapp.com',
    projectId: 'vue-crm-project-d2fa9',
    storageBucket: 'vue-crm-project-d2fa9.appspot.com',
    messagingSenderId: '436876513150',
    appId: '1:436876513150:web:8c9689e435752b5c7fad2f',
    measurementId: 'G-Z5PLNKJ62R'
})

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})