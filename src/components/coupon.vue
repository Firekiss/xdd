<template>
  <div class="coupon">
    <div class="coupon-item flex-mid box use-coupon">
      <div class="coupon-info">
        <div class="coupon-val-name">
          <span class="val">¥<span class="money">6</span>元 </span>
          <span class="coupon-name">洗衣抵用券</span>
        </div>
        <div class="valid-time">
          <span>2018.01.20 - 2018.02.20</span>
        </div>
      </div>
      <div class="use">
        <span class="use-name">立即使用</span>
      </div>
    </div>
    <div class="coupon-item flex-mid box pass-coupon">
      <div class="coupon-info">
        <div class="coupon-val-name">
          <span class="val">¥<span class="money">6</span>元 </span>
          <span class="coupon-name">洗衣抵用券</span>
        </div>
        <div class="valid-time">
          <span>2018.01.20 - 2018.02.20</span>
        </div>
      </div>
      <div class="use">
        <span class="use-name">已使用</span>
      </div>
    </div>
    <div class="coupon-item flex-mid box used-coupon">
      <div class="coupon-info">
        <div class="coupon-val-name">
          <span class="val">¥<span class="money">6</span>元 </span>
          <span class="coupon-name">洗衣抵用券</span>
        </div>
        <div class="valid-time">
          <span>2018.01.20 - 2018.02.20</span>
        </div>
      </div>
      <div class="use">
        <span class="use-name">已过期</span>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/coupon.scss';
  export default {
    name: "coupon"
  }
</script>
