<template>
  <div class="indexPage">
    <mt-loadmore :top-method="indexRefresh" ref="loadmore" :auto-fill="true"
                 style="min-height:100%;width: 100%;background-color: #f0f2f5;">
      <div class="banTop">
        <mt-swipe :auto="5000">
          <mt-swipe-item
            v-for="(oImg, $index) in topImages"
            :key="$index">
            <img :src='oImg.image_url'>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="serveType flex-mid">
        <div class="workList"
          v-for="(item, $index) in workList"
          :key="$index">
          <img :src="item.imgSrc">
          <div class="work-name"><span>{{item.title}}</span></div>
        </div>
      </div>
      <div class="hotActivate">
        <div class="topTitle">热门活动</div>
        <div class="content">
          <div class="left">
            <img
              v-if="activities[0] && activities[0].image_url"
              :src="activities[0].image_url">
          </div>
          <div class="right1">
            <img
              v-if="activities[1] && activities[1].image_url"
              :src="activities[1].image_url">
          </div>
          <div class="right1 right2">
            <img
              v-if="activities[2] && activities[2].image_url"
              :src="activities[2].image_url">
          </div>
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
      this.queryDoorImageList()
    },
    methods: {
      //下拉刷新
      indexRefresh: function () {

      },
      queryDoorImageList () {
        httpService.get(httpServiceUrl.doorImageList).then(res => {
          this.topImages = res.topItems || [];
          this.activities = res.activityItems || [];
        })
      }
    }

  }
</script>
