<template>
  <div class="expenseHistory">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">我的消费记录</mt-tab-item>
      <mt-tab-item id="2">下级充值记录</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="history-item box flex-mid border-bottom-1px">
          <div class="history-info flex">
            <span class="type-name">充值</span>
            <span class="time">2018-02-10</span>
          </div>
          <div class="expense-money">
            <span>+ ¥100.00</span>
          </div>
        </div>
        <div class="history-item box flex-mid border-bottom-1px">
          <div class="history-info flex">
            <span class="type-name">精洗</span>
            <span class="time">2018-02-10</span>
          </div>
          <div class="expense-money">
            <span>- ¥14.00</span>
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
  import '@/scss/expenseHistory.scss';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);

  export default {
    name: "expense-history",
    data () {
      return {
        selected: '1'
      }
    }
  }
</script>
