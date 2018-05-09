<template>
  <div class="expenseHistory" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">
        <span v-if=" type === 'deliver' ">我的收支记录</span>
        <span v-else>我的消费记录</span>
      </mt-tab-item>
      <mt-tab-item id="1">下级充值记录</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="tab-wrapper">
      <mt-loadmore :top-method="refresh" ref="loadmore">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="0">
            <empty v-if="!walletList.length"></empty>
            <div 
              class="history-item box flex-mid border-bottom-1px"
              v-for="(item, index) in walletList"
              v-if="walletList.length"
              :key="index">
              <div class="history-info flex">
                <span class="type-name">{{item.title}}</span>
                <span class="time">{{item.record_time}}</span>
              </div>
              <div class="expense-money">
                <span>{{item.content}}</span>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <empty v-if="!walletList.length"></empty>
            <div 
              class="history-item box flex-mid border-bottom-1px"
              v-for="(item, index) in walletList"
              v-if="walletList.length"
              :key="index">
              <div class="history-info flex">
                <span class="type-name">{{item.title}}</span>
                <span class="time">{{item.record_time}}</span>
              </div>
              <div class="expense-money">
                <span>{{item.content}}</span>
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
  import '@/scss/expenseHistory.scss';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    name: "expense-history",
    data () {
      return {
        selected: '0',
        walletList: [],
        scrollMode: 'touch',
        type: Request('type'),
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
    mounted () {
      this.getWalletList();
    },
    methods: {
      getWalletList () {
        httpService.get(httpServiceUrl.walletList, {
          user_id: this.type === 'deliver' ? window.wxUserData.rubber_id : window.wxUserData.user_id,
          record_type: this.selected,
          user_type: this.type === 'deliver' ? 0 : 1,
        }).then(res => {
          this.walletList = res.walletItems;
          this.$nextTick(() => {
            this.scrollMode = "touch";
            this.$refs.loadmore.onTopLoaded();
          });
        }).catch(err => {
          Toast(err.msg || '获取用户消费记录列表失败')
        })
      },
      refresh () {
        this.getWalletList();
      },
      tabChange () {
        this.getWalletList();
      }
    }
  }
</script>
