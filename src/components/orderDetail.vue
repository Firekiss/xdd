<template>
  <div class="order-detail box">
    <div class="base-info-wrapper box">
      <div class="user-info flex-mid border-bottom-1px" @click="showLogisticsSheet">
        <div class="user-info-wrapper flex">
          <img class="icon-car" src="../assets/orderSubmit/car_icon@2x.png">
          <div class="user-info-section">
            <span class="user-location">{{orderStatus}}</span>
            <div class="user-base-info">
              <span class="user-name" v-if="orderDetail.processItems && orderDetail.processItems.length">
                {{orderDetail.processItems[orderDetail.processItems.length - 1].process_time}}
              </span>
            </div>
          </div>
        </div>
        <img src="../assets/icon_arrow.png" class="arrow-icon">
      </div>
      <div class="user-info flex-mid box">
        <div class="user-info-wrapper flex">
          <img class="icon-address" src="../assets/orderSubmit/address_icon@2x.png">
          <div class="user-info-section">
            <span class="user-location">{{orderDetail.school_name}}{{orderDetail.house_num}}{{orderDetail.room_num}}</span>
            <div class="user-base-info">
              <span class="user-name">{{orderDetail.user_name}}</span>
              <span class="user-tell">{{orderDetail.telephone}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-survey">
      <div class="survey-line flex-mid">
        <span class="survey-name">衣服数量</span>
        <span class="survey-val">{{orderDetail.good_num}}</span>
      </div>
      <div class="survey-line flex-mid border-bottom-1px">
        <span class="survey-name">洗衣袋数量</span>
        <span class="survey-val">1</span>
      </div>
      <div class="survey-line flex-mid border-bottom-1px">
        <span class="survey-name">商家卡券</span>
        <div class="survey-line-right flex-mid">
          <span class="reduce-money">- ¥{{orderDetail.couple_value || 0}}</span>
          <!-- <img src="../assets/icon_arrow.png" class="arrow-icon"> -->
        </div>
      </div>
      <div class="survey-line flex only-right border-bottom-1px">
        <div class="survey-line-right flex-mid">
          <span class="total">小计</span>
          <span class="reduce-money">¥{{orderDetail.true_price}}</span>
        </div>
      </div>
    </div>
    <div class="remark survey-line flex-mid">
      <span class="survey-name">备注</span>
      <div class="survey-line-right flex-mid">
        <span class="no-remark" v-if="!orderDetail.mark">暂无备注</span>
        <span class="no-remark" v-if="orderDetail.mark">{{orderDetail.mark}}</span>
        <img src="../assets/icon_arrow.png" class="arrow-icon">
      </div>
    </div>

    <div class="order-info">
      <div class="order-info-item">
        <label class="order-info-name">订单编号：</label>
        <span class="order-info-val">{{orderDetail.order_num}}</span>
      </div>
      <div class="order-info-item">
        <label class="order-info-name">下单时间：</label>
        <span class="order-info-val">{{orderDetail.create_time}}</span>
      </div>
      <div class="order-info-item">
        <label class="order-info-name">付款时间：</label>
        <span class="order-info-val">{{orderDetail.pay_time || ''}}</span>
      </div>
      <div class="order-info-item">
        <label class="order-info-name">支付方式：</label>
        <span class="order-info-val"><span v-if="orderDetail.order_status !== 0">{{payType}}</span></span>
      </div>
    </div>

    <widget-mask-sheet
    :title="logisticsSheet.title"
    :visible="logisticsSheet.visible"
    :close="closeLogisticsSheet"
    :maskClick="logisticsSheetClick">
      <div class="logisticsList-wrapper box">
        <div class="logisticsList">
          <div class="logisticsList-item flex-mid"
            v-for="(item, index) in orderDetail.processItems"
            :key="index">
            <span class="time">{{item.process_time}}</span>
            <span class="circle"></span>
            <span class="detail">{{item.content}}</span>
          </div>
        </div>
      </div>
    </widget-mask-sheet>
  </div>
</template>

<script>
import "@/scss/orderDetail.scss";
import widgetMaskSheet from "./widget/widgetMaskSheet";
import httpServiceUrl from "../common/httpServiceUrl";
import httpService from "../common/httpService";
export default {
  name: "order-detail",
  components: {
    widgetMaskSheet
  },
  data() {
    return {
      logisticsSheet: {
        visible: false,
        title: "物流跟踪"
      },
      order_id: Request("order_id"),
      orderDetail: {}
    };
  },
  mounted: function() {
    this.initData();
  },
  computed: {
    payType () {
      switch (this.orderDetail.pay_type) {
        case 0:
          return '余额支付';
        case 1:
          return '微信支付';
        default:
          return '';  
      }
    },
    orderStatus () {
      switch (this.orderDetail.order_status) {
        case 0:
          return '未支付';
        case 1:
          return '已支付,配送中';
        case 2:
          return '已完成，待评价';
        case 3:
          return '已评价';
        case 4:
          return '售后';    
      }
    }
  },
  methods: {
    initData: function() {
      httpService
        .post(httpServiceUrl.orderDetail, {
          order_id: this.order_id
        })
        .then(data => {
          this.orderDetail = data;
          console.log(this.orderDetail);
        })
        .catch(err => {
          Toast(err.msg || "获取订单详情失败");
        });
    },
    showLogisticsSheet() {
      this.logisticsSheet.visible = true;
    },
    closeLogisticsSheet() {
      this.logisticsSheet.visible = false;
    },
    logisticsSheetClick() {
      this.logisticsSheet.visible = false;
    }
  }
};
</script>
