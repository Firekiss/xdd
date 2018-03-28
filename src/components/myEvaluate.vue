<template>
  <div class="my-evaluate">
    <div class="evaluate-item box">
      <div class="order-info flex-mid">
        <span class="order-num">订单编号: 12398564</span>
        <span class="order-time">2018-02-01</span>
      </div>
      <star-level></star-level>
      <p class="evaluates">
        小哥来的很快，服务周到，非常满意~五星好评，满分~小哥来的很快，服务周到，非常满意~五星好评，满分~
      </p>
    </div>
    <div class="evaluate-item box">
      <div class="order-info flex-mid">
        <span class="order-num">订单编号: 12398564</span>
        <span class="order-time">2018-02-01</span>
      </div>
      <star-level></star-level>
      <p class="evaluates">
        小哥来的很快，服务周到，非常满意~五星好评，满分
      </p>
    </div>
  </div>
</template>

<script>
  import starLevel from '../components/widget/starLevel.vue';
  import '@/scss/myEvaluate.scss';

  export default {
    name: "my-evaluate",
    components: {
      starLevel
    }
  }
</script>

<style scoped>

</style>
