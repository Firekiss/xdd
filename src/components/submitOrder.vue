<template>
  <div class="submit-order box">
    <!-- 弹出框蒙层 -->
    <div class="wholeCover2" @touchmove.prevent v-if="payWeixin_resultPop"></div>
    <div class="user-info flex-mid box">
      <div class="user-info-section">
        <span class="user-location">{{wxUserData.school_name}}</span>
        <div class="user-base-info">
          <span class="user-name">{{wxUserData.user_name}}</span>
          <span class="user-tell">{{wxUserData.telephone.substr(0, 3) + '****' + wxUserData.telephone.substr(7, 4)}}</span>
        </div>
      </div>
      <!--<img src="../assets/icon_arrow.png" class="arrow-icon">-->
    </div>
    <div class="order-survey">
      <div class="survey-line flex-mid border-bottom-1px">
        <span class="survey-name">衣服数量</span>
        <span class="survey-val">{{washNumber}}</span>
      </div>
      <div class="survey-line flex-mid border-bottom-1px">
        <span class="survey-name">洗衣袋数量</span>
        <span class="survey-val">1</span>
      </div>
      <div class="survey-line flex-mid border-bottom-1px"
        @click="showTicketSheet">
        <span class="survey-name">商家卡券</span>
        <div class="survey-line-right flex-mid" v-if="ticketList.length">
          <span class="reduce-money" v-if="ticketMoney > 0">- ¥{{ticketMoney}}</span>
          <span class="reduce-money no-red" v-if="ticketMoney === 0">请选择优惠券</span>
          <img src="../assets/icon_arrow.png" class="arrow-icon">
        </div>
        <div class="survey-line-right flex-mid" v-else>
          <span class="reduce-money no-red">暂无优惠券</span>
        </div>
      </div>
      <div class="survey-line flex only-right border-bottom-1px">
        <div class="survey-line-right flex-mid">
          <span class="total">小计</span>
          <span class="reduce-money">¥{{price}}</span>
        </div>
      </div>
    </div>
    <div class="remark survey-line flex-mid">
      <span class="survey-name">备注</span>
      <div class="survey-line-right flex-mid">
        <input type="text" placeholder="暂无备注" v-model="mark">
      </div>
    </div>

    <div class="total-cart flex-mid">
      <div class="total-money-section flex box">
        <div class="reduce-section">
          <span>已优惠¥{{ticketMoney}}</span>
        </div>
        <div class="total-bar flex-mid">
          <span class="title">合计</span>
          <span class="money">¥{{realityMoney || truePrice}}</span>
        </div>
      </div>
      <span class="order-btn flex-centers" v-if="isNewOrder" @click.stop="createOrder">立即下单</span>
      <span class="order-btn flex-centers" v-else @click.stop="payOrder">立即付款</span>
    </div>

    <!--使用卡券遮罩选择-->
    <widget-mask-sheet
      :title="ticketUseSheet.title"
      :visible="ticketUseSheet.visible"
      :close="closeTicketSheet"
      :maskClick="ticketSheetClick">
        <div class="ticket-list box">
          <div class="ticket-item border-bottom-1px flex-mid"
               v-for="(ticket, $index) in ticketList"
               @click="ticketToggle($index)">
            <span class="ticket-name">¥{{ticket.couple_value}} 洗衣代金券</span>
            <span class="check" v-if="!ticket.ticketChecked"><img src="../assets/check@2x.png"></span>
            <span class="check" v-else><img src="../assets/checked@2x.png"></span>
          </div>
        </div>
    </widget-mask-sheet>

    <!--支付方式遮罩选择-->
    <widget-mask-sheet
      :title="payTypeSheet.title"
      :visible="payTypeSheet.visible"
      :showConfirm="payTypeSheet.showConfirm"
      :confirm="confirmToPay"
      :close="closePaySheet"
      :maskClick="paySheetClick">
      <div class="ticket-list box">
        <div class="ticket-item border-bottom-1px flex-mid" @click="selectPayType('wxPay')">
          <span class="ticket-name">微信支付</span>
          <span class="check" v-if="!(payType === 'wxPay')"><img src="../assets/check@2x.png"></span>
          <span class="check" v-else><img src="../assets/checked@2x.png"></span>
        </div>
        <div class="ticket-item border-bottom-1px flex-mid" @click="selectPayType('balance')">
          <span class="ticket-name">余额支付</span>
          <span class="check" v-if="!(payType === 'balance')"><img src="../assets/check@2x.png"></span>
          <span class="check" v-else><img src="../assets/checked@2x.png"></span>
        </div>
      </div>
    </widget-mask-sheet>

    <!-- 返回支付结果弹出框 -->
    <div class="popSureBackMoney" v-if="payWeixin_resultPop">
        <div class="topMsg">
            {{payWeixinMsg}}
        </div>
        <div class="doubleBotton2">
            <div class="sureBotton_pay" @click="afterPayWeiXin()">确认</div>
        </div>
    </div>

  </div>
</template>

<script>
import httpServiceUrl from "../common/httpServiceUrl";
import httpService from "../common/httpService";
import "@/scss/submitOrder.scss";
import widgetMaskSheet from "./widget/widgetMaskSheet";
import { MessageBox } from 'mint-ui';

export default {
  name: "submit-order",
  components: {
    widgetMaskSheet
  },
  data() {
    return {
      ticketUseSheet: {
        visible: false,
        title: "使用卡券"
      },
      payTypeSheet: {
        visible: false,
        title: "选择支付方式",
        showConfirm: true
      },
      payType: "wxPay",
      wxUserData: window.wxUserData,
      washNumber: Number(Request("washNumber")),
      orderId: Request('orderId'),
      price: Request("price"),
      goodType: Number(Request("goodType")),
      // 是否是需要新建订单
      isNewOrder: false,
      // 订单详情对象数据
      orderDetail: {},
      ticketMoney: 0,
      truePrice: 0,
      ticketList: [],
      selectedTicket: {},
      mark: "",
      getOrderNum: "", //订单号
      payWeixin_resultPop: 0, //是否展示支付弹框
      payWeixinMsg: "", //支付结果信息
      payWeixin_result: "" //支付结果
    };
  },
  computed: {
    realityMoney() {
      let money = (this.price * 1000  - this.ticketMoney * 1000) / 1000;
      return money > 0 ? money : 0;
    }
  },
  mounted() {
    // 根据url中是否携带了orderId参数来判断这是否是一个新的订单
    this.isNewOrder = this.orderId === '';

    if (this.isNewOrder) {
      // 获取当前用户未使用且未过期的优惠券列表
      this.getUserCoupleList();
    } else {
      this.getOrderDetail(this.orderId);
    }
  },
  methods: {
    // 获取用户所有可用优惠券列表
    getUserCoupleList() {
      httpService
        .get(httpServiceUrl.userCoupleList, {
          user_id: this.wxUserData.user_id,
          type: 1
        })
        .then(res => {
          this.ticketList = res.userCoupleItems;
        });
    },
    // 根据订单id获取订单详情数据
    getOrderDetail (orderId) {
      httpService.post(httpServiceUrl.orderDetail, {
        order_id: orderId
      }).then(res => {
        this.orderDetail = res;
        this.getOrderNum = Request('orderNum');
        this.washNumber = res.good_num;
        this.ticketMoney = res.couple_value;
        this.truePrice = res.true_price;
        this.mark = res.mark;
        this.payTypeSheet.visible = true;
      }).catch(err => {
        Toast(err.msg || '获取订单详情数据失败');
      })
    },
    // 点击立即下单
    createOrder() {
      let params = {
        user_id: this.wxUserData.user_id,
        good_type: this.goodType,
        good_num: this.washNumber,
        mark: this.mark
      };

      if (this.ticketMoney > 0) {
        params.couple_id = this.selectedTicket.couple_id;
      }

      httpService.get(httpServiceUrl.addOrder, params).then(res => {
        // 用户提交订单成功后
        this.getOrderNum = res.order_num;
        this.showPaySheet();
      }).catch(err => {
        Toast(err.msg || "立即下单失败");
      })
    },
    // 点击显示优惠券弹窗
    showTicketSheet() {
      if (this.isNewOrder) {
        this.ticketList.length && (this.ticketUseSheet.visible = true);
      }
    },
    closeTicketSheet() {
      this.ticketUseSheet.visible = false;
    },
    ticketSheetClick() {
      this.ticketUseSheet.visible = false;
    },
    // 选中一张优惠券的操作
    ticketToggle(index) {
      this.ticketList.forEach((ticket, i) => {
        ticket.ticketChecked = false;
        this.$set(this.ticketList, i, ticket);
      });
      this.ticketList[index].ticketChecked = true;
      this.ticketMoney = this.ticketList[index].couple_value;
      this.selectedTicket = this.ticketList[index];
      this.$set(this.ticketList, index, this.ticketList[index]);
    },
    showPaySheet() {
      this.payTypeSheet.visible = true;
    },
    closePaySheet() {
      this.payTypeSheet.visible = false;
    },
    paySheetClick() {
      this.payTypeSheet.visible = false;
    },
    // 点击切换支付方式
    selectPayType(payType) {
      this.payType = payType;
    },
    // 点击立即付款的时候
    // 让用户选择付款方式
    payOrder () {
      this.payTypeSheet.visible = true;
    },
    confirmToPay() {
      var self = this;
      if (this.payType === "wxPay") {
        console.log("选择微信支付");
        var settle_accounts_url = httpServiceUrl.createWxOrder; //生成订单接口
        var pay_params = {
          openid: window.openid,
          order_num: this.getOrderNum
        };
        httpService
          .get(settle_accounts_url, pay_params)
          .then(function(data) {
            //生成订单后立即支付
            self.closePaySheet();
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: data.paySign.appId,
                timeStamp: data.paySign.timeStamp,
                nonceStr: data.paySign.nonceStr,
                package: data.paySign.package,
                signType: data.paySign.signType,
                paySign: data.paySign.paySign
              },
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  //self.comfirm('支付成功', self.remove);
                  self.payWeixinMsg = "支付成功";
                  Indicator.open();
                  self.payWeixin_result = 1;
                  setTimeout(function(argument) {
                    Indicator.close();
                    self.payWeixin_resultPop = 1; //展示支付结果弹出框
                  }, 2000);
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  self.payWeixinMsg = "取消支付";
                  self.payWeixin_result = 2;
                  self.payWeixin_resultPop = 1; //展示支付结果弹出框
                } else {
                  self.payWeixinMsg = "支付失败";
                  self.payWeixin_result = 3;
                  self.payWeixin_resultPop = 1; //展示支付结果弹出框
                }
              }
            );
          })
          .catch(function(data) {
            if (data && (data.msg || data.message)) {
              Toast(data.msg || data.message);
            }
          });
      } else {
        console.log("选择余额支付");

        MessageBox.prompt('请输入支付密码', '', {
          inputType: 'password'
        }).then(({ value, action }) => {
          if (action === 'confirm') {
            httpService.post(httpServiceUrl.payOrder, {
              user_id: window.wxUserData.user_id,
              order_num: this.getOrderNum,
              pay_password: value
            }).then(res => {
              Toast("支付成功");
              // 跳转到列表页面
              let getParams = {
                hashUrl: "orderIndex",
                getThis: this
              };
              goUrl(getParams);
            }).catch(err => {
              Toast(err.msg || '余额支付失败');
            });
          }
        });
      }
    },

    //点击支付结果的确认框
    afterPayWeiXin: function() {
      this.payWeixinMsg = "";
      this.payWeixin_resultPop = 0; //支付结果弹出框消失
      if (this.payWeixin_result == 1) {
        //支付成功
        //处理返回刷新
        //window.history.go(-1);
        var getParams = {
          hashUrl: "orderIndex",
          getThis: this
        };
        goUrl(getParams);
      }
      this.payWeixin_result = 0; //支付结果重置
    }
  }
};
</script>
