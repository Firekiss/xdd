<template>
  <div class="rob-order" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">去洗衣</mt-tab-item>
      <mt-tab-item id="2">去交付</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="tab-wrapper">
      <mt-loadmore :top-method="refresh" ref="loadmore">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <empty v-if="!robOrderList.length"></empty>
            <div class="orderItem"
              v-if="robOrderList.length"
              v-for="item in robOrderList"
              :key="item.order_id">
              <div class="line1 border-bottom-1px">
                <span class="span1">订单编号：</span>
                <span class="span2">{{item.order_num}}</span>
              </div>
              <div class="line2 flex-mid border-bottom-1px">
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
              <div class="line3 flex-mid">
                <div class="practical-pay"></div>
                <div class="tabRight flex-mid">
                  <div class="butRight flex-mid red-btn" @click.stop="rubOrder(item.order_id)"><span>抢单</span></div>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <empty v-if="!robOrderList.length"></empty>
            <div class="orderItem"
                 v-if="robOrderList.length"
                 v-for="item in robOrderList"
                 :key="item.order_id">
              <div class="line1 border-bottom-1px">
                <span class="span1">订单编号：</span>
                <span class="span2">{{item.order_num}}</span>
              </div>
              <div class="line2 flex-mid border-bottom-1px">
                <img class="vertical1" v-if="item.good_type === 1" src="../assets/order_clean_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 2" src="../assets/order_dry_wash@2x.png">
                <img class="vertical1" v-if="item.good_type === 3" src="../assets/order_wash_shoe@2x.png">
                <div class="vertical2">
                  <div class="time">下单时间：{{item.pay_time}}</div>
                  <div class="address">送至：{{item.school_name + item.room_num + '-' + item.house_num + '23'}}</div>
                  <div class="address">用户：{{item.user_name}}</div>
                  <div class="address">电话：{{item.telephone}}</div>
                </div>
                <div class="vertical3">
                  <span>x{{item.good_num}}</span>
                </div>
              </div>
              <div class="line3 flex-mid">
                <div class="practical-pay"></div>
                <div class="tabRight flex-mid">
                  <div class="butRight flex-mid red-btn" @click.stop="rubOrder(item.order_id)"><span>抢单</span></div>
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
  import '@/scss/robOrder.scss';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    name: "rob-order",
    components: {
      empty
    },
    data () {
      return {
        selected: '1',
        scrollMode: 'touch',
        robOrderList: []
      }
    },
    watch: {
      selected () {
        this.tabChange();
      }
    },
    mounted () {
      this.queryRobOrderList();

      pushHistory();
      window.addEventListener("popstate", this.closeWX, false);
      function pushHistory() {
        var state = {
          title: "title",
          url: "#/robOrder"
        };
        window.history.pushState(state, "title", "#/robOrder");
      }
    },
    methods: {
      // 查询抢单列表数据
      queryRobOrderList () {
        let params = {
          openid: window.openid,
          type: Number(this.selected),
        };

        httpService.get(httpServiceUrl.robOrderList, params).then(res => {
          this.robOrderList = res.rubOrderItems;
          this.$refs.loadmore.onTopLoaded();
        }).catch(err => {
          Toast(err.msg || '获取抢单列表数据失败');
        })
      },
      // 下拉刷新
      refresh () {
        this.queryRobOrderList();
      },
      // tab切换的回调函数
      tabChange () {
        this.queryRobOrderList();
      },
      // 抢单操作
      rubOrder (orderId) {
        let params = {
          order_id: orderId,
          rubber_id: window.wxUserData.rubber_id
        };

        httpService.post(httpServiceUrl.robOrder, params).then(res => {
          Toast('抢单成功');
          this.queryRobOrderList();
        }).catch(err => {
          Toast(err.msg || '抢单失败');
        });
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
