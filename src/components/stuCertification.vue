<template>
  <div class="stuCertification">
    <div class="topTitle flex-mid">
      <div class="middleText">
        学生认证
      </div>
    </div>
    <div class="inputContent">
      <div class="commonLine border-bottom-1px">
        <span class="span1">姓名</span>
        <span class="mustFlow">*</span>
        <span class="span2">
                    <input type="text" placeholder="请输入姓名" class="input-row" v-model="stuParams.name">
                </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所在地区</span>
        <span class="mustFlow">*</span>
        <span class="span2">
                    <input type="text" placeholder="请选择您的所在地区" class="input-row" v-model="stuParams.address">
                </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所在学校</span>
        <span class="mustFlow">*</span>
        <span class="span2">
                    <input type="text" placeholder="请选择您的所在学校" class="input-row" v-model="stuParams.school">
                </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所在年级</span>
        <span class="span2">
                    <input type="text" placeholder="请选择您的所在学校" class="input-row" v-model="stuParams.grade">
                </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所属专业</span>
        <span class="span2">
                    <input type="text" placeholder="请选择您的所属专业" class="input-row" v-model="stuParams.professional">
                </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">详细地址</span>
        <span class="mustFlow">*</span>
        <span class="span2">
                    <input type="text" placeholder="宿舍楼号" class="input-row" v-model="stuParams.addressDetail">
                </span>
      </div>
      <div class="commonLine border-bottom-1px">
                <span class="span2">
                    <input type="text" placeholder="宿舍号" class="input-row" v-model="stuParams.addressNum">
                </span>
      </div>
      <div class="nextBut">完成</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';
  import tool from '../common/tools';
  import '../scss/stuCertification.scss';

  export default {
    data() {
      return {
        stuParams: {
          name: "",//姓名
          address: "",//所在地区
          school: "",//所在地区
          grade: "",//所在年级
          professional: "",//专业
          addressDetail: "",//宿舍楼号
          addressNum: "",//宿舍号

        },
      }
    },
    mounted: function () {

    },
    methods: {}

  }
</script>
