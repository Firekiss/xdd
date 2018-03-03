<template>
  <div class="settings">
    <div class="settings-list">
      <div class="list-item border-bottom-1px flex-mid">
        <div class="list-item-left flex">
          <span class="item-name">
            个人信息
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item flex-mid">
        <div class="list-item-left flex">
          <span class="item-name">
            设置支付密码
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
    </div>
    <div class="login-out flex-centers">
      <span>退出登录</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/settings.scss'
  export default {
    name: "settings",
    data () {
      return {
        arrow: require('../assets/icon_arrow.png')
      }
    },
  }
</script>

<style scoped>

</style>
