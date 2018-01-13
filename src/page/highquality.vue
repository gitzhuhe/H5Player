<template>
  <div>
    <div style="margin-left:auto;margin-right:auto;  max-width: 1080px;min-width: 800px">
      <!--走马灯-->
      <!--<Carousel loop>-->
        <!--<CarouselItem v-for="item in banners" :key="item.targetId">-->
          <!--<div class="demo-carousel" ><img :src="item.pic" style="width: 100%"/></div>-->
        <!--</CarouselItem>-->
      <!--</Carousel>-->
    <!-- 推荐歌单-->
    <div style="display: flex;align-items: flex-end;flex-wrap: wrap;">
      <div style="width: 20%;box-sizing: border-box;border: 16px solid #fff;cursor: pointer" v-for="item in playLists" :key="item.id" @click="goDetail(item.id)">
        <div><img :src="item.coverImgUrl" style="max-width: 100%" /></div>
        <div style="min-height: 40px;">{{item.name}}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import lib from '../lib/ajax'
export default {
  name: 'HelloWorld',
  data () {
    return {
      banners:[],
      playLists:[],
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
    //console.log(this.$store)
    //this.getBanner();
    this.get();
  },
  methods:{
      //拉取Banner
    getBanner(){
      const _this = this;
      lib.ajax.get('/banner').then((res)=>{
        console.log(res)
        _this.banners = res.banners;
      })
    },
    // TODO 拉取推荐歌单
    get(){
      // this.playList = res;
      const _this = this;
      lib.ajax.get('/top/playlist/highquality').then((res)=>{
          console.log(res)
          _this.playLists = res.playlists;
      })
    },
    goDetail(id){
        console.log(this.$router)
        this.$router.push({
          path:'/playlist/detail/'+id
        })
    }
  },
  watch:{
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
