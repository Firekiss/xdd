<template>
  <div class="set-password">
    <div class="verification-code box">
      <div class="phone-code border-bottom-1px flex-mid">
        <input type="text" placeholder="请输入手机号" class="phone-number">
        <span class="get-code">获取验证码</span>
      </div>
      <div class="codes flex-centers">
        <div class="code-item">
          <input type="text" class="code-input" value="1">
        </div>
        <div class="code-item active">
          <input type="text" class="code-input" value="3">
        </div>
        <div class="code-item">
          <input type="text" class="code-input">
        </div>
        <div class="code-item">
          <input type="text" class="code-input">
        </div>
        <div class="code-item">
          <input type="text" class="code-input">
        </div>
        <div class="code-item">
          <input type="text" class="code-input">
        </div>
        <div class="code-item">
          <input type="text" class="code-input">
        </div>
      </div>
      <div class="confirm-btn flex-centers">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/setPassword.scss';
  export default {
    name: "set-password"
  }
</script>

<style scoped>

</style>
