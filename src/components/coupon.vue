<template>
  <div class="coupon">
    <widget-pagescroll></widget-pagescroll>
    <!--<div class="coupon-item flex-mid box use-coupon">-->
      <!--<div class="coupon-info">-->
        <!--<div class="coupon-val-name">-->
          <!--<span class="val">¥<span class="money">6</span>元 </span>-->
          <!--<span class="coupon-name">洗衣抵用券</span>-->
        <!--</div>-->
        <!--<div class="valid-time">-->
          <!--<span>2018.01.20 - 2018.02.20</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="use">-->
        <!--<span class="use-name">立即使用</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="coupon-item flex-mid box pass-coupon">-->
      <!--<div class="coupon-info">-->
        <!--<div class="coupon-val-name">-->
          <!--<span class="val">¥<span class="money">6</span>元 </span>-->
          <!--<span class="coupon-name">洗衣抵用券</span>-->
        <!--</div>-->
        <!--<div class="valid-time">-->
          <!--<span>2018.01.20 - 2018.02.20</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="use">-->
        <!--<span class="use-name">已使用</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="coupon-item flex-mid box used-coupon">-->
      <!--<div class="coupon-info">-->
        <!--<div class="coupon-val-name">-->
          <!--<span class="val">¥<span class="money">6</span>元 </span>-->
          <!--<span class="coupon-name">洗衣抵用券</span>-->
        <!--</div>-->
        <!--<div class="valid-time">-->
          <!--<span>2018.01.20 - 2018.02.20</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="use">-->
        <!--<span class="use-name">已过期</span>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import '@/scss/coupon.scss';
  import httpService from "../common/httpService";
  import httpServiceUrl from "../common/httpServiceUrl";
  import widgetPagescroll from './widget/widgetPagescroll.vue';

  export default {
    name: "coupon",
    components: {
      widgetPagescroll
    },
    data () {
      return {
        // 优惠券列表
        coupleList: [],
      }
    },
    mounted () {

    },
    methods: {
      // 获取优惠券列表
      getCouponList () {
        httpService.get(httpServiceUrl.userCoupleList, {
          user_id: window.wxUserData.user_id,
          type: 2
        }).then(res => {
          this.coupleList = res.userCoupleItems;
        })
      },

    }
  }
</script>
