import Vue from 'vue'
import Router from 'vue-router'
// 引入模块
import asyncRoutes from './modules/asyncRoutes'
import constantRoutes from './modules/constantRoutes'
Vue.use(Router)


const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes,...asyncRoutes],
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
