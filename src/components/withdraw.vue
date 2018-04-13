<template>
  <div class="withdraw box">
    <p class="notice box">注意：提现金额＞200时，可转入支付宝；金额≤200时，自动提现到余额。</p>
    <div class="title"><span>提现金额</span></div>
    <div class="money-section">
      <div class="money-main flex-mid box border-bottom-1px">
        <span>¥</span>
        <input type="number" class="money-val" v-model="money">
      </div>
    </div>
    <div class="balance flex-mid box"><span>您的账户余额¥{{userMoney}}</span></div>
    <div class="pay-section box">
      <div class="pay-item border-bottom-1px">
        <div class="name"><span>支付宝账号</span></div>
        <div class="pay-content flex-mid">
          <input type="text" placeholder="请填写支付宝账号" class="pay-val" v-model="account_num">
          <span class="clear"></span>
        </div>
      </div>
      <div class="pay-item border-bottom-1px" style="margin-top: 1.0rem">
        <div class="name"><span>支付宝姓名</span></div>
        <div class="pay-content flex-mid">
          <input type="text" placeholder="请填写支付宝姓名" class="pay-val" v-model="account_name">
          <span class="clear"></span>
        </div>
      </div>
    </div>
    <div class="next-btn flex-centers" @click="rubTiXian"><span>提现到余额</span></div>
  </div>
</template>

<script>
  import '@/scss/withdraw.scss';
  import httpService from "../common/httpService";
  import httpServiceUrl from "../common/httpServiceUrl";

  export default {
    name: "withdraw",
    data () {
      return {
        userMoney: window.wxUserData.user_money,
        money: '',
        account_num: '',
        account_name: ''
      }
    },
    methods: {
      rubTiXian () {
        if (!this.money) {
          Toast('请输入提现金额');
          return;
        }

        if (!this.account_num) {
          Toast('请输入支付宝账号');
          return;
        }

        if (!this.account_name) {
          Toast('请输入支付宝名称');
          return;
        }

        httpService.post(httpServiceUrl.rubTiXian, {
          rubber_id: window.rubberId,
          money: this.money,
          account_num: this.account_num,
          account_name: this.account_name
        }).then(res => {
          Toast('提现申请成功');
          setTimeout(() => {
            let goUrlParam = {
              hashUrl: 'sendUserInfo',
              getThis: this
            };
            goUrl(goUrlParam);
          }, 1500);
        }).catch(err => {
          Toast(err.msg || '提现申请失败');
        });
      }
    }
  }
</script>
