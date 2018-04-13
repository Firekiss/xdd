<template>
  <div class="balance box">
    <div class="title">
      <span>我的余额</span>
    </div>
    <div class="balance-num">
      <span>¥{{userMoney}}</span>
    </div>
    <div class="next-btn flex-centers" @click="goRecharge">
      <span v-if=" type === 'deliver' ">提现</span>
      <span v-else>充值</span>
    </div>
    <div class="next-btn flex-centers" style="margin-top: 1.0rem;" @click="goExpenseHistory">
      <span>消费记录</span>
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
      }
    },
    methods: {
      goRecharge () {
        if (this.type === 'deliver') {
          // 跳转到提现的页面
          let goUrlParam = {
            hashUrl: 'withdraw',
            getThis: this
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
          getThis: this
        };
        goUrl(goUrlParam);
      }
    }
  }
</script>

<style scoped>

</style>
