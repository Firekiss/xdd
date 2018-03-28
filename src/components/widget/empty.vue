<template>
  <div class="empty">
    <div class="img-wrapper">
      <img src="../../assets/empty@2x.png">
    </div>
    <p class="tip">{{tip}}</p>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: '暂无相关数据'
    }
  }
}
</script>

<style lang="scss">
.empty{
  margin-top: 2.22rem;
  text-align: center;

  img{
    width: 7.8rem;
    height: 6.5rem;
  }

  .tip{
    font-size: .8rem;
    color: #999999;
  }
}
</style>
