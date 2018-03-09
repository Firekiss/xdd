<template>
  <div class="apply-sender box">
    <div class="user-info">
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">身份证号码<span class="must">*</span></span>
        <input type="number" class="info-input" placeholder="请输入你的身份证号码">
      </div>
      <div class="list-item flex-mid">
        <span class="label">名字<span class="must">*</span></span>
        <input type="text" class="info-input" placeholder="请填写您的真实姓名">
      </div>
    </div>
    <div class="level-select">
      <mt-radio
        v-model="value"
        :options="options">
      </mt-radio>
    </div>
    <div class="submit-btn flex-centers">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Radio } from 'mint-ui';
  import '@/scss/applySender.scss';

  Vue.component(Radio.name, Radio);
  export default {
    name: "apply-sender",
    data () {
      return {
        options: [
          {
            label: '初级（楼层）',
            value: '0'
          },
          {
            label: '中级（学校）',
            value: '1'
          },
          {
            label: '高级（区域）',
            value: '2'
          },
          {
            label: '市级（市）',
            value: '3'
          }
        ],
        value: ''
      }
    }
  }
</script>
