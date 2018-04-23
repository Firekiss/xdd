<template>
  <div class="orderIndex" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <div class="tab-row">
      <div class="myTab-item" @click="orderItemTab(item,index)" v-for="(item,index) in showTopItem">
        <div class="textCon" :class="{'onfocusColor':item.orderFocus}">{{item.name}}</div>
      </div>
    </div>
    <div class="loadmore-wrapper">
      <mt-loadmore :top-method="isRefresh" ref="loadmore">
        <div class="orderLists">
          <div v-if='orderList.length === 0'>
            <empty></empty>
          </div>
          <div class="orderItem" v-if='orderList.length!=0' v-for="item in orderList">
            <div class="line1 border-bottom-1px">
              <span class="span1">订单编号：</span>
              <span class="span2">{{item.order_num}}</span>
              <span class="span3" v-if='item.order_status==0'>未支付</span>
              <span class="span3" v-if='item.order_status==1'>已支付</span>
              <span class="span3" v-if='item.order_status==2'>已完成</span>
              <span class="span3" v-if='item.order_status==3'>已评价</span>
              <span class="span3" v-if='item.order_status==4'>售后</span>
            </div>
            <div class="line2 flex-mid border-bottom-1px" @click="goDetail(item)">
              <img class="vertical1" v-if='item.good_type==1' src="../assets/index/washer@2x.png">
              <img class="vertical1" v-if='item.good_type==2' src="../assets/index/dry_clean@2x.png">
              <img class="vertical1" v-if='item.good_type==3' src="../assets/index/wash_shoes@2x.png">
              <div class="vertical2">
                <div class="time">下单时间：{{item.create_time}}</div>
                <div class="address">送至：{{item.school_name}}{{item.house_num}}-{{item.room_num}}</div>
              </div>
              <div class="vertical3">
                <span>x{{item.good_num}}</span>
              </div>
            </div>
            <div class="line3 flex-mid">
              <div class="practical-pay">
                <span class="moneyCom">实付</span>
                <span class="moneyCom moneyColor">￥{{item.true_price}}</span>
              </div>
              <div class="tabRight flex-mid">
                  <div class="butRight flex-mid" @click.stop="afterSale(item.order_id, item.create_time, item.order_num)" v-if="(item.order_status === 1 || item.order_status === 2 || item.order_status === 3) && item.deliver_status !== 10"><span>申请售后</span></div>
                  <div class="butRight flex-mid" @click.stop="goComment(item.order_id)" v-if="item.order_status === 2 && item.deliver_status !== 10"><span>去评价</span></div>
                  <div class="butRight flex-mid red-btn" @click.stop="goToPay(item.order_id, item.order_num)" v-if="item.order_status === 0 && item.deliver_status !== 10"><span>去付款</span></div>
                  <div class="butRight flex-mid red-btn" @click.stop="comfireOrder(item.order_id)" v-if="item.order_status === 1"><span>确认收货</span></div>
                  <div class="butRight flex-mid red-btn" @click.stop="scanner(item.order_id)" v-if="item.order_status === 1 && item.deliver_status  === 2"><span>扫一扫</span></div>
                  <div class="butRight flex-mid red-btn" @click.stop="delayOrder(item.order_id)" v-if="item.deliver_status === 0 || item.deliver_status  === 1"><span>取消订单</span></div>
                  <div class="butRight flex-mid red-btn" style="border: none;" v-if="item.deliver_status === 10"><span>已取消</span></div>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import empty from "./widget/empty";
import httpServiceUrl from "../common/httpServiceUrl";
import httpService from "../common/httpService";
import tool from "../common/tools";
import Loadmore from "mint-ui/lib/loadmore";
import "../scss/orderIndex.scss";
import { MessageBox } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

export default {
  components: {
    empty
  },
  data() {
    return {
      scrollMode: 'touch',
      showTopItem: [
        {
          name: "全部",
          orderFocus: 1,
          type: 0
        },
        {
          name: "待付款",
          orderFocus: 0,
          type: 1
        },
        {
          name: "待配送",
          orderFocus: 0,
          type: 2
        },
        {
          name: "已完成",
          orderFocus: 0,
          type: 3
        },
        {
          name: "售后",
          orderFocus: 0,
          type: 4
        }
      ],
      orderListUrl: httpServiceUrl.orderList,
      orderListParam: {
        type: 0,
        user_id: window.wxUserData.user_id
      },
      orderList: [], //订单列表
      scannerOrderId: ''
    };
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    orderItemTab: function(item, index) {
      for (var i = 0; i < this.showTopItem.length; i++) {
        this.showTopItem[i].orderFocus = 0;
      }
      this.showTopItem[index].orderFocus = 1;
      this.orderListParam.type = item.type; //根据不同的type调不同的数据
      this.initData();
    },
    initData: function() {
      var self = this;
      httpService
        .get(this.orderListUrl, this.orderListParam)
        .then(function(data) {
          self.orderList = data.orderItems;
          self.$nextTick(() => {
            self.scrollMode = "touch";
            self.$refs.loadmore.onTopLoaded();
          });
        })
        .catch(function(err) {
          Toast(err.msg || '获取数据失败');
        });
    },

    // 用户获取JSSDK注入权限验证数据对象
    getErWeiCodeSign (jsapiTicket, url) {
      return httpService.post(httpServiceUrl.getErWeiCodeSign, {
        jsapi_ticket: jsapiTicket,
        url: url
      }).then(res => {
        return res;
      }).catch(err => {
        Toast(err.msg || '获取JSSDK注入权限验证数据失败');
      })
    },

    //下拉刷新
    isRefresh: function() {
      this.initData();
    },

    // 点击确认收货的发起确认收货的请求
    comfireOrder (orderId) {
      httpService.post(httpServiceUrl.confirmOrder, {
        user_id: window.wxUserData.user_id,
        order_id: orderId
      }).then(res => {
        Toast('确认完成订单成功');
        // 确认订单完成之后需要重新刷新一下列表
        this.initData();
      }).catch(err => {
        Toast(err.msg || '确认完成订单失败');
      })
    },

    //跳转到详情页
    goDetail: function(item) {
      var getParams = {
        hashUrl: "orderDetail",
        getThis: this,
        params: {
          order_id: item.order_id
        }
      };
      goUrl(getParams);
    },

    // 点击去付款跳转到付款页面准备进行付款
    goToPay (orderId, orderNum) {
      let getParams = {
        hashUrl: "submitOrder",
        getThis: this,
        params: {
          orderId: orderId,
          orderNum: orderNum
        }
      };
      goUrl(getParams);
    },

    // 点击评价前往评价页面进行评价
    goComment (orderId) {
      let getParams = {
        hashUrl: "evaluate",
        getThis: this,
        params: {
          orderId: orderId
        }
      };
      goUrl(getParams);
    },

    // 点击申请售后跳转到售后页面
    afterSale (orderId, createTime, orderNum) {
      let getParams = {
        hashUrl: "afterSale",
        getThis: this,
        params: {
          orderId,
          createTime: encodeURIComponent(createTime),
          orderNum
        }
      };
      goUrl(getParams);
    },

    // 点击扫一扫
    scanner (orderId) {
      let self = this;
      let jsapiTicket = window.jsapi_ticket;
      let url = window.location.href.split('#')[0];

      this.scannerOrderId = orderId;

      this.getErWeiCodeSign(jsapiTicket, url).then(res => {
        wx.config({
          debug: false,
          appId: 'wx950fa5385b73d05b',
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ['scanQRCode']
        })
      });

      wx.ready(function() {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            httpService.post(httpServiceUrl.scanBundOrder, {
              user_id: window.wxUserData.user_id,
              package_num: res.resultStr,
              order_id: self.scannerOrderId
            }).then(res => {
              Toast('绑定洗衣袋成功');
              // 重新刷新列表
              setTimeout(() => {
                self.initData();
              }, 1000);
            }).catch(err => {
              Toast(err.msg || '绑定洗衣袋失败')
            })
          },
          error: function(res){
            if(res.errMsg.indexOf('function_not_exist') > 0){
              alert('版本过低请升级')
            }
          }
        });
      });

      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res);
      });
    },

    // 点击取消订单
    delayOrder (orderId) {
      MessageBox.confirm('确定要取消订单?').then(action => {
        httpService.post(httpServiceUrl.delayOrder, {
          user_id: window.wxUserData.user_id,
          order_id: orderId
        })
        .then(res => {
          Toast("取消订单成功");
          // 重新刷新列表
          setTimeout(() => {
            this.initData();
          }, 1000);
        })
        .catch(err => {
          Toast(err.msg || "取消订单失败")
        });
      })
    }
  }
};
</script>
