<template>
  <div class="registerLogin">
    <div class="topLogo flex-centers">
      <div class="middlePic">
        <img src="../assets/logo@2x.png">
      </div>
    </div>
    <div class="inputContent">
      <div class="text1"><span>请输入手机号</span></div>
      <div class="inputText flex border-bottom-1px">
        <input type="number" placeholder="请输入手机号码" class="input-row" maxlength="11" v-model="telephoneNo">
        <img src="../assets/btn_delete.png" @click="deleteNum">
      </div>
      <div class="text1" style="margin-top: 1rem;"><span>请输入验证码</span></div>
      <div class="inputText flex border-bottom-1px">
        <input type="number" style="width: 9rem;" placeholder="请输入验证码" class="input-row" v-model="checkCode">
        <div class="getCode" v-if="!sendingCode" @click="getVerify">获取验证码</div>
        <div class="getCode" v-if="sendingCode">{{countDown}}秒后重新获取</div>
      </div>
      <div class="nextBut" @click="goNext">下一步</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';
  import tool from '../common/tools';
  import '../scss/registerLogin.scss';

  export default {
    data() {
      return {
        telephoneNo: "",//手机号
        checkCode: "",//验证码
        countDown: 60, //倒计时时间
        sendingCode: 0, //是否正在倒计时发送验证码
        phoneNumPatten: /^1\d{10}$/, //校验手机号
        invite_code: Request('invite_code'), // 邀请码
      }
    },
    mounted: function () {
    },
    methods: {
      //清空手机号
      deleteNum: function () {
        this.telephoneNo = ""
      },
      //点击获取验证码
      getVerify: function () {
        if (!this.telephoneNo) {
          Toast('手机号码不能为空！');
          return;
        }
        if (!this.telephoneNo.match(this.phoneNumPatten)) {
          Toast('手机号码输入不正确！');
          return;
        }
        var self = this;
        this.sendingCode = 1;
        var countNum = 60;
        this.countDown = countNum;
        window.clearInterval(this.tempInterval);
        this.tempInterval = setInterval(function () {
          if (countNum == 0) {
            window.clearInterval(self.tempInterval);
            self.sendingCode = 0;
            countNum = 60;
            return;
          }
          countNum -= 1;
          self.countDown = countNum;
        }, 1000);
        var getVerifyUrl = httpServiceUrl.getCode;
        var getVerifyParams = {
          telephone: this.telephoneNo,
          type: 1
        };
        this.getVerifyCode(getVerifyUrl, getVerifyParams);
      },

      //调用获取验证码的接口
      getVerifyCode: function (url, params) {
        var self = this;
        httpService.post(url, params).then(function (data) {
          Toast("验证码已发送成功，请注意查收!");
        }).catch(function (data) {
          if (data && (data.msg || data.message)) {
            Toast(data.msg || data.message);
          }
          window.clearInterval(self.tempInterval);
          self.sendingCode = 0;
          self.countDown = 60
          console.log("发送验证失败");
        });
      },
      goNext: function () {
        var self = this;
        if (!this.telephoneNo) {
          Toast('手机号码不能为空！');
          return;
        }
        if (!this.telephoneNo.match(this.phoneNumPatten)) {
          Toast('手机号码输入不正确！');
          return;
        }
        if (!this.checkCode) {
          Toast('验证码不能为空');
          return;
        }
        var firstRegisterUrl = httpServiceUrl.firstRegister;
        var firstRegisterParams = {
            telephone:this.telephoneNo,
            code:this.checkCode
        };
        httpService.get(firstRegisterUrl,firstRegisterParams).then(function(){
            var goUrlParam = {
                "hashUrl": 'stuCertification',
                "params": {
                  telephone: self.telephoneNo,
                  invite_code: self.invite_code
                },
                "getThis": self
            };
            goUrl(goUrlParam);
        }).catch(function(data){
            if (data && (data.msg || data.message)) {
              Toast(data.msg || data.message);
            }
        });

      },
    }

  }
</script>
