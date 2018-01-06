import Vue from 'vue'
import Router from 'vue-router'
import Main from '../page/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wangyiyun',
      component: Main
    }
  ]
})
