<template>
  <div class="indexPage">
    <mt-loadmore :top-method="indexRefresh" ref="loadmore" :auto-fill="true"
                 style="min-height:100%;width: 100%;background-color: #f0f2f5;">
      <div class="banTop">
        <mt-swipe :auto="5000">
          <mt-swipe-item
            v-for="(oImg, $index) in topImages"
            :key="$index">
            <a :href="oImg.linked_url">
              <img :src='oImg.image_url'>
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="serveType flex-mid">
        <div class="workList"
          v-for="(item, $index) in workList"
          @click="goGoodDetail($index + 1)"
          :key="$index">
          <img :src="item.imgSrc">
          <div class="work-name"><span>{{item.title}}</span></div>
        </div>
      </div>
      <div class="hotActivate">
        <div class="topTitle">热门活动</div>
        <div class="content">
          <a :href="activities[0] && activities[0].linked_url">
            <div class="left">
              <img
                v-if="activities[0] && activities[0].image_url"
                :src="activities[0].image_url">
            </div>
          </a>
          <a :href="activities[1] && activities[1].linked_url">
            <div class="right1">
              <img
                v-if="activities[1] && activities[1].image_url"
                :src="activities[1].image_url">
            </div>
          </a>
          <a :href="activities[2] && activities[2].linked_url">
            <div class="right1 right2">
              <img
                v-if="activities[2] && activities[2].image_url"
                :src="activities[2].image_url">
            </div>
          </a>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import Vue from 'vue';
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';
  import tool from '../common/tools';
  import Loadmore from 'mint-ui/lib/loadmore';
  import '../scss/index.scss';
  import {
    Swipe,
    SwipeItem
  } from 'mint-ui';

  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  export default {
    data() {
      return {
        topImages:[],
        activities: [],
        workList: [
          {
            imgSrc: require("../assets/index/washer@2x.png"),
            title: "精洗"
          },
          {
            imgSrc: require("../assets/index/dry_clean@2x.png"),
            title: "干洗"
          },
          {
            imgSrc: require("../assets/index/wash_shoes@2x.png"),
            title: "洗鞋"
          }
        ]
      }
    },
    mounted: function () {
      var me = this;

      me.queryDoorImageList();

      pushHistory();
      window.addEventListener("popstate", me.closeWX, false);
      function pushHistory() {
        var state = {
          title: "title",
          url: "#/index"
        };
        window.history.pushState(state, "title", "#/index");
      }
    },
    methods: {
      //下拉刷新
      indexRefresh: function () {
        this.queryDoorImageList();
      },
      queryDoorImageList () {
        httpService.get(httpServiceUrl.doorImageList).then(res => {
          this.topImages = res.topItems || [];
          this.activities = res.activityItems || [];
          this.$refs.loadmore.onTopLoaded();
        }).catch(err => {
          Toast(err);
          this.$refs.loadmore.onTopLoaded();
        })
      },
      goGoodDetail (typeNum) {
        let goUrlParam = {
          "hashUrl": 'orderImmediately',
          "getThis": this,
          'params': {
            typeNum: typeNum
          }
        };
        goUrl(goUrlParam);
      },
      // 清除登录记录 关闭微信
      closeWX () {
        WeixinJSBridge.call('closeWindow');
      }
    },
    destroyed () {
      window.removeEventListener("popstate", this.closeWX, false);
    }
  }
</script>
