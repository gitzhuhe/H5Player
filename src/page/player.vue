<template>
  <div>
    <h1>十五播放器</h1>
    <Progress :percent="load" hide-info></Progress>
    <Slider v-model="load" :max="100" @on-change="go"></Slider>
    <audio :src="url" autoplay="true" id="player"></audio>
    <Button icon="ios-skipforward" @click="next" >下一曲</Button>
    {{thumb}}
  </div>
</template>
<script>
  export default {
    name: "player",
    data(){
      return {
        Num:0,
        load:0,
        vid:null
      }
    },
    mounted(){
      const _this = this;
      this.$nextTick(()=>{
        // 获取 id="myVideo"的 <video> 元素
        _this.vid = document.getElementById("player");
        //为 <video> 元素添加 ontimeupdate 事件，如果当前播放位置改变则执行函数
        _this.vid.ontimeupdate = function() {
          _this.load = _this.vid.currentTime/_this.vid.duration*100;
        };
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
      url() {
        const _this = this;
        let url = _this.palyList[_this.Num].url;
        return url;
      },
      thumb() {
        console.log('```````````````')
        const _this = this;
        let url = _this.palyList[_this.Num].url;
        return url;
      },
      lrc() {
        return ''
      }
    },
    watch:{
      palyList(){
        const _this = this
        _this.Num = 0;
      }
    },
    methods:{
      next(){
        const _this = this;
        if(_this.Num + 1 == _this.count) {
          // TODO 根据播放模式改变
          _this.Num = 0;
        }else _this.Num++;
      },
      go(value){
        const _this = this
        _this.vid.currentTime = value
      }
    }
  }
</script>

<style scoped>

</style>
