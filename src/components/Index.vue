<template>
  <div class="indexPage">
    <mt-loadmore :top-method="indexRefresh" ref="loadmore" :auto-fill="true"
                 style="min-height:100%;width: 100%;background-color: #f0f2f5;">
      <div class="banTop">
        <mt-swipe :auto="5000">
          <mt-swipe-item v-for="(item,index) in imageSrcs">
            <img :src='item.pictureUrl'>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="serveType">
        <div class="workList" v-for="item in workList">
          <img :src="item.imgSrc">
          <div>{{item.title}}</div>
        </div>
      </div>
      <div class="hotActivate">
        <div class="topTitle">热门活动</div>
        <div class="content">
          <div class="left">

          </div>
          <div class="right1">

          </div>
          <div class="right1 right2">

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
        imageSrcs: [
          {
            pictureUrl: require("../assets/1.jpg")
          },
          {
            pictureUrl: require("../assets/2.jpg")
          },
          {
            pictureUrl: require("../assets/3.jpg")
          }
        ],
        workList: [
          {
            imgSrc: require("../assets/stu_indexTab.png"),
            title: "精洗"
          },
          {
            imgSrc: require("../assets/subjectTab.png"),
            title: "干洗"
          },
          {
            imgSrc: require("../assets/personalTab.png"),
            title: "洗鞋"
          }
        ],
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
          console.log(res)
        })
      }
    }

  }
</script>
