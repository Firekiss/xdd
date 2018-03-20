<template>
  <div class="orderIndex">
    <div class="tab-row">
      <div class="myTab-item" @click="orderItemTab(item,index)" v-for="(item,index) in showTopItem">
        <div class="textCon" :class="{'onfocusColor':item.orderFocus}">{{item.name}}</div>
      </div>
    </div>
    <mt-loadmore :top-method="isRefresh" ref="loadmore"  :auto-fill="true" style="min-height: 100%">
      <div class="orderLists">
        <div v-if='orderList.length==0'>
          无数据页
        </div>
        <div class="orderItem" v-if='orderList.length!=0' v-for="item in orderList">
          <div class="line1 border-bottom-1px">
            <span class="span1">订单编号：</span>
            <span class="span2">{{item.order_num}}</span>
            <!-- <span class="span3" v-if='item.deliver_status==0'>订单未支付</span>
            <span class="span3" v-if='item.deliver_status==1'>订单已支付，等待配送员抢单</span>
            <span class="span3" v-if='item.deliver_status==2'>配送员已抢单，等待，上门收衣</span>
            <span class="span3" v-if='item.deliver_status==3'>订单已绑定衣袋，去洗衣途中</span>
            <span class="span3" v-if='item.deliver_status==4'>衣袋入场，准备洗衣</span>
            <span class="span3" v-if='item.deliver_status==5'>洗衣完成，等待配送员抢单</span>
            <span class="span3" v-if='item.deliver_status==6'>配送员已抢单，送还中 </span>
            <span class="span3" v-if='item.deliver_status==7'>用户确认送达，订单配送完成</span>
            <span class="span3" v-if='item.deliver_status==8'>申请售后</span> -->
            <span class="span3" v-if='item.order_status==0'>未支付</span>
            <span class="span3" v-if='item.order_status==1'>已支付</span>
          </div>
          <div class="line2 flex-mid border-bottom-1px" @click="goDetail(item)">
            <img class="vertical1" v-if='item.good_type==0' src="../assets/index/washer@2x.png">
            <img class="vertical1" v-if='item.good_type==1' src="../assets/index/dry_clean@2x.png">
            <img class="vertical1" v-if='item.good_type==2' src="../assets/index/wash_shoes@2x.png">
            <div class="vertical2">
              <div class="time">下单时间：{{item.create_time}}</div>
              <div class="address">送至：{{item.school_name}}{{item.house_num}}{{item.room_num}}</div>
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
              <div class="butRight flex-mid"><span>申请售后</span></div>
              <div class="butRight flex-mid red-btn"><span>确认收货</span></div>
            </div>

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
  import '../scss/orderIndex.scss';

  Vue.component(Loadmore.name, Loadmore);
  export default {
    data() {
      return {
        showTopItem: [
          {
            name: "全部",
            orderFocus: 1,
            type:0
          },
          {
            name: "待付款",
            orderFocus: 0,
            type:1

          },
          {
            name: "待配送",
            orderFocus: 0,
            type:2
          },
          {
            name: "已完成",
            orderFocus: 0,
            type:3
          },
          {
            name: "售后",
            orderFocus: 0,
            type:4
          }
        ],
        orderListUrl:httpServiceUrl.orderList,
        orderListParam:{
           type:0
        },
        orderList:[],//订单列表
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      orderItemTab: function (item,index) {
        for (var i = 0; i < this.showTopItem.length; i++) {
          this.showTopItem[i].orderFocus = 0;
        }
        this.showTopItem[index].orderFocus = 1;
        this.orderListParam.type = item.type;//根据不同的type调不同的数据
        this.initData();
      },
      initData:function(){
        var self = this;
         httpService.get(this.orderListUrl,this.orderListParam).then(function(data){
            //console.log(JSON.stringify(data));
            self.orderList = data.orderItems;
            //this.$refs.loadmore.onTopLoaded();
         }).catch(function(data){
            
            //this.$refs.loadmore.onTopLoaded();
         })
      },

      //下拉刷新
      isRefresh:function(){
        this.initData();
      },

      //跳转到详情页
      goDetail:function(item){
          var getParams = {
            hashUrl: 'orderDetail',
            getThis: this,
            params:{
                order_id:item.order_id
            }
          };
          goUrl(getParams);
      },

    }

  }
</script>
