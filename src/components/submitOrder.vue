<template>
  <div class="submit-order box">
    <div class="user-info flex-mid box">
      <div class="user-info-section">
        <span class="user-location">紫金学院A4-208</span>
        <div class="user-base-info">
          <span class="user-name">苏(女士)</span>
          <span class="user-tell">173****6650</span>
        </div>
      </div>
      <img src="../assets/icon_arrow.png" class="arrow-icon">
    </div>
    <div class="order-survey">
      <div class="survey-line flex-mid">
        <span class="survey-name">衣服数量</span>
        <span class="survey-val">2</span>
      </div>
      <div class="survey-line flex-mid border-bottom-1px">
        <span class="survey-name">洗衣袋数量</span>
        <span class="survey-val">2</span>
      </div>
      <div class="survey-line flex-mid border-bottom-1px"
        @click="showTicketSheet">
        <span class="survey-name">商家卡券</span>
        <div class="survey-line-right flex-mid">
          <span class="reduce-money">- ¥10.00</span>
          <img src="../assets/icon_arrow.png" class="arrow-icon">
        </div>
      </div>
      <div class="survey-line flex only-right border-bottom-1px">
        <div class="survey-line-right flex-mid">
          <span class="total">小计</span>
          <span class="reduce-money">¥14.00</span>
        </div>
      </div>
    </div>
    <div class="remark survey-line flex-mid">
      <span class="survey-name">备注</span>
      <div class="survey-line-right flex-mid">
        <span class="no-remark">暂无备注</span>
        <img src="../assets/icon_arrow.png" class="arrow-icon">
      </div>
    </div>

    <div class="total-cart flex-mid">
      <div class="total-money-section flex box">
        <div class="reduce-section">
          <span>已优惠¥10</span>
        </div>
        <div class="total-bar flex-mid">
          <span class="title">合计</span>
          <span class="money">¥14.00</span>
        </div>
      </div>
      <span class="order-btn flex-centers" @click.stop="showPaySheet">立即下单</span>
    </div>

    <!--使用卡券遮罩选择-->
    <widget-mask-sheet
      :title="ticketUseSheet.title"
      :visible="ticketUseSheet.visible"
      :close="closeTicketSheet"
      :maskClick="ticketSheetClick">
        <div class="ticket-list box">
          <div class="ticket-item border-bottom-1px flex-mid" @click="ticketToggle">
            <span class="ticket-name">¥10.00 洗衣代金券</span>
            <span class="check" v-if="!ticketChecked"><img src="../assets/check@2x.png"></span>
            <span class="check" v-else><img src="../assets/checked@2x.png"></span>
          </div>
        </div>
    </widget-mask-sheet>

    <!--支付方式遮罩选择-->
    <widget-mask-sheet
      :title="payTypeSheet.title"
      :visible="payTypeSheet.visible"
      :close="closePaySheet"
      :maskClick="paySheetClick"
      @do="dadasd">
      <div class="ticket-list box">
        <div class="ticket-item border-bottom-1px flex-mid" @click="ticketToggle">
          <span class="ticket-name">微信支付</span>
          <span class="check" v-if="!ticketChecked"><img src="../assets/check@2x.png"></span>
          <span class="check" v-else><img src="../assets/checked@2x.png"></span>
        </div>
        <div class="ticket-item border-bottom-1px flex-mid" @click="ticketToggle">
          <span class="ticket-name">余额支付</span>
          <span class="check" v-if="!ticketChecked"><img src="../assets/check@2x.png"></span>
          <span class="check" v-else><img src="../assets/checked@2x.png"></span>
        </div>
      </div>
    </widget-mask-sheet>
  </div>
</template>

<script>
  import '@/scss/submitOrder.scss'
  import widgetMaskSheet from './widget/widgetMaskSheet'
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
          title: '选择支付方式'
        },
        ticketChecked: false
      }
    },
    methods: {
      showTicketSheet () {
        this.ticketUseSheet.visible = true;
      },
      closeTicketSheet () {
        this.ticketUseSheet.visible = false;
      },
      ticketSheetClick () {
        this.ticketUseSheet.visible = false;
      },
      ticketToggle () {
        this.ticketChecked = !this.ticketChecked;
      },
      showPaySheet () {
        this.payTypeSheet.visible = true;
      },
      closePaySheet () {
        this.payTypeSheet.visible = false;
      },
      paySheetClick () {
        this.payTypeSheet.visible = false;
      }
    }
  }
</script>
