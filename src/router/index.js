import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '用户管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: 'news',
        name: 'AddressList2',
        component: () => import('@/pages/address/news'),
        meta: { title: '动态管理', icon: 'table' }
      }
    ]
  },

  // {
  //   path: '/customer',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'CustomerList',
  //       component: () => import('@/pages/customer/list'),
  //       meta: { title: '游学项目', icon: 'chat' }
  //     }
  //   ]
  // },
  {
    path: '/address',
    component: Layout,
    meta: { title: '菜单管理', icon: 'tree' },
    children: [
      // {
      //   path: 'list',
      //   name: 'AddressList',
      //   component: () => import('@/pages/address/list'),
      //   meta: { title: '上传图片', icon: 'tree' }
      // },
      {
        path: 'list',
        name: 'CustomerList',
        component: () => import('@/pages/customer/list'),
        meta: { title: '游学课程', icon: 'chat' }
      },
      {
        path: 'list2',
        name: 'AddressList2',
        component: () => import('@/pages/address/list2'),
        meta: { title: '学员推荐', icon: 'chat' }
      },
      // {
      //   path: 'list2',
      //   name: 'AddressList2',
      //   component: () => import('@/pages/address/list2'),
      //   meta: { title: '精彩瞬间', icon: 'chat' }
      // }
    ]
  },
  {
    path: '/three2',
    component: Layout,
    children: [
      {
        path: 'listj',
        name: 'AddressList2',
        component: () => import('@/pages/address/listj'),
        meta: { title: '添加课程', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/two',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list2',
  //       name: 'AddressList2',
  //       component: () => import('@/pages/address/list2'),
  //       meta: { title: '菜单管理', icon: 'table' }
  //     }
  //   ]
  // },
  {
    path: '/one',
    component: Layout,
    children: [
      {
        path: 'list3',
        name: 'AddressList2',
        component: () => import('@/pages/address/list3'),
        meta: { title: '风采项目', icon: 'table' }
      }
    ]
  },
  {
    path: '/cjwt',
    component: Layout,
    children: [
      {
        path: 'list2',
        name: 'AddressList2',
        component: () => import('@/pages/address/list4'),
        meta: { title: '常见问题', icon: 'table' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'CommentList',
        component: () => import('@/pages/comment/list'),
        meta: { title: '轮播图管理', icon: 'table' }
      }
    ]
  },


  {
    path: '/xitongguanl',
    component: Layout,
    meta: { title: '专辑管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'CategorysList',
        component: () => import('@/pages/category/list'),
        meta: { title: '推荐展示', icon: 'nested' }
      },
     
      

    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
