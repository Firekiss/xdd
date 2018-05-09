<template>
  <div class="balance box">
    <div class="balance-wrapper flex">
      <div class="balance-box">
        <div class="title">
          <span>我的余额</span>
        </div>
        <div class="balance-num">
          <span>¥{{userMoney}}</span>
        </div>
      </div>
      <div
        v-if="userType === 'user'"
        class="balance-box"
        @click.stop="withdraw">
        <div class="title">
          <span>e币收益</span>
        </div>
        <div class="balance-num">
          <span>¥{{eMoney}}</span>
        </div>
      </div>
    </div>
    <div class="next-btn flex-centers" @click="goRecharge">
      <span v-if=" type === 'deliver' ">提现</span>
      <span v-else>充值</span>
    </div>
    <div class="next-btn flex-centers" style="margin-top: 1.0rem;" @click.stop="goExpenseHistory">
      <span v-if=" type === 'deliver' ">收支记录</span>
      <span v-else>消费记录</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/balance.scss';
  export default {
    name: "balance",
    data () {
      return {
        userMoney: Request('userMoney'),
        type: Request('type'),
        eMoney: Request('eMoney'),
        userType: Request('userType'),
      }
    },
    methods: {
      goRecharge () {
        if (this.type === 'deliver') {
          // 派单员 跳转到提现的页面
          let goUrlParam = {
            hashUrl: 'withdraw',
            getThis: this,
            params: {
              type: 0,
              userMoney: this.userMoney,
            }
          };
          goUrl(goUrlParam);
        } else {
          // 跳转到充值的页面
          let goUrlParam = {
            hashUrl: 'recharge',
            getThis: this
          };
          goUrl(goUrlParam);
        }
      },

      goExpenseHistory () {
        let goUrlParam = {
          hashUrl: 'expenseHistory',
          getThis: this,
          params: {
            type: this.type === 'deliver' ? 'deliver' : '',
          }
        };
        goUrl(goUrlParam);
      },

      // 普通用户点击e币跳转提现
      withdraw () {
        var goUrlParam = {
          hashUrl: 'withdraw',
          getThis: this,
          params: {
            type: 1,
            userMoney: this.eMoney,
          }
        };
        goUrl(goUrlParam);
      }
    }
  }
</script>
