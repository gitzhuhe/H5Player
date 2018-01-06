<template>
  <div>
    <Button icon="ios-skipforward" @click="playAll">全部播放</Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      playList:[
        {
          'url':'http://m128.xiami.net/14/2110246014/2102879744/1796917655_1508899016916.mp3?auth_key=1515812400-0-0-282558292bd697301bddca0f2ae2fd2e'
        },
        {
          'url':'http://m128.xiami.net/528/2099999528/2102738768/1795827886_1493217569848.mp3?auth_key=1515812400-0-0-0bf4f35761142a273194be726acd18b5'
        }
      ]
    }
  },
  mounted(){
    console.log(this.$store)
  },
  methods:{
    // TODO 拉取歌单
    get(){
      // this.playList = res;
    },
    playAll(){
      this.$store.commit('UpdatePlayList' ,this.playList)// = this.playList;
    }
  },
  watch:{
    msg(){

    },
    a(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
