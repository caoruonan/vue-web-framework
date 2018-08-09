import Vue from 'vue'
import iView from 'iview'
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

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  store: store,
  render: h => h(App),
  mounted () {
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
  }
})
