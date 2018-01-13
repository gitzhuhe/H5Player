// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/common.css';
import Vuex from 'vuex'
//const {ipcRenderer} = require('electron');
//const {ipcRenderer} = require('electron')
//import {BrowserWindow} from 'electron'
//const {BrowserWindow} = require('electron').remote
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(iView);

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
  const ipcRenderer = require('electron').ipcRenderer
  window.appQuite = function(){
    ipcRenderer.send('quite');
  }
  window.appHide = function(){
    ipcRenderer.send('hide');
  }
}else{
  window.appQuite = function(){
    console.log('播放器即将关闭')
    window.close()
  }
  window.appHide = function(){
    console.log('播放器最小化')
  }
}

const store = new Vuex.Store({
  state: {
    playindex:0,
    playingId:0,
    mp3Url:'',
    count: 0,
    palyList:[
    ]
  },
  mutations: {
    UpdatePlayList (state, playList) {
      state.palyList = playList
    },
    playing(state, id){
      state.playingId = id;
    },
    playIndex(state, index){
      state.playindex = index
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
