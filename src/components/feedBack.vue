<template>
    <div class="feedback">
      <textarea 
      class="feedback-area" 
      placeholder="我的建议是......"
      v-model="advice"></textarea>
      <div class="submit-btn flex-mid" @click="submit">
        <span>提交</span>
      </div>
    </div>
</template>

<script>
  import '@/scss/feedback.scss'
import httpService from '../common/httpService';
import httpServiceUrl from '../common/httpServiceUrl';
  export default {
    name: "feed-back",
    data () {
      return {
        advice: ''
      }
    },
    methods: {
      submit () {
        if (!this.advice) {
          Toast('请先输入意见内容');
          return;
        }

        httpService.post(httpServiceUrl.userAdvice, {
          user_id: window.wxUserData.user_id,
          content: this.advice
        }).then(res => {
          Toast('意见提交成功');
          // 成功提交之后跳转到用户个人中心
          setTimeout(() => {
            let goUrlParam = {
              hashUrl : 'userInfo',
              getThis: this
            };
            goUrl(goUrlParam);
          }, 1500);
        }).catch(err => {
          Toast(err.msg || '意见提交失败');
        })
      }
    }
  }
</script>

<style scoped>

</style>
