<template>
  <div class="recharge box">
    <div class="choose-title">
      <span>请选择金额</span>
    </div>
    <div class="moneys flex">
      <div class="money-item flex-mid">
        <span>79元</span>
      </div>
      <div class="money-item flex-mid active">
        <span>79元</span>
      </div>
      <div class="money-item flex-mid">
        <span>79元</span>
      </div>
      <div class="money-item flex-mid">
        <span>79元</span>
      </div>
    </div>
    <div class="next-btn flex-centers">
      <span>下一步</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/recharge.scss'
  export default {
    name: "recharge"
  }
</script>

<style scoped>

</style>
