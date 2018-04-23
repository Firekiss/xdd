<template>
  <div class="my-order" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">全部</mt-tab-item>
      <mt-tab-item id="1">已接单</mt-tab-item>
      <mt-tab-item id="2">已完成</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="tab-wrapper">
      <mt-loadmore :top-method="refresh" ref="loadmore">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="0">
            <empty v-if="!orderList.length"></empty>
            <div 
              class="orderItem"
              v-for="item in orderList"
              v-if="orderList.length"
              :key="item.order_id">
              <div class="line1 border-bottom-1px">
                <span class="span1">订单编号：</span>
                <span class="span2">{{item.order_num}}</span>
                <span class="span3">{{item.is_finished === 0 ? '未完成' : '已完成'}}</span>
              </div>
              <div class="line2 flex-mid">
                <img class="vertical1" v-if="item.good_type === 1" src="../assets/order_clean_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 2" src="../assets/order_dry_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 3" src="../assets/order_wash_shoe@2x.png">
                <div class="vertical2">
                  <div class="time">下单时间：{{item.pay_time}}</div>
                  <div class="address">送至：{{item.school_name + item.room_num + '-' + item.house_num}}</div>
                  <div class="address">用户：{{item.user_name}}</div>
                  <div class="address">电话：{{item.telephone}}</div>
                </div>
                <div class="vertical3">
                  <span>x{{item.good_num}}</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <empty v-if="!orderList.length"></empty>
            <div 
              class="orderItem"
              v-for="item in orderList"
              v-if="orderList.length && item.is_finished === 0"
              :key="item.order_id">
              <div class="line1 border-bottom-1px">
                <span class="span1">订单编号：</span>
                <span class="span2">{{item.order_num}}</span>
                <span class="span3">{{item.is_finished === 0 ? '未完成' : '已完成'}}</span>
              </div>
              <div class="line2 flex-mid">
                <img class="vertical1" v-if="item.good_type === 1" src="../assets/order_clean_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 2" src="../assets/order_dry_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 3" src="../assets/order_wash_shoe@2x.png">
                <div class="vertical2">
                  <div class="time">下单时间：{{item.pay_time}}</div>
                  <div class="address">送至：{{item.school_name + item.room_num + '-' + item.house_num}}</div>
                  <div class="address">用户：{{item.user_name}}</div>
                  <div class="address">电话：{{item.telephone}}</div>
                </div>
                <div class="vertical3">
                  <span>x{{item.good_num}}</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <empty v-if="!orderList.length"></empty>
            <div 
              class="orderItem"
              v-for="item in orderList"
              v-if="orderList.length"
              :key="item.order_id">
              <div class="line1 border-bottom-1px">
                <span class="span1">订单编号：</span>
                <span class="span2">{{item.order_num}}</span>
                <span class="span3">{{item.is_finished === 0 ? '未完成' : '已完成'}}</span>
              </div>
              <div class="line2 flex-mid">
                <img class="vertical1" v-if="item.good_type === 1" src="../assets/order_clean_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 2" src="../assets/order_dry_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 3" src="../assets/order_wash_shoe@2x.png">
                <div class="vertical2">
                  <div class="time">下单时间：{{item.pay_time}}</div>
                  <div class="address">送至：{{item.school_name + item.room_num + '-' + item.house_num}}</div>
                  <div class="address">用户：{{item.user_name}}</div>
                  <div class="address">电话：{{item.telephone}}</div>
                </div>
                <div class="vertical3">
                  <span>x{{item.good_num}}</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import empty from "./widget/empty";
  import httpServiceUrl from "../common/httpServiceUrl";
  import httpService from "../common/httpService";
  import { Loadmore } from 'mint-ui';
  import { Navbar, TabItem } from 'mint-ui';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import '@/scss/myOrder.scss';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    name: "my-order",
    data () {
      return {
        selected: '0',
        scrollMode: 'touch',
        orderList: []
      }
    },
    components: {
      empty
    },
    watch: {
      selected () {
        this.tabChange();
      }
    },
    mounted: function () {
      this.initOrderList();
    },
    methods: {
      initOrderList:function(){
        httpService.get(httpServiceUrl.rubAllOrderList, {
          rubber_id: window.wxUserData.rubber_id ,
          type: this.selected
        }).then(res => {
          this.orderList = res.orderItems;
          this.$nextTick(() => {
            this.scrollMode = "touch";
            this.$refs.loadmore.onTopLoaded();
          });
        }).catch(err => {
          Toast(err.msg || '获取配送员订单列表失败');
        })
      },
      refresh () {
        this.initOrderList();
      },
      tabChange () {
        this.initOrderList();
      }
    },
    
  }
</script>

<style scoped>

</style>
