<template>
  <div class="orderIndex">
    <div class="tab-row">
      <div class="myTab-item" @click="orderItemTab(index)" v-for="(item,index) in showTopItem">
        <div class="textCon" :class="{'onfocusColor':item.orderFocus}">{{item.name}}</div>
      </div>
    </div>
    <div class="orderLists">
      <div class="orderItem">
        <div class="line1 border-bottom-1px">
          <span class="span1">订单编号：</span>
          <span class="span2">1255855699</span>
          <span class="span3">配送中</span>
        </div>
        <div class="line2 flex-mid border-bottom-1px">
          <img class="vertical1" src="../assets/orderPic@2x.png">
          <div class="vertical2">
            <div class="time">下单时间：2014-08-12 12:00</div>
            <div class="address">送至：宿舍</div>
          </div>
          <div class="vertical3">
            <span>x2</span>
          </div>
        </div>
        <div class="line3 flex-mid">
          <div class="practical-pay">
            <span class="moneyCom">实付</span>
            <span class="moneyCom moneyColor">￥16.00</span>
          </div>
          <div class="tabRight flex-mid">
            <div class="butRight flex-mid"><span>申请售后</span></div>
            <div class="butRight flex-mid red-btn"><span>确认收货</span></div>
          </div>

        </div>
      </div>
    </div>
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
            orderFocus: 1
          },
          {
            name: "待付款",
            orderFocus: 0
          },
          {
            name: "待配送",
            orderFocus: 0
          },
          {
            name: "已完成",
            orderFocus: 0
          },
          {
            name: "售后",
            orderFocus: 0
          }
        ],
      }
    },
    mounted: function () {
    },
    methods: {
      orderItemTab: function (index) {
        for (var i = 0; i < this.showTopItem.length; i++) {
          this.showTopItem[i].orderFocus = 0;
        }
        this.showTopItem[index].orderFocus = 1;
      },
    }

  }
</script>
