import Vue from 'vue'
import Router from 'vue-router'
import Main from '../page/Main'
import topPlaylist from '../page/topPlaylist.vue'
import playlist_detail from '../page/detail.vue'
import highquality from '../page/highquality.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wangyiyun',
      component: Main
    },
    {
      path: '/topPlaylist',
      name: 'topPlaylist',
      component: topPlaylist
    },
    {
      path: '/highquality',
      name: 'highquality',
      component: highquality
    },
    {
      path: '/playlist/detail/:id',
      name: 'playlist_detail',
      component: playlist_detail
    }
  ]
})
