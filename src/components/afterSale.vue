<template>
  <div class="after-sale box">
    <div class="after-sale-content">
      <div class="order-info border-bottom-1px flex">
        <span class="order-num">订单编号: 12398564</span>
        <span class="order-time">下单时间：2018-02-01 08:20</span>
      </div>
      <div class="reason-section">
        <h5 class="title">售后原因</h5>
        <textarea class="reason-area box"></textarea>
        <div class="num-count flex">
          <span class="num">0/50</span>
        </div>
      </div>
    </div>
    <div class="submit-btn flex-centers">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/afterSale.scss'
  export default {
    name: "after-sale"
  }
</script>

<style scoped>

</style>
