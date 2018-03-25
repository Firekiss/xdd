<template>
  <div id="entry">
    <div @touch="preDefalut($event)" id="wholeCover" @touchmove.prevent></div>
    <div :class="magicHeight">
      <router-view></router-view>
    </div>

    <div class="bottomBar flex-mid" v-if="showBottom">
      <div class="subItem" @click="changeItem('index')">
        <div class="tabIndexClass">
          <img src="../assets/home_icon_press@2x.png" v-if="nowTabIndex === 0">
          <img src="../assets/home_icon@2x.png" v-else>
          <div class="subItem-name" :class="{active: nowTabIndex === 0}">
            <span>首页</span>
          </div>
        </div>
      </div>
      <div class="subItem" @click="changeItem('orderIndex')">
        <div class="tabIndexClass">
          <img src="../assets/order_icon_press@2x.png" v-if="nowTabIndex === 1">
          <img src="../assets/order_icon@2x.png" v-else>
          <div class="subItem-name" :class="{active: nowTabIndex === 1}">
            <span>订单</span>
          </div>
        </div>
      </div>
      <div class="subItem" @click="changeItem('userInfo')">
        <div class="tabIndexClass">
          <img src="../assets/my_icon_press@2x.png" v-if="nowTabIndex === 2">
          <img src="../assets/my_icon@2x.png" v-else>
          <div class="subItem-name" :class="{active: nowTabIndex === 2}">
            <span>我的</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../scss/base/var.scss';
  import '../scss/commonStyle.scss';
  import 'mint-ui/lib/style.css';

  require('swiper/dist/css/swiper.css');
  export default {
    data() {
      return {
        transitionName: 'expand',
        urlHash: window.location.hash,
        magicHeight: 'wholeHeight',
        showBottom: false,
        nowTabIndex: 1,//当前展示tab页的索引
        doron_appId: 'wxcc1bc83f7604f895',//公有云：wxf8f4ffba5ad3a93d     测试环境：wxcc1bc83f7604f895
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted: function () {
      this.fetchData();
    },
    methods: {
      fetchData() {
        let showBottomPaths = ['/index','/orderIndex', '/userInfo'];
        let curPath = this.$route.path;

        this.nowTabIndex = showBottomPaths.indexOf(curPath);
        if (showBottomPaths.indexOf(curPath) !== -1) {
          this.showBottom = true;
          this.magicHeight = 'partHeight';
        } else {
          this.showBottom = false;
          this.magicHeight = 'wholeHeight';
        }
      },
      preDefalut: function (events) {
        return;
      },
      changeItem: function (hashName) {
        var getParams = {
          hashUrl: hashName,
          getThis: this,
          pushType: 'replace'//说明是replace跳转
        };
        goUrl(getParams);
        //this.$router.replace({ path: goUrlParam.hashUrl, query: params});
      }
    }
  }
</script>
<style>
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .wholeHeight {
    height: 100%;
  }

  .partHeight {
    height: -webkit-calc(100% - 2.5rem);
    overflow: auto;
  }

  .bottomBar {
    position: fixed;
    height: 2.5rem;
    width: 100%;
    bottom: 0px;
    z-index: 1;
    background-color: #ffffff;
    border: 1px solid #ebebeb;
  }

  .subItem {
    flex: 1;
    text-align: center;
    color: #677a88;
    position: relative;
  }

  .subItem .tabIndexClass img {
    width: 1.0rem;
    height: 1.0rem;
  }

  .subItem-name{
    font-size: 0.5rem;
  }

  .subItem-name.active{
    color: #18D0A6;
  }

  #wholeCover {
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: .2;
    display: none;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  #entry {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  .expand-enter-active {
    transition: all .3s ease;
  }

  .expand-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .expand-enter,
  .expand-leave-active {
    padding-left: 10px;
    opacity: 0;
  }

</style>
