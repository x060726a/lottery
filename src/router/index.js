import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/page/Login'
import Reg from '@/page/Reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg 
    },
    {
      path: '/index',
      name: 'Index',
      component: Index 
    }
  ]
})
