<template>
  <div class="submit-order box">
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
          <span class="reduce-money">¥{{realityMoney}}</span>
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
          <span class="money">¥{{realityMoney}}</span>
        </div>
      </div>
      <span class="order-btn flex-centers" @click.stop="createOrder">立即下单</span>
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
  </div>
</template>

<script>
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';
  import '@/scss/submitOrder.scss'
  import widgetMaskSheet from './widget/widgetMaskSheet';

  export default {
    name: "submit-order",
    components: {
      widgetMaskSheet
    },
    data () {
      return {
        ticketUseSheet: {
          visible: false,
          title: '使用卡券'
        },
        payTypeSheet: {
          visible: false,
          title: '选择支付方式',
          showConfirm: true
        },
        payType: 'wxPay',
        wxUserData: window.wxUserData,
        washNumber: Number(Request('washNumber')),
        price: Request('price'),
        goodType: Number(Request('goodType')),
        ticketMoney: 0,
        ticketList: [],
        selectedTicket: {},
        mark: ''
      }
    },
    computed:{
      realityMoney () {
        let money = this.washNumber * this.price - this.ticketMoney;
        return money > 0 ? money : 0
      }
    },
    mounted () {
      // 获取当前用户未使用且未过期的优惠券列表
      this.getUserCoupleList();
    },
    methods: {
      getUserCoupleList () {
        httpService.get(httpServiceUrl.userCoupleList, {
          user_id: this.wxUserData.user_id,
          type: 1
        }).then(res => {
          this.ticketList = res.userCoupleItems;
        })
      },
      // 点击立即下单
      createOrder () {
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
          this.showPaySheet()
        })
      },
      // 点击显示优惠券弹窗
      showTicketSheet () {
        (this.ticketList.length) &&
        (this.ticketUseSheet.visible = true);
      },
      closeTicketSheet () {
        this.ticketUseSheet.visible = false;
      },
      ticketSheetClick () {
        this.ticketUseSheet.visible = false;
      },
      // 选中一张优惠券的操作
      ticketToggle (index) {
        this.ticketList.forEach((ticket, i) => {
          ticket.ticketChecked = false;
          this.$set(this.ticketList, i, ticket);
        });
        this.ticketList[index].ticketChecked = true;
        this.ticketMoney = this.ticketList[index].couple_value;
        this.selectedTicket = this.ticketList[index];
        this.$set(this.ticketList, index, this.ticketList[index]);
      },
      showPaySheet () {
        this.payTypeSheet.visible = true;
      },
      closePaySheet () {
        this.payTypeSheet.visible = false;
      },
      paySheetClick () {
        this.payTypeSheet.visible = false;
      },
      // 点击切换支付方式
      selectPayType (payType) {
        this.payType = payType;
      },
      confirmToPay () {
        if (this.payType === 'wxPay') {
          console.log('选择微信支付');
        } else {
          console.log('选择余额支付');
        }
      }
    }
  }
</script>
