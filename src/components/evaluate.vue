<template>
  <div class="evaluate box">
    <div class="evaluate-content-wrap box">
      <div class="goods-clerk border-bottom-1px">
        <div class="header flex-mid">
          <span class="title">收货员</span>
        </div>
        <textarea :placeholder="placeholder" class="reason-area box"></textarea>
        <div class="num-count flex">
          <span class="num">0/50</span>
        </div>
      </div>
    </div>
    <div class="evaluate-content-wrap box" style="padding-bottom: 1.0rem">
      <div class="goods-clerk">
        <div class="header flex-mid">
          <span class="title">配送员</span>
        </div>
        <textarea :placeholder="placeholder" class="reason-area box"></textarea>
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
  import '@/scss/evaluate.scss'
  export default {
    name: "evaluate",
    data () {
      return {
        placeholder: '服务您是否满意，说说您的心得，分享给大家呗~'
      }
    }
  }
</script>

<style scoped>

</style>
