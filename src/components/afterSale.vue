<template>
  <div class="after-sale box">
    <div class="after-sale-content">
      <div class="order-info border-bottom-1px flex">
        <span class="order-num">订单编号: {{orderNum}}</span>
        <span class="order-time">下单时间：{{createTime}}</span>
      </div>
      <div class="reason-section">
        <h5 class="title">售后原因</h5>
        <textarea class="reason-area box" v-model="reason" @input="reasonChange(reason)"></textarea>
        <div class="num-count flex">
          <span class="num">{{reasonNum}}/{{maxReasonLength}}</span>
        </div>
      </div>
    </div>
    <div class="submit-btn flex-centers" @click="submit">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/afterSale.scss'
import httpService from '../common/httpService';
import httpServiceUrl from '../common/httpServiceUrl';
  export default {
    name: "after-sale",
    data(){
      return {
        orderId: Request('orderId'),
        orderNum: Request('orderNum'),
        createTime: decodeURIComponent(Request('createTime')),
        reason: '',
        reasonNum: 0,
        maxReasonLength: 50
      }
    },
    methods: {
      reasonChange(reason){
        reason = reason.substring(0, this.maxReasonLength);
        this.reasonNum = reason.length;
      },
      submit(){
        let params = {
          user_id: window.wxUserData.user_id,
          order_id: this.orderId,
          content: this.reason
        };

        httpService.post(httpServiceUrl.applyAfterSale, params).then(res => {
          Toast('申请售后成功');
          setTimeout(() => {
            // 跳转到订单列表页面
            let getParams = {
              hashUrl: "orderIndex",
              getThis: this
            };
            goUrl(getParams);            
          }, 1500);
        }).catch(err => {
          Toast(err.msg || '申请售后失败');
        })
      }
    }
  }
</script>

<style scoped>

</style>
