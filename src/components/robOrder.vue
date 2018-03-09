<template>
  <div class="rob-order">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">去洗衣</mt-tab-item>
      <mt-tab-item id="2">去交付</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="orderItem">
          <div class="line1 border-bottom-1px">
            <span class="span1">订单编号：</span>
            <span class="span2">1255855699</span>
          </div>
          <div class="line2 flex-mid border-bottom-1px">
            <img class="vertical1" src="../assets/order_clean_wash@2x.png">
            <div class="vertical2">
              <div class="time">下单时间：2014-08-12 12:00</div>
              <div class="address">送至：宿舍</div>
            </div>
            <div class="vertical3">
              <span>x2</span>
            </div>
          </div>
          <div class="line3 flex-mid">
            <div class="practical-pay"></div>
            <div class="tabRight flex-mid">
              <div class="butRight flex-mid red-btn"><span>抢单</span></div>
            </div>
          </div>
        </div>
        <div class="orderItem">
          <div class="line1 border-bottom-1px">
            <span class="span1">订单编号：</span>
            <span class="span2">1255855699</span>
          </div>
          <div class="line2 flex-mid border-bottom-1px">
            <img class="vertical1" src="../assets/order_dry_wash@2x.png">
            <div class="vertical2">
              <div class="time">下单时间：2014-08-12 12:00</div>
              <div class="address">送至：宿舍</div>
            </div>
            <div class="vertical3">
              <span>x2</span>
            </div>
          </div>
          <div class="line3 flex-mid">
            <div class="practical-pay"></div>
            <div class="tabRight flex-mid">
              <div class="butRight flex-mid red-btn"><span>抢单</span></div>
            </div>
          </div>
        </div>
        <div class="orderItem">
          <div class="line1 border-bottom-1px">
            <span class="span1">订单编号：</span>
            <span class="span2">1255855699</span>
          </div>
          <div class="line2 flex-mid border-bottom-1px">
            <img class="vertical1" src="../assets/order_wash_shoe@2x.png">
            <div class="vertical2">
              <div class="time">下单时间：2014-08-12 12:00</div>
              <div class="address">送至：宿舍</div>
            </div>
            <div class="vertical3">
              <span>x2</span>
            </div>
          </div>
          <div class="line3 flex-mid">
            <div class="practical-pay"></div>
            <div class="tabRight flex-mid">
              <div class="butRight flex-mid red-btn"><span>抢单</span></div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Navbar, TabItem } from 'mint-ui';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import '@/scss/robOrder.scss';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  export default {
    name: "rob-order",
    data () {
      return {
        selected: '1'
      }
    }
  }
</script>
