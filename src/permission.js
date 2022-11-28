import router from './router'
import store from './store'
const whileEach = ['/login', '/404']
router.beforeEach((to, from, next) => {
  next()
  const token = store.state.user.token
  // if (token) {
  //   if (to.path === '/login') {
  //     next('/')
  //   } else {
  //     next()
  //   }
  // } else {
  //   const isOK = whileEach.includes(to.path)
  //   if (isOK) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
})
