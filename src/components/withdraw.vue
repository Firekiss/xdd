<template>
  <div class="withdraw box">
    <p class="notice box">注意：提现金额＞200时，可转入支付宝；金额≤200时，自动提现到余额。</p>
    <div class="title"><span>提现金额</span></div>
    <div class="money-section">
      <div class="money-main flex-mid box border-bottom-1px">
        <span>¥</span>
        <input type="number" class="money-val">
      </div>
    </div>
    <div class="balance flex-mid box"><span>您的账户余额¥380.00</span></div>
    <div class="pay-section box">
      <div class="pay-item border-bottom-1px">
        <div class="name"><span>支付宝账号</span></div>
        <div class="pay-content flex-mid">
          <input type="text" placeholder="请填写支付宝账号" class="pay-val">
          <span class="clear"></span>
        </div>
      </div>
      <div class="pay-item border-bottom-1px" style="margin-top: 1.0rem">
        <div class="name"><span>支付宝姓名</span></div>
        <div class="pay-content flex-mid">
          <input type="text" placeholder="请填写支付宝姓名" class="pay-val">
          <span class="clear"></span>
        </div>
      </div>
    </div>
    <div class="next-btn flex-centers"><span>提现到余额</span></div>
  </div>
</template>

<script>
  import '@/scss/withdraw.scss';
  export default {
    name: "withdraw"
  }
</script>

<style scoped>

</style>
