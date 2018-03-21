<template>
  <div class="coupon">
    <div class="wrapper">
      <div class="coupon-item flex-mid box use-coupon"
        :class="{'pass-coupon': coupon.is_timed === 1, 'used-coupon': coupon.is_used === 1}"
        v-for="coupon in coupleList"
        :key="coupon.couple_id">
        <div class="coupon-info">
          <div class="coupon-val-name">
            <span class="val">¥<span class="money">{{coupon.couple_value}}</span>元 </span>
            <span class="coupon-name">洗衣抵用券</span>
          </div>
          <div class="valid-time">
            <span>{{coupon.start_time}} - {{coupon.end_time}}</span>
          </div>
        </div>
        <div class="use">
          <span class="use-name" v-if="coupon.is_timed === 0 && coupon.is_used === 0">立即使用</span>
          <span class="use-name" v-if="coupon.is_used === 0">已使用</span>
          <span class="use-name" v-if="coupon.is_timed === 0">已过期</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/coupon.scss';
  import httpService from "../common/httpService";
  import httpServiceUrl from "../common/httpServiceUrl";
  import '../common/iscroll';

  export default {
    name: "coupon",
    data () {
      return {
        // 优惠券列表
        coupleList: [],
        scroller: {}
      }
    },
    mounted () {
      this.getCouponList();
      this.scroller = new IScroll('.coupon');
    },
    methods: {
      // 获取优惠券列表
      getCouponList () {
        httpService.get(httpServiceUrl.userCoupleList, {
          user_id: window.wxUserData.user_id,
          type: 2
        }).then(res => {
          this.coupleList = res.userCoupleItems;
          // 渲染数据后刷新模拟滚动
          this.$nextTick(() => {
            this.scroller.refresh();
          })
        }).catch(err => {
          Toast(err.msg);
        })
      },

    }
  }
</script>
