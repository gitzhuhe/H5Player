// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(iView);


const store = new Vuex.Store({
  state: {
    mp3Url:'',
    count: 0,
    palyList:[
      {
        url:'http://m128.xiami.net/111/2110220111/2102879989/1796918788_1508920462434.mp3?auth_key=1515812400-0-0-1c9002ecb038d24c08a9f51dd7839a4a',
        thumb:''
      },
      {
        url:'http://m128.xiami.net/962/2099983962/2102788656/1796197137_1500003076166.mp3?auth_key=1515812400-0-0-1d54c2368032f0bc0961313a5d7d7b20\n'
      }
    ]
  },
  mutations: {
    UpdatePlayList (state, playList) {
      state.palyList = playList
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
