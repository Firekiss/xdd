<template>
  <div class="orderIndex" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <div class="tab-row">
      <div class="myTab-item" @click="orderItemTab(item,index)" v-for="(item,index) in showTopItem">
        <div class="textCon" :class="{'onfocusColor':item.orderFocus}">{{item.name}}</div>
      </div>
    </div>
    <div class="loadmore-wrapper">
      <mt-loadmore :top-method="isRefresh" ref="loadmore">
        <div class="orderLists">
          <div v-if='orderList.length==0'>
            无数据页
          </div>
          <div class="orderItem" v-if='orderList.length!=0' v-for="item in orderList">
            <div class="line1 border-bottom-1px">
              <span class="span1">订单编号：</span>
              <span class="span2">{{item.order_num}}</span>
              <span class="span3" v-if='item.order_status==0'>未支付</span>
              <span class="span3" v-if='item.order_status==1'>已支付</span>
              <span class="span3" v-if='item.order_status==2'>已完成</span>
              <span class="span3" v-if='item.order_status==3'>已评价</span>
              <span class="span3" v-if='item.order_status==4'>售后</span>
            </div>
            <div class="line2 flex-mid border-bottom-1px" @click="goDetail(item)">
              <img class="vertical1" v-if='item.good_type==1' src="../assets/index/washer@2x.png">
              <img class="vertical1" v-if='item.good_type==2' src="../assets/index/dry_clean@2x.png">
              <img class="vertical1" v-if='item.good_type==3' src="../assets/index/wash_shoes@2x.png">
              <div class="vertical2">
                <div class="time">下单时间：{{item.create_time}}</div>
                <div class="address">送至：{{item.school_name}}{{item.house_num}}-{{item.room_num}}</div>
              </div>
              <div class="vertical3">
                <span>x{{item.good_num}}</span>
              </div>
            </div>
            <div class="line3 flex-mid">
              <div class="practical-pay">
                <span class="moneyCom">实付</span>
                <span class="moneyCom moneyColor">￥{{item.true_price}}</span>
              </div>
              <div class="tabRight flex-mid">
                <div class="butRight flex-mid" v-if="item.order_status === 1 || item.order_status === 2 || item.order_status === 3"><span>申请售后</span></div>
                <div class="butRight flex-mid" v-if="item.order_status === 2"><span>去评价</span></div>
                <div class="butRight flex-mid red-btn" v-if="item.order_status === 0"><span>去付款</span></div>
                <div class="butRight flex-mid red-btn" v-if="item.order_status === 1"><span>确认收货</span></div>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import httpServiceUrl from "../common/httpServiceUrl";
import httpService from "../common/httpService";
import tool from "../common/tools";
import Loadmore from "mint-ui/lib/loadmore";
import "../scss/orderIndex.scss";

Vue.component(Loadmore.name, Loadmore);

export default {
  data() {
    return {
      scrollMode: 'touch',
      showTopItem: [
        {
          name: "全部",
          orderFocus: 1,
          type: 0
        },
        {
          name: "待付款",
          orderFocus: 0,
          type: 1
        },
        {
          name: "待配送",
          orderFocus: 0,
          type: 2
        },
        {
          name: "已完成",
          orderFocus: 0,
          type: 3
        },
        {
          name: "售后",
          orderFocus: 0,
          type: 4
        }
      ],
      orderListUrl: httpServiceUrl.orderList,
      orderListParam: {
        type: 0
      },
      orderList: [] //订单列表
    };
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    orderItemTab: function(item, index) {
      for (var i = 0; i < this.showTopItem.length; i++) {
        this.showTopItem[i].orderFocus = 0;
      }
      this.showTopItem[index].orderFocus = 1;
      this.orderListParam.type = item.type; //根据不同的type调不同的数据
      this.initData();
    },
    initData: function() {
      var self = this;
      httpService
        .get(this.orderListUrl, this.orderListParam)
        .then(function(data) {
          self.orderList = data.orderItems;
          self.$nextTick(() => {
            self.scrollMode = "touch";
            self.$refs.loadmore.onTopLoaded();
          });
        })
        .catch(function(err) {
          Toast(err.msg || '获取数据失败');
        });
    },

    //下拉刷新
    isRefresh: function() {
      this.initData();
    },

    //跳转到详情页
    goDetail: function(item) {
      var getParams = {
        hashUrl: "orderDetail",
        getThis: this,
        params: {
          order_id: item.order_id
        }
      };
      goUrl(getParams);
    }
  }
};
</script>
