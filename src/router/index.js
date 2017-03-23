import Vue from 'vue'
import Router from 'vue-router'



import Index from './../pages/index'
import Details from './../pages/topic/details'
import My from './../pages/my'
import Message from './../pages/message'
import Publish from './../pages/topic/publish'
import Logo from './../pages/login'
import UserInfo from './../pages/my/UserInfo'
import MyTheme from './../pages/my/MyTheme'
import About from './../pages/my/About'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/', component: Index
    },
    {
      path: '/details/:id',component:Details
    },
    {
      path: '/my',component:My
    },
    {
      path: '/home',component:Index
    },
    {
      path: '/msg',component:Message
    },
    {
      path: '/publish',component:Publish
    },
    {
      path: '/logo',component:Logo
    },
    {
      path:'/userInfo/:userName',component:UserInfo
    },
    {
      path:'/myTheme',component:MyTheme
    },
    {
      path:'/about',component:About
    }
  ]
})


