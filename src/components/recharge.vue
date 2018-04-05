<template>
  <div class="recharge box">
    <div class="choose-title">
      <span>请选择金额</span>
    </div>
    <div class="moneys flex">
      <div 
        class="money-item flex-mid"
        :class="{'active': item.money === selectedMoneyVal}"
        v-for="(item, index) in chargeMoneyList"
        :key="index"
        @click="chooseChargeMoney(item.money)">
        <span>{{item.money}}元</span>
      </div>
    </div>
    <div class="next-btn flex-centers" @click="submit">
      <span>下一步</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/recharge.scss'
import httpService from '../common/httpService';
import httpServiceUrl from '../common/httpServiceUrl';
  export default {
    name: "recharge",
    data () {
      return {
        chargeMoneyList: [],
        selectedMoneyVal: ''
      }
    },
    mounted () {
      this.getChargeMoneyList();
    },
    methods: {
      getChargeMoneyList () {
        httpService.post(httpServiceUrl.chargeMoneyList).then(res => {
          this.chargeMoneyList = res.chargeMoneyItems;
        }).catch(err => {
          Toast(err.msg || '请求充值金额列表失败');
        })
      },
      chooseChargeMoney (moneyVal) {
        this.selectedMoneyVal = moneyVal;
      },

      // 提交充值
      submit () {
        if (this.selectedMoneyVal === '') {
          Toast('请先选择充值金额');
          return;
        }

        httpService.post(httpServiceUrl.addChargeOrder, {
          user_id: window.wxUserData.user_id,
          charge_money: this.selectedMoneyVal
        }).then(res => {
          this.chargeNotify(res.order_num);
        }).catch(err => {
          Toast(err.msg || '用户提交充值订单接口失败')
        })
      },

      // 用户充值微信支付订单
      chargeNotify (orderNum) {
        let self = this;

        httpService.post(httpServiceUrl.chargeNotify, {
          order_num: orderNum,
          openid: window.openid
        }).then(res => {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
              appId: res.paySign.appId,
              timeStamp: res.paySign.timeStamp,
              nonceStr: res.paySign.nonceStr,
              package: res.paySign.package,
              signType: res.paySign.signType,
              paySign: res.paySign.paySign
            },
            function(res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                Toast('支付成功');
                // 支付成功之后跳转到个人中心
                setTimeout(() => {
                  let goUrlParam = {
                    hashUrl: 'userInfo',
                    getThis: self
                  };
                  goUrl(goUrlParam);
                }, 1500);
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                Toast('取消支付');
              } else {
                Toast('支付失败');
              }
            }
          )
        })
      }
    }
  }
</script>