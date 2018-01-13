<style scoped>
  .header{
    margin: 32px;
    height: 246px;
  }
  .coverImg{
    width: 200px;
    height:200px;
    float: left;
  }
  .coverImg img{
    width: 100%;
  }
.detail{
  margin-left: 224px;
}
  .name{
    font-size: 36px;
    font-weight: 600;
  }
  .description{
    max-height: 100px;
    overflow: hidden;
    margin-top: 15px;
  }
.col-2{
    float: left;
    width: 30%;
  }
 .col-3{
    float: left;
    width: 30%;
  }
.col-4{
    float: left;
    width: 30%;
  }
.col-5{

  }
  .flexSongList{
    -webkit-user-select: none;
    display: flex;
    align-items: center;
  }
  .flexSongLists{
    background-color: #eee;
    border-bottom: 1px solid #dedede;
  }
  .flexSongList:hover{
    background-color: #eee;
  }
  .flexSongLists:hover{
    background-color: #eee;
  }
  .flexSongList div{
    width: 30%;
    text-align: left;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
  }
  .flexSongList div:nth-child(2){
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flexSongList div:nth-child(3), .flexSongList div:nth-child(4){
    /*display: -webkit-box;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 1;*/
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .flexSongList div:first-child, .flexSongList div:last-child{
    width: 70px;
    text-align: center;
  }
  .flex-icon{
    width: 80px !important;
    display: flex;
    justify-content: space-around;
    border-bottom: 0 !important;
    opacity: 0;
    padding: 0 !important;
  }
  .flexSongList:hover .flex-icon{
    opacity: 1;
  }
  .icon{
   font-size: 24px;
    cursor: pointer;
    line-height: 0;
  }
</style>
<template>
    <div style="position: relative;min-height: 400px;">
      <div class="header">
        <div class="coverImg">
          <img :src="data.coverImgUrl"/>
        </div>
        <div class="detail">
          <div class="name">{{data.name}}</div>
          <Button icon="ios-play" @click="playAll">全部播放</Button>
          <div class="description" v-html="formatData(data.description)" style="">
          </div>

        </div>
      </div>
      <div id="list">
        <div class="flexSongList flexSongLists">
          <div></div>
          <div>歌曲</div>
          <div>歌手</div>
          <div>专辑</div>
          <div>时长</div>
        </div>
        <div class="flexSongList" v-for="(item, index) in tracks" :key="index" v-on:dblclick="playOne(item,index)">
          <div>{{index+1}}</div>
          <div>
            <p>
              <Icon v-if="playingid == item.id" type="volume-high" :style="{marginRight:'8px'}"></Icon>
              {{item.name}}
            </p>
            <div class="flex-icon">
              <Icon type="ios-play-outline" class="icon" v-on:click.native="playOne(item,index)"></Icon>
              <Icon type="ios-heart-outline" v-if="0"></Icon>
              <Icon type="ios-cloud-outline" v-if="0"></Icon>
            </div>
          </div>
          <div>{{string2array(item)}}</div>
          <div>{{item.al.name}}</div>
          <div>{{formatSeconds(item.dt/1000)}}</div>
        </div>
      </div>
      <!--<Table :columns="columns" :data="tracks" size="small" ref="table" @on-row-dblclick="playOne"></Table>-->
      <Spin fix v-if="loading">
        <div class="loader">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
          </svg>
        </div>
      </Spin>
    </div>
</template>
<script>
  import lib from '../lib/ajax'
  export default {
        components: {},
        data() {
            return {
              loading:true,
                data:{},
                id:0,
              playList:[],
              columns:[
                {
                  type:'index',
                  width:60
                },
                {
                  title:'歌名',
                  //<Icon type="ios-volume-high"></Icon>
                  render:(h, params)=>{
                      let arr = []
                     if(this.playingid >0){
                       if(this.playingid == params.row.id){
                           arr.push(
                               h('Icon',{
                                 props:{
                                   type:'volume-high'
                                 },
                                 style:{
                                   marginRight:'8px'
                                 }
                           })
                           );
                       }
                     }
                    arr.push(
                        h('span',params.row.name)
                    );
                     return h('div',arr)
                  }
                },
                {
                  title:'歌手',
                  render:(h, params)=>{
                      let ges = '';
                    for (var i in params.row.ar){
                      ges += (ges?' / ':'') + params.row.ar[i].name;
                    }
                    return h('span',ges)
                  }
                },
                {
                  title:'专辑',
                  render:(h, params)=>{
                      return h('span',params.row.al.name)
                  }
                },
                {
                  title:'时长',
                  width:100,
                  //lib.formatSeconds
                  render:(h, params)=>{
                    return h('span',lib.formatSeconds(params.row.dt/1000))
                  }
                }
              ],
              tracks:[]
            };
        },
        computed: {
            playingid(){
                return this.$store.state.playingId;
            }
        },
        methods: {
          get(){
            // this.playList = res;
            const _this = this;
            _this.loading = true;
            lib.ajax.get('/playlist/detail?id='+_this.id).then((res)=>{
              _this.loading = false;
              _this.data = res.playlist;
              _this.playList = res.playlist.trackIds;
              if(res.playlist.tracks.length > 99){
                _this.tracks = res.playlist.tracks;
              }else{
                _this.tracks = res.playlist.tracks;
              }
            })
          },
          playAll(){
            this.$store.commit('UpdatePlayList' ,this.playList)// = this.playList;
            this.$store.commit('playIndex' , 0)
          },
          playOne(data, index){
            this.playAll();
            this.$store.commit('playIndex' , index)
          },
          formatData(data){
              if(typeof data == 'undefined') return '';
              data = data.replace(/\n/g,'<br />');
              return data;
          },
          string2array(data){
            let ges = '';
            for (var i in data.ar){
              ges += (ges?' / ':'') + data.ar[i].name;
            }
            return ges
          },
          formatSeconds(data){
              return lib.formatSeconds(data);
          }
        },
        watch: {},
        mounted () {
          console.log('歌单详情')
          this.id = this.$route.params.id || 0;
          this.get();
        },
        created() {

        }
    };
</script>
