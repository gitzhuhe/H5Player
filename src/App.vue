<style scoped>
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 80px;
  }
  .layout-logo{
    width: 160px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: -30px;
    color: #fff;
    line-height: 30px;
    text-align: center;
  }
  .layout-nav{
    /*width: 420px;*/
    margin: 0 auto;
    margin-right: -50px;
    float: right;
  }
  .ivu-layout-header{
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 98;
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }
  .ivu-layout-sider{
    position: fixed;
    top:64px;
  }
  .app-right{
    margin-top: 64px;
    margin-left: 200px;
    overflow: auto;
    height: 100%;
  }
  .layout-footer-center{
    text-align: center;
  }
  .btn{
    float: left;
  }
  #rightBtn span{
    color: #e7e7e7;
    font-size: 18px;
    margin-right: 26px;
    cursor: pointer;
    -webkit-user-select: none;
  }
  #rightBtn span:hover{
    color: #ffffff;
    -webkit-user-select: none;
  }
</style>
<template>
  <div>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">十五阿达云音乐</div>
          <div class="btn">
            <ButtonGroup >
              <Button type="info" icon="chevron-left" @click="back" style="-webkit-app-region: no-drag;"></Button>
              <Button type="info" icon="chevron-right" @click="go" style="-webkit-app-region: no-drag;"></Button>
            </ButtonGroup>
          </div>
          <div class="layout-nav" style="-webkit-app-region: no-drag;" id="rightBtn">
            <span @click="hide">
<Icon type="ios-minus-empty"></Icon>            </span>
            <span @click="quite">
              <Icon type="ios-close-empty"></Icon>
            </span>
          </div>
        </Menu>
      </Header>
      <Layout :style="{background: '#fff'}">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="Wangyiyun" theme="light" width="auto"  @on-select="onSelect">
             <MenuItem name="Wangyiyun">推荐歌单</MenuItem>
            <MenuItem name="topPlaylist">网友精选</MenuItem>
            <MenuItem name="highquality">精品歌单</MenuItem>
          </Menu>
        </Sider>
        <Layout class="app-right" id="appRight" :style="{height:divHeight}">
          <Content>
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
    <player/>
  </div>
</template>

<script>
  import player from './page/player'
  export default {
    name: 'HelloWorld',
    components:{
      player
    },
    data () {
      return {
        divHeight:'10px',
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      onSelect(name){
          this.$router.push({
            name:name
          })
      },
      back(){
          window.history.back()
      },
      go(){
        window.history.go(1)
      },
      quite(){
        //ipc.send('quite');
        appQuite();
      },
      hide(){
        //ipc.send('quite');
        appHide();
      }
    },
    mounted(){
      const _this = this;
      this.$nextTick(()=>{
          //let div = document.getElementById('appRight');
          //div.style.height = window.clientHeight;
        setTimeout(()=>{
          //window.height;
          _this.divHeight = (document.documentElement.clientHeight-75-64) +'px';
          console.log(_this.divHeight)
        },500)

      })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

