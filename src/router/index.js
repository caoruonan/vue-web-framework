import Vue from 'vue'
import iView from 'iview'
import { getToken, title, toDefaultPage, getRouterObjByName } from '@/libs/util'
import VueRouter from 'vue-router'
import { routers } from './router'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers
}
const LOGIN_PAGE_NAME = 'login'

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到home页
    })
  } else {
    const curRouterObj = getRouterObjByName([...routers], to.name)
    if (curRouterObj && curRouterObj.title) {
      title(curRouterObj.title, router.app)
    }
    if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
      if (curRouterObj.access === parseInt(Cookies.get('access'))) {
        toDefaultPage([...routers], to.name, router, next) // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
      } else {
        next({
          replace: true,
          name: 'error-403'
        })
      }
    } else { // 没有配置权限的路由, 直接通过
      toDefaultPage([...routers], to.name, router, next)
    }
  }
})

router.afterEach((to) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
