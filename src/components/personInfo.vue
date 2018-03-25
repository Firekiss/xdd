<template>
  <div class="person-info box">
    <div class="info-list box">
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">用户名</span>
        <input type="text" class="content" v-model="userDetail.user_name" placeholder="请填写用户名称">
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">手机号</span>
        <input type="text" class="content" v-model="userDetail.telephone" placeholder="请填写用户手机号">
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">学校楼栋编号</span>
        <span class="content house-id" @click="showHouseSheet">{{getHouseById(userDetail.house_id) || "请填写用户学校楼栋编号"}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在专业</span>
        <input type="text" class="content" v-model="userDetail.major" placeholder="请填写用户所在专业">
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在年级</span>
        <input type="text" class="content" v-model="userDetail.grade_num" placeholder="请填写用户所在年级">
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">宿舍号码</span>
        <input type="text" class="content" v-model="userDetail.room_num" placeholder="请填写用户所在宿舍号码">
      </div>
    </div>
    <div class="confirm-btn-page flex-centers" @click="updataUserInfo">
      <span>确认修改</span>
    </div>

    <!-- 学校宿舍选择组件 -->
    <widget-mask-sheet
      :visible="houseSheet.visible"
      :title="houseSheet.title"
      :showConfirm="houseSheet.showConfirm"
      :close="closeHouseSheet"
      :maskClick="houseSheetMaskClick"
      :confirm="houseSheetConfirm">
      <mt-picker :slots="houseSlots" value-key="house_num" @change="onHouseValuesChange"></mt-picker>
    </widget-mask-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import widgetMaskSheet from "./widget/widgetMaskSheet";
import "@/scss/personInfo.scss";
import httpServiceUrl from "../common/httpServiceUrl";
import httpService from "../common/httpService";
import {Picker} from 'mint-ui';

Vue.component(Picker.name, Picker);

export default {
  name: "person-info",
  components: {
    widgetMaskSheet
  },
  data() {
    return {
      userDetail: {}, //用户信息
      houseSheet: {
        visible: false,
        title: "所在宿舍楼",
        showConfirm: true
      },
      houseSlots: [
        {values: []}
      ],
      houseItems: [],
      curHouseValues: {}
    };
  },
  mounted: function() {
    this.initDetail();
  },
  methods: {
    initDetail: function() {
      var self = this;
      var personalByIdUrl = httpServiceUrl.personalById;
      var personalByIdParam = {};
      httpService
        .get(personalByIdUrl, personalByIdParam)
        .then(function(data) {
          self.userDetail = data;
          self.queryHouseList();
        })
        .catch(function(data) {
          if (data && (data.msg || data.message)) {
            Toast(data.msg || data.message);
          }
        });
    },
    // 根据宿舍id获取宿舍的名称
    getHouseById (houseId) {
      let houseItems = this.houseItems;
      for (let i = 0; i < houseItems.length; i++) {
        if (houseItems[i].house_id = houseId) {
          return houseItems[i].house_num;
        }
      }
    },
    // 查询学校内的宿舍楼列表
    queryHouseList () {
      let params = {
        school_id: this.userDetail.school_id
      };
      httpService.post(httpServiceUrl.houseList, params).then(res => {
        this.houseSlots[0].values = this.houseItems = res.houseItems;
      })
    },
    showHouseSheet () {
      this.houseSheet.visible = true;
    },
    closeHouseSheet () {
      this.houseSheet.visible = false;
    },
    // 所选宿舍楼发生改变的回调函数
    onHouseValuesChange (picker, values) {
      this.curHouseValues = values[0];
    },
    houseSheetMaskClick () {
      this.houseSheet.visible = false;
    },
    // 点击确定选择的时候
    houseSheetConfirm () {
      this.houseSheet.visible = false;
      this.userDetail.house_id = this.curHouseValues.house_id;
    },
    // 修改用户的个人信息
    updataUserInfo () {
      let u = this.userDetail;
      let params = {
        user_id: u.user_id
      };

      if (!u.user_name) {
        Toast('请填写姓名!');
        return;
      }

      if (!u.telephone) {
        Toast('请填写手机号码!');
        return;
      } else if (!/^1\d{10}$/.test(u.telephone)) {
        Toast('请填写正确格式的手机号码!');
        return;       
      }

      if (u.house_id == undefined) {
        Toast('请选择学校楼栋编号!');
        return;
      }

      if (!u.room_num) {
        Toast('请填写宿舍号码!');
        return;        
      }

      if (!u.grade_num) {
        Toast('请填写年级!');
        return;
      }

      if (!u.major) {
        Toast('请填写专业');
        return;
      }

      httpService.post(httpServiceUrl.updateUserInfo, u).then(res => {
        Toast('修改个人用户信息成功!');
        setTimeout(() => {
          let getParams = {
            hashUrl: "userInfo",
            getThis: this
          };
          goUrl(getParams);
        }, 1500);
      }, err => {
        Toast(err.msg || '修改信息失败');
      })
    }
  }
};
</script>
