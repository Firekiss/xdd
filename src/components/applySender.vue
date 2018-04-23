<template>
  <div class="apply-sender box">
    <div class="user-info">
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">身份证号码<span class="must">*</span></span>
        <input type="text" class="info-input" v-model="id_num" placeholder="请输入你的身份证号码">
      </div>
      <div class="list-item flex-mid">
        <span class="label">名字<span class="must">*</span></span>
        <input type="text" class="info-input" v-model="id_name" placeholder="请填写您的真实姓名">
      </div>
    </div>
    <div class="level-select">
      <mt-radio
        v-model="rub_type"
        :options="options">
      </mt-radio>
    </div>
    <div class="submit-btn flex-centers" @click="submit">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Radio } from 'mint-ui';
  import '@/scss/applySender.scss';
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';

  Vue.component(Radio.name, Radio);
  export default {
    name: "apply-sender",
    data () {
      return {
        options: [
          {
            label: '初级（楼层）',
            value: 1
          },
          {
            label: '中级（学校）',
            value: 2
          },
          {
            label: '高级（区域）',
            value: 3
          }
        ],
        type: Request('type'),
        rub_type: '',
        id_num: '',
        id_name: ''
      }
    },
    methods: {
      submit () {
        if (!this.verifyIDCard(this.id_num)) {
          Toast('请输入正确的身份证号码');
          return;
        }

        if (!this.id_name) {
          Toast('请输入姓名');
          return;
        }

        if (this.rub_type === '') {
          Toast('请选择等级');
          return;
        }

        httpService.post(httpServiceUrl.applyToRubber, {
          user_id: window.wxUserData.user_id,
          id_num: this.id_num,
          id_name: this.id_name,
          rub_type: this.rub_type
        }).then(res => {
          // 申请成功给出管理员审核提示之后返回用户中心
          Toast("申请成功，请等待管理员审核");
          setTimeout(() => {
            let url = this.type === 'rob' ? 'sendUserInfo' : 'userInfo'
            let goUrlParam = {
              hashUrl: url,
              getThis: this
            };
            goUrl(goUrlParam);
          }, 2000);
        }).catch(err => {
          Toast(err.msg);
        })
      },
      // 验证二代身份证
      verifyIDCard (cardNumber) {
        let idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return idCardRegex.test(cardNumber);
      }
    }
  }
</script>
