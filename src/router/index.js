import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/pages/Signin'
import Dash from '@/pages/Dash'
import Edit from '@/pages/Edit'
import ForgetPassword from '@/pages/ForgetPassword'
import NewPassword from '@/pages/NewPassword'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/dashboard',
      name: 'Dash',
      component: Dash,
      props: true
    },
    {
      path: '/edit/',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/newPassword/:token',
      name: 'newPassword',
      component: NewPassword
    },
    {
      path: '/forgetPassword/',
      name: 'forgetPassword',
      component: ForgetPassword
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if ('USER DOES NOT EXIST IN LOCAL STORAGE') {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
