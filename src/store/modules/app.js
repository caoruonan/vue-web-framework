import { appRouter } from '@/router/router'
import { setTagNavListInLocalstorage, getTagNavListFromLocalstorage, getHomeRoute, getMenuByRouter, getBreadCrumbList, showThisRoute } from '@/libs/util'
import Vue from 'vue'
import Cookies from 'js-cookie'

const app = {
  state: {
    themeName: 'skin-custom', // 主题
    lang: localStorage.getItem('lang'),
    sidebarStatus: !localStorage.getItem('sidebar-status') ? 'expand' : localStorage.getItem('sidebar-status'),
    tagNavList: [], // contentHeader
    breadCrumbList: [],
    homeRoute: getHomeRoute(appRouter),
    cachePage: [],
    dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(appRouter, Cookies.get('access'))
  },
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched)
    },
    updateMenulist (state) {
      let accessCode = parseInt(Cookies.get('access'))
      let menuList = []
      appRouter.forEach((item, index) => {
        if (item.access !== undefined) {
          if (showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) {
              menuList.push(item)
            } else {
              let len = menuList.push(item)
              let childrenArr = []
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (child.access === accessCode) {
                    return child
                  }
                } else {
                  return child
                }
              })
              menuList[len - 1].children = childrenArr
            }
          }
        } else {
          if (item.children.length === 1) {
            menuList.push(item)
          } else {
            let len = menuList.push(item)
            let childrenArr = []
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (showThisRoute(child.access, accessCode)) {
                  return child
                }
              } else {
                return child
              }
            })
            if (childrenArr === undefined || childrenArr.length === 0) {
              menuList.splice(len - 1, 1)
            } else {
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
              handledItem.children = childrenArr
              menuList.splice(len - 1, 1, handledItem)
            }
          }
        }
      })
      state.menuList = menuList
    },

    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag (state, item, type = 'unshift') {
      if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
        if (type === 'push') state.tagNavList.push(item)
        else state.tagNavList.unshift(item)
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    changeTheme (state, theme) {
      state.themeName = theme
    },
    recordSidebarStatus (state, sidebarStatus) {
      state.sidebarStatus = sidebarStatus
      localStorage.setItem('sidebar-status', sidebarStatus)
    },
    switchLang (state, lang) {
      state.lang = lang
      Vue.config.lang = lang
    },
    closePage (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    },
    initCachepage (state) {
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage)
      }
    }
  }
}

export default app
