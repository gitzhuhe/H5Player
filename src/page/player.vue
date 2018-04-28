<style scoped>
  #play{
    -webkit-user-select: none;
    z-index: 999;
    background-color: #f5f7f9;
    position: fixed;
    width: 100%;
    padding-left: 62px;
    padding-right: 24px;
    bottom: 0px;
    padding-top: 16px;
    padding-bottom: 0px;
    border-top: 1px solid #DFE1E3;
    height: 75px;
  }
.buttonGroup{
  width: 176px;
  float: left;
}
.buttonGroup  .btn{
  margin-right: 16px;
  font-size: 18px;
  line-height: 18px;
  padding-left: 2px;
}
 .buttonGroup .play{
   font-size: 28px !important;
   line-height: 48px !important;
   width: 48px !important;
   height: 48px !important;
 }
  /*.buttonGroup button i.ivu-icon-ios-play {*/
    /*padding-left: 4px;*/
  /*}*/
  .Slider{
    margin-left: 280px;
  margin-right: 255px;
  position: relative;
  /*top: 14px;*/
}
.Slider .h{
  height: 12px;
}
.thumb{
  margin-top: -16px;
  margin-left: 16px;
  float: left;
  width: 70px;
  cursor: pointer;
}
.thumb img{
  width: 100%;
}
.name{
  float: left;
}
  .time{
    text-align: right;
    float: right;
    width: 90px;
  }
  #Full{
    -webkit-user-select: none;
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    bottom: 75px;
    right: 0px;
    z-index: 997;
    background-color: rgba(0,0,0,1);
  }
  #Full #CoverBg{
    opacity: 1;
    width: 100%;
    /*-webkit-filter: blur(25px); !* Chrome, Opera *!*/
    /*-webkit-transform:scale(1.5,1.5);*/
    position: absolute;
    top:0;
    /*left: 0;*/
  }
  #Full img.bg{
    z-index: 40;
    -webkit-filter: blur(25px); /* Chrome, Opera */
    -webkit-transform:scale(1.5,1.5);
    position: absolute;
    top:0;
    width: 100%;
  }
  #CoverBg{
    z-index: 41;
  }
  #FullBefore{
    position: absolute;
    width: 100%;
    top:0px;
    bottom: 0px;
    z-index: 90;
  }
  #FullBefore_bg{
    position: absolute;
    width: 100%;
    top:0px;
    bottom: 0px;
    z-index: 50;
    background-color: rgba(0,0,0,0.3);
  }
  #FullBefore .cover{
    /*position: relative;*/
    /*display: inline-block;*/
    /*top: 150px;*/
    /*left: 150px;*/
     /*//border-radius: 50%;*/
    margin-right: 50px;
    width: 300px;
    padding: 12px;
    background: rgba(200,200,200,0.5);
  }
  #FullBefore .cover img{
    width: 100%;
    display: block;
  }
  #FullBefore .info{
    /*display: inline-block;*/
    /*position: relative;*/
    /*top: 300px;*/
    /*left: 600px;*/
    margin-left: 50px;
  }
  @keyframes CDturn{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }
  .FullInside{
    width: 80%;
    margin: 100px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info{
    color: #fff;
  }
  .info h1{
    line-height: 60px;
    font-size: 32px;

  }
  .info span{
    color: #1c2438;
    font-size: 18px;
    padding-right: 16px;
    text-shadow: 1px 1px 0px #666;
  }
  .info span em{
    color: #fff;
  }
.volume,.other{
  float: right;
}
  .other{
    width: 100px;
    height: 75px;
  }
  .other i{
    font-size: 32px;
    line-height: 46px;
    margin-right: 16px;
    cursor: pointer;
  }
  .volume{
    width: 120px;
    margin-top: 5px;
  }
  #menu{
    top:0px;
    position: absolute;
    right: 0px;
    height: 64px;
    z-index: 99;
    -webkit-app-region: no-drag;
  }
  #menu span{
    line-height: 64px;
    color: #e7e7e7;
    font-size: 18px;
    margin-right: 26px;
    cursor: pointer;
    -webkit-user-select: none;
  }
  #menu span:hover{
    color: #ffffff;
    -webkit-user-select: none;
  }
  #lrc{
    height: 200px;
    overflow: hidden;
    font-size: 16px;
    /*box-shadow: inset 0 -15px 30px #fff;*/
    position: relative;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 500px;
  }
  /*#lrc::before{*/
    /*content: '';*/
    /*position: absolute;*/
    /*top:0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 10px;*/
    /*!*box-shadow: 0 -15px 30px #fff;*!*/
  /*}*/
  #lyricContainer{
     margin-top: 100px;
  }
  #lyricContainer ul li{
    line-height: 32px;
    min-height: 32px;
  }
</style>
<template>
  <div>
  <div id="play">
    <div class="buttonGroup">
      <Button size="large" type="dashed" shape="circle" icon="ios-skipbackward" class="btn" @click="previous"></Button>

      <Button size="large" type="dashed" shape="circle" :icon="playing?'ios-pause':'ios-play'" class="btn play" @click="pauseAndPlay"></Button>
      <Button size="large" type="dashed" shape="circle" icon="ios-skipforward" class="btn" @click="next"></Button>
    </div>
    <div class="thumb" @click="showFull = !animated?(id>0?!showFull:false):showFull">
      <img :src="thumbUrl">
    </div>


    <div class="volume">
      <Icon type="android-volume-up" style="float: left;font-size: 18px;margin-top: 10px;"></Icon>
      <Slider v-model="volume" style="margin-left: 22px;" @on-change="volumeGo"></Slider>
    </div>
    <div class="other">
      <template v-if="model == 'one'"><i class="icon iconfont icon-icon-19" @click="model = 'rand'"></i></template>
      <template v-if="model == 'rand'"><i class="icon iconfont icon-icon-22"  @click="model = 'loop'"></i></template>
      <template v-if="model == 'loop'"><i class="icon iconfont icon-icon-20" @click="model = 'one'"></i></template>
      <i class="icon iconfont icon-icon-29"></i>
    </div>

    <div class="Slider">
      <div class="h">
        <div class="name">
          {{MusicDAta.name}}
        </div>
        <div class="time">
          {{currentTime}}/{{duration}}
        </div>
      </div>
      <Slider v-model="load" :max="100" @on-change="go" :step="0.1" :show-input="false" :tip-format="tip" :show-stops="true"></Slider>
    </div>

    <audio :src="url" autoplay="true" id="player" style="display: none"></audio>

  </div>
    <!--
    name="animated"
    v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave"
    -->

  <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" >
    <div id="Full" v-show="showFull && id > 0">
      <canvas id="canvas"></canvas>
      <img :src="thumbUrl" class="bg" id="CoverBg" v-if="!StackBlur">
      <div id="FullBefore_bg" ></div>
      <div id="FullBefore" >
        <div class="FullInside">
          <div class="cover">
            <img :src="thumbUrl" id="CoverImg"></div>
          <div class="info">
            <h1>{{MusicDAta.name}}</h1>
            <div>
              <span>歌手：<em v-for="(item,index ) in MusicDAta.ar" :key="item.id"><template v-if="index"> / </template>{{item.name}}</em></span>
              <span>专辑：<em>{{MusicDAta.al.name}}</em></span>
            </div>
            <div id="lrc" style="height: 200px;overflow: hidden">
              <div id="lyricContainer">
                <ul>
                  <li v-for="(item,index) in parseLyric" :key="index" :id="'line-'+index">
                    {{item[1]}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="menu">
        <span @click="hide">
              <Icon type="ios-minus-empty"></Icon>
            </span>
        <span @click="showFull = false"><Icon type="ios-arrow-down"></Icon></span>
        <span @click="quite">
              <Icon type="ios-close-empty"></Icon>
            </span>
      </div>
    </div>
  </transition>
  </div>
</template>
<script>
  import lib from '../lib/ajax'
  import DefaultThumb from '../assets/timg.jpg'
  import '../assets/icon/player/iconfont.css'
  import '../lib/velocity.min'
  import axios from 'axios';

  let StackBlur = require("stackblur-canvas");
  export default {
    name: "player",
    data(){
      return {
        model:'loop',
        volume:90,
        cover:{
          // animation: '30s linear infinite CDturn'
        },
        showFull:false,
        playing:false,
        id:0,
        Num:0,
        load:0,
        vid:null,
        url:'',
        currentTime:0,
        duration:0,
        MusicDAta:{
          name:'停止',
          al:{
            picUrl:DefaultThumb
          },
          ar:{}
        }
        ,
        thumbUrl:DefaultThumb,
        StackBlur:true,
        animated:false,
        Lyric:'',
        LyricHeight:0
      }
    },
    mounted(){
      const _this = this;
      this.$nextTick(()=>{
        this.getMp3()
        // 获取 id="myVideo"的 <video> 元素
        _this.vid = document.getElementById("player");
        _this.vid.volume  = _this.volume/100;
        _this.vid.onerror = function () {
          setTimeout(()=>{
            _this.autoNext();
          },2000)
        };
        //为 <video> 元素添加 ontimeupdate 事件，如果当前播放位置改变则执行函数
        _this.vid.ontimeupdate = function() {
          _this.load = Math.round(_this.vid.currentTime/_this.vid.duration*10000)/100;
          _this.currentTime = lib.formatSeconds(_this.vid.currentTime)
          _this.duration = lib.formatSeconds(_this.vid.duration)
          if(_this.vid.ended){
              _this.autoNext();
          }
          let line = 0;
          let lrc = document.getElementById('lrc')
          let lastI = 0;
          let lyricContainer = document.getElementById('lyricContainer')
          for (var i = 0, l = _this.parseLyric.length; i < l; i++) {
            if (_this.vid.currentTime > _this.parseLyric[i][0] - 0.50 /*preload the lyric by 0.50s*/) {
              if(document.getElementById('line-'+i)) line += document.getElementById('line-'+i).offsetHeight;
              lastI = i;
            }
          }
          if(85 - line != _this.LyricHeight){
            if(document.getElementById('line-'+(lastI-1)) ){
              Velocity(document.getElementById('line-'+(lastI-1)), { fontSize:16,color:'#fff' }, { duration: 0})
              //Velocity(document.getElementById('line-'+(lastI-1)), { fontSize:16 }, { duration: 0})
            }
            let NowLine = document.getElementById('line-'+lastI)
            //NowLine.style.fontColor = '#57a3f3';
            if(NowLine) Velocity(NowLine, { fontSize:17, color:'#00da7f' }, { duration: 300})
            //NowLine.style.c
            _this.LyricHeight = 95 - line;
            //lyricContainer.style.marginTop = (85 - line)+'px';
            Velocity(lyricContainer, { marginTop:_this.LyricHeight }, { duration: 300})
          }
        };
        // 控制播放按钮
        _this.vid.onplaying = function () {
          console.log('开始播放')
          for (var i = 0, l = _this.parseLyric.length; i < l; i++) {
            document.getElementById('line-'+i).style.fontSize = 16+'px';
            document.getElementById('line-'+i).style.color = '#fff';
          }
          _this.playing = true
        }
        _this.vid.onpause = function () {
          console.log('开始播放')
          _this.playing = false
        }
      })
    },
    computed: {
      palyList(){
        const _this = this;
        let palyList = this.$store.state.palyList;
        return palyList;
      },
      count(){
        const _this = this;
        return _this.palyList.length;
      },
      thumb() {
        const _this = this;
        let url = _this.palyList[_this.Num].url;
        return url;
      },
      lrc() {
        return ''
      },
      playIndex(){
          return this.$store.state.playindex;
      },
      parseLyric(){
        const _this = this;
        if(!_this.Lyric) return [[0.0,''],[1.0, '纯音乐，请欣赏']];
        if(_this.Lyric.length <= 0 ) return [[0.0,''],[1.0, '纯音乐，请欣赏']];
        var lines = _this.Lyric.split('\n'),
          //this regex mathes the time [00.12.78]
          pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g,
          result = [];

        for(var i in lines){
          let v = lines[i];
          var time = v.match(pattern),
          value = v.replace(pattern, '');
          if(!time) continue;
          time.forEach(function(v1, i1, a1) {
            var t = v1.slice(1, -1).split(':');
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]) + parseInt(0) / 1000,  value]);
          });
        };
        //sort the result by time
        result.sort(function(a, b) {
          return a[0] - b[0];
        });
        // console.log(result)
        if(result.length <= 0 ) return [[0.0,''],[1.0, '暂无歌词，请欣赏']];
        return result;
      }
    },
    watch:{
      palyList(){
        const _this = this
        _this.Num = 0;
        this.getMp3()
      },
      Num(){
        this.getMp3()
      },
      playIndex(val){
          this.Num = val;
      },
      url(){
        this.vid = document.getElementById("player");
      },
      volume(value){
        this.vid.volume  = value/100;
      },
      thumbUrl(){
        const _this = this
        this.$nextTick(()=>{
            setTimeout(()=>{
              let canvas = document.getElementById('canvas');
                try{
                  StackBlur.image('CoverImg','canvas',180,false);
                  console.log('毛玻璃效果完成')
                  _this.StackBlur = true;
                  h = document.body.clientWidth
                  canvas.style.width = '100%';
                  canvas.style.height = h;
                }catch (e){
                  console.log('因为跨域问题，毛玻璃效果处理失败')
                  _this.StackBlur = false;
                  canvas.style.display = 'none';
                }
            },10)

        })
      }
    },
    methods:{
      getMp3(){
        const _this = this;
        if(_this.count == 0)return ;
        _this.MusicDAta.name = 'Loading...'
        let playlist = _this.palyList[_this.Num];
        let url = playlist.url || playlist.id;
        if(typeof url == 'number'){
          _this.id = url;
          _this.$store.commit('playing',_this.id);
          _this.getDetail();
          _this.getlyric();
          lib.ajax.get('/music/url?id='+url).then((res)=>{
            if(res.data[0].url){
              this.url =  res.data[0].url;
            }else{
              _this.autoNext();
            }
          })
        }else{
          this.url = url;
        }
      },
      getDetail(){
        const _this = this;
        var CancelToken = axios.CancelToken;
        try{
          _this.source.cancel('cancel')
        }catch (e){
            // console.log(e)
        }
        _this.source = CancelToken.source();
        // console.log(_this.source);
        lib.ajax.get('/song/detail?ids='+_this.id,{
          cancelToken:_this.source.token
        }).then((res)=>{
          _this.MusicDAta = res.songs[0];
          _this.loadThumb(_this.MusicDAta.al.picUrl)
          //this.url =  res.data[0].url;
        })
      },
      getlyric(){
        const _this = this;
        _this.Lyric = '';
        lib.ajax.get('/lyric?id='+_this.id).then((res)=>{
          if(res.lrc) _this.Lyric = res.lrc.lyric;
          else this.Lyric = []
        })
      },
      loadThumb(url){
        const _this = this;
        let img = new Image();
//        img.crossOrigin = 'anonymous';
        img.onload = function(){
          _this.thumbUrl = url;
        };
        img.src = url;
      },
      pauseAndPlay(){
          if(this.playing){
            this.vid.pause();
          }else{
            this.vid.play();
          }
      },
      autoNext(){
        const _this = this;
        switch(_this.model){
          case 'one':
            _this.vid.currentTime = 0
            this.vid.play();
            break;
          default:
            _this.next();
        }
      },
      previous(){
        const _this = this;
        switch(_this.model){
          case 'rand':
            _this.Num = parseInt(Math.random()*(_this.count+1),10);
            break;
          case 'one':
          case 'loop':
          default:
            if(_this.Num - 1 <= 0) {
              _this.Num = _this.count-1;
            }else _this.Num--;
            break;
        }

      },
      next(){
        const _this = this;
        switch(_this.model){
          case 'rand':
            _this.Num = parseInt(Math.random()*(_this.count+1),10);
            break;
          case 'one':
          case 'loop':
          default:
            if(_this.Num + 1 >= _this.count) {
              _this.Num = 0;
            }else _this.Num++;
            break;
        }
      },
      go(value){
        const _this = this
        _this.vid.currentTime = value*_this.vid.duration/100
        this.vid.play();
      },
      volumeGo(value){
        const _this = this
        this.vid.volume  = value/100;
      },
      tip(){
          return null;
      },
      quite(){
        //ipc.send('quite');
        appQuite();
      },
      hide(){
        //ipc.send('quite');
        appHide();
      },

      // --------
      // 进入中
      // --------
      beforeEnter: function (el, done) {
//        let h = document.body.clientHeight
        this.animated  = true;
        Velocity(el, { translateY:['100%'],translateZ:0,translateX:0 }, { duration: 0})
      },
      enter: function (el, done) {
          const _this = this;
          Velocity(
            el,
            { translateY:0, translateZ:0,translateX:0},
            {
              easing:'spring',duration: 1000 ,complete: function(){
              _this.animated  = false;
              done();
            }}
          )
      },
      leave: function (el, done) {
        const _this = this;
        this.animated  = true;
        Velocity(el, { translateY:'100%',translateZ:0 ,translateX:0}, { easing:'easeOutSine',duration:500,complete:  function(){
          _this.animated  = false;
          done();
        } })
      },
    }
  }
</script>


