import Content from '@/views/Content.vue'
import ParentView from '@/components/parent-view'

/**
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  showInBread: (-) 设为true后强制在面包屑上展示该页面选项，用于hideInMenu:true时备用选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const dynamicRouter = [
  {
    path: '/',
    redirect: '/home',
    component: Content,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
          title: {i18n: 'home'}
        },
        component: resolve => { require(['@/views/home/home.vue'], resolve) }
      }
    ]
  },
  {
    path: '/table',
    name: 'table',
    meta: {
      icon: 'fas fa-table',
      title: '多功能表格'
    },
    redirect: { name: 'testTable' },
    component: Content,
    children: [{
      path: 'testTable',
      name: 'testTable',
      meta: {
        hide: true,
        title: '多功能表格'
      },
      component: resolve => { require(['@/views/example/testTable/list.vue'], resolve) }
    }]
  },
  {
    path: '/example',
    name: 'example',
    meta: {
      icon: 'fas fa-table'
    },
    redirect: { name: 'demo1List' },
    component: Content,
    children: [{
      path: 'demo1',
      name: 'demo1',
      meta: {
        hide: true
      },
      component: ParentView,
      redirect: { name: 'demo1List' },
      children: [
        {
          path: 'list',
          name: 'demo1List',
          meta: {
            hideInMenu: true,
            showInBread: true,
            title: '列表'
          },
          component: resolve => { require(['@/views/example/demo1/list.vue'], resolve) }
        },
        {
          path: 'create',
          name: 'demo1Create',
          meta: {
            hideInMenu: true,
            showInBread: true,
            title: '新建'
          },
          component: resolve => { require(['@/views/example/demo1/create.vue'], resolve) }
        },
        {
          path: 'edit/:id',
          name: 'demo1Edit',
          meta: {
            hideInMenu: true,
            showInBread: true,
            title: '编辑'
          },
          component: resolve => { require(['@/views/example/demo1/create.vue'], resolve) }
        },
        {
          path: 'view/:id',
          name: 'demo1View',
          meta: {
            hideInMenu: true,
            showInBread: true,
            title: '查看'
          },
          component: resolve => { require(['@/views/example/demo1/view.vue'], resolve) }
        }
      ]
    }
    ]
  }
]
