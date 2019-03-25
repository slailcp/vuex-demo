import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'
import login from '@/components/login'

import index from '@/components/index'
import list from '@/components/list'
import detail from '@/components/detail'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },

    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {requireAuth: true}
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {requireAuth: true}
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {requireAuth: true}
    }

  ]
})


router.beforeEach((to, from, next) => {

  console.log(store.getters.getUserInfo)
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {  // store获取当前的token是否存在
      next();
    }
    else {
      alert('请重新登陆');
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
    next();
  }
})

export default router
