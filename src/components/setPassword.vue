<template>
  <div class="set-password">
    <div class="verification-code box">

      <div class="phone-code border-bottom-1px flex-mid" style="margin-bottom: 2.0rem;">
        <span class="label">请输入密码</span>
        <input type="password" placeholder="请输入密码" v-model="password" class="phone-number">
      </div>

      <div class="phone-code border-bottom-1px flex-mid">
        <input type="number" placeholder="请输入手机号" v-model="phoneNumer" class="phone-number">
        <span @click="getCode" class="get-code">{{getCodeText}}</span>
      </div>
      <div class="codes flex-centers">
        <div class="code-item">
          <input type="number" v-model="vals.val1" class="code-input" ref="val1" @input="foucsChange(1)">
        </div>
        <div class="code-item">
          <input type="number" v-model="vals.val2" class="code-input" ref="val2" @input="foucsChange(2)">
        </div>
        <div class="code-item">
          <input type="number" v-model="vals.val3" class="code-input" ref="val3" @input="foucsChange(3)">
        </div>
        <div class="code-item">
          <input type="number" v-model="vals.val4" class="code-input" ref="val4" @input="foucsChange(4)">
        </div>
        <div class="code-item">
          <input type="number" v-model="vals.val5" class="code-input" ref="val5" @input="foucsChange(5)">
        </div>
        <div class="code-item">
          <input type="number" v-model="vals.val6" class="code-input" ref="val6">
        </div>
      </div>

      <div class="confirm-btn flex-centers" @click="submitChange">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/setPassword.scss';
  import httpServiceUrl from "../common/httpServiceUrl";
  import httpService from "../common/httpService";
  export default {
    name: "set-password",
    data () {
      return {
        getCodeText: '获取验证码',
        phoneNumer: '',
        timer: null,
        totalTime: 900,
        vals: {
          val1: '',
          val2: '',
          val3: '',
          val4: '',
          val5: '',
          val6: ''
        },
        password: ''
      }
    },
    methods: {
      getCode () {
        if (!/^1\d{10}$/.test(this.phoneNumer)){
          Toast('请输入正确的电话号码');
          return;
        } else {
          httpService.post(httpServiceUrl.getCode, {
            telephone: this.phoneNumer,
            type: 2
          }).then(res => {
            Toast('发送验证码成功');
            this.foucsChange(0);
            this.timer = setInterval(() => {
              this.getCodeText = this.totalTime + 's';
              --this.totalTime;
              if (this.totalTime <= 0) {
                this.getCodeText = '获取验证码';
                clearInterval(this.timer);
              }
            }, 1000);
          }).catch(err => {
            Toast(err.msg || '发送验证码失败');
          })
        }
      },
      foucsChange (foucsNum) {
        this.$refs['val' + (foucsNum + 1)].focus();
      },
      submitChange () {
        let v = this.vals;
        let code = v.val1 + v.val2 + v.val3 + v.val4 + v.val5 + v.val6;

        if (!code) {
          Toast('请输入获取到的验证码!');
          return;
        }

        if (!this.password) {
          Toast('请输入设置的密码!');
          return;
        }

        let params = {
          user_id: window.wxUserData.user_id,
          code: code,
          password: this.password
        };

        httpService.post(httpServiceUrl.setPayPassword, params).then(res => {
          Toast('设置支付密码成功');
          setTimeout(() => {
            let goUrlParam = {
              "hashUrl": 'userInfo',
              "getThis": this
            };
            goUrl(goUrlParam); 
          }, 1500);
        }).catch(err => {
          Toast(err.msg || '设置支付密码失败');
        })
      }
    }
  }
</script>

<style scoped>

</style>
