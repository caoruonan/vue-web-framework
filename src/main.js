import Vue from 'vue'
import iView from 'iview'
import VueI18n from 'vue-i18n'
import { router } from './router/index'
import store from './store'
import i18n from './locale'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/plugins/admin-lte/dist/css/AdminLTE.min.css'
import './assets/plugins/admin-lte/dist/css/skins/_all-skins.min.css'
import 'iview/dist/styles/iview.css'

import App from './App.vue'

import 'bootstrap/dist/js/bootstrap.min'
import './assets/plugins/admin-lte/dist/js/adminlte'
import 'jquery-slimscroll/jquery.slimscroll.min'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted () {
    this.currentPageName = this.$route.name
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
  }
})
