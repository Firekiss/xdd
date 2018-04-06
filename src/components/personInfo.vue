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
        <span class="label">所在地区</span>
        <span class="content house-id" @click="showAreaSheet">{{userDetail.province + userDetail.city + userDetail.area}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在学校</span>
        <span class="content house-id" @click="showSchoolSheet">{{userDetail.school_name || "请选择用户学校"}}</span>
      </div> 
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">学校楼栋编号</span>
        <span class="content house-id" @click="showHouseSheet">{{userDetail.house_num || "请选择用户学校楼栋编号"}}</span>
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

    <!-- 地区选择组件 -->
    <widget-mask-sheet
      :visible="areaSheet.visible"
      :title="areaSheet.title"
      :showConfirm="areaSheet.showConfirm"
      :close="closeAreaSheet"
      :maskClick="areaSheetMaskClick"
      :confirm="areaSheetConfirm">
      <mt-picker :slots="areaSlots" value-key="name" @change="onAreaValuesChange"></mt-picker>
    </widget-mask-sheet>

    <!-- 学校选择组件 -->
    <widget-mask-sheet
      :visible="schoolSheet.visible"
      :title="schoolSheet.title"
      :showConfirm="schoolSheet.showConfirm"
      :close="closeSchoolSheet"
      :maskClick="schoolSheetMaskClick"
      :confirm="schoolSheetConfirm">
      <mt-picker :slots="schoolSlots" value-key="school_name" @change="onSchoolValuesChange"></mt-picker>
    </widget-mask-sheet>

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
import Vue from "vue";
import widgetMaskSheet from "./widget/widgetMaskSheet";
import "@/scss/personInfo.scss";
import httpServiceUrl from "../common/httpServiceUrl";
import httpService from "../common/httpService";
import { Picker } from "mint-ui";

Vue.component(Picker.name, Picker);

export default {
  name: "person-info",
  components: {
    widgetMaskSheet
  },
  data() {
    return {
      // 用户个人信息
      userDetail: {},
      // 地区选择框配置
      areaSheet: {
        visible: false,
        title: "地区选择",
        showConfirm: true
      },
      // 学校选择框配置
      schoolSheet: {
        visible: false,
        title: "学校选择",
        showConfirm: true
      },
      // 宿舍选择框配置
      houseSheet: {
        visible: false,
        title: "宿舍选择",
        showConfirm: true
      },
      // 地区选择插槽配置
      areaSlots: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        },
        {
          divider: true,
          content: "-"
        },
        {
          flex: 1,
          values: [],
          textAlign: "center"
        },
        {
          divider: true,
          content: "-"
        },
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ],
      // 地区级别 的 `省` `市` `区`数据列表
      areaTypeData: [],
      // 省市区id值列表
      areaIds: [],
      // 地区选择组件此时选中的数据
      areaPickerVals: [],
      // 学校选择组件的插槽组件数据
      schoolSlots: [{ values: [] }],
      // 宿舍选择组件的插槽组件数据
      houseSlots: [{ values: [] }],
      // 当前选择的学校对象数据
      schoolPickerVals: {},
      houseItems: [],
      // 当前选中的宿舍头对象数据
      curHouseValues: {}
    };
  },
  mounted: function() {
    // 获取个人信息
    this.initDetail();
    // 获取默认省市区的数据
    this.queryDefaultAreaData();
  },
  methods: {
    // 初始化获取用户的信息
    initDetail: function() {
      var self = this;
      var personalByIdUrl = httpServiceUrl.personalById;
      var personalByIdParam = {
        user_id: window.wxUserData.user_id
      };
      httpService
        .get(personalByIdUrl, personalByIdParam)
        .then(function(data) {
          self.userDetail = data;
        })
        .catch(function(data) {
          if (data && (data.msg || data.message)) {
            Toast(data.msg || data.message);
          }
        });
    },

    // 查询省市区的数据
    queryArea (type, other_id) {
      let params = {
        type
      };

      if (other_id !== undefined) {
        params.other_id = other_id;
      }
      return httpService.get(httpServiceUrl.areaList, params).then(res => {
        let areaData = [];
        res.otherItems.forEach(item => {
          areaData.push({
            id: item.other_id,
            name: item.other_name
          });
        });
        // 地区选择组件数据赋值
        this.areaSlots[(type - 1) * 2].values = this.areaTypeData[type - 1] = areaData;
      });
    },
    
    // 查询默认地区数据
    queryDefaultAreaData () {
      this.queryArea(1).then(() => {
        this.areaIds[0] = this.areaTypeData[0][0].id;
        return this.queryArea(2, this.areaIds[0]);
      }).then(() => {
        this.areaIds[1] = this.areaTypeData[1][0].id;
        return this.queryArea(3, this.areaIds[1]);
      }).then(() => {
        this.areaIds[2] = this.areaTypeData[2][0].id;
      })
    },

    // 显示地区选择组件
    showAreaSheet() {
      this.areaSheet.visible = true;
    },

    // 隐藏地区选择组件
    closeAreaSheet () {
      this.areaSheet.visible = false
    },
    
    // 地区选择组件遮罩层点击
    areaSheetMaskClick () {
      this.areaSheet.visible = false;
    },

    // 确定选择区域
    areaSheetConfirm () {
      this.userDetail.province = this.areaPickerVals[0].name;
      this.userDetail.city = this.areaPickerVals[1].name;
      this.userDetail.area = this.areaPickerVals[2].name;
      // 清空学校的数据选择
      this.userDetail.school_name = '';
      this.userDetail.school_id = '';
      // 清空宿舍楼的数据选择
      this.userDetail.house_id = '';
      this.userDetail.house_num = '';
      // 关闭地区选择器
      this.areaSheet.visible = false;
    },

    // 省的选择发生了改变
    // 请求新的省下面的市和区的数据
    changeProvince (provinceId) {
      return this.queryArea(2, provinceId).then(() => {
        return this.queryArea(3, this.areaTypeData[1][0].id);
      });
    },

    // 修改城市之后
    // 重新请求该城市下面的区的数据
    changeCity (cityId) {
      return this.queryArea(3, cityId)
    },

    // 修改了地区的回调函数
    onAreaValuesChange (picker, values) {
      this.areaPickerVals = values;
      // 遍历比较省和市的数据是否发生了改变
      for(let i = 0; i < values.length; i++) {
        if (values[i] && values[i].id !== this.areaIds[i]) {
          // 省的选择发生了改变
          if (i === 0) {
            this.changeProvince(values[i].id).then(() => {
              this.areaIds[i] = values[i].id;
            });
          // 市的选择发生了改变
          } else if (i === 1) {
            this.changeCity(values[i].id).then(() => {
              this.areaIds[i] = values[i].id;
            });
          }
        }
      }
    },

    // 查询区域内的学校列表
    querySchoolList () {
      let params = {
        province: this.userDetail.province,
        city: this.userDetail.city,
        area: this.userDetail.area
      };
      return httpService.post(httpServiceUrl.schoolList, params).then(res => {
        this.schoolSlots[0].values = res.schoolItems;
      })
    },

    // 显示学校选择组件
    showSchoolSheet () {
      this.querySchoolList().then(() => {
        // 学校列表数据请求成功之后显示学校列表弹窗
        this.schoolSheet.visible = true;
      })
    },

    // 隐藏学校选择组件
    closeSchoolSheet () {
      this.schoolSheet.visible = false;
    },

    // 学校遮罩层点击
    schoolSheetMaskClick () {
      this.schoolSheet.visible = false;
    },

    // 学校点击确认
    schoolSheetConfirm () {
      this.userDetail.school_id = this.schoolPickerVals.school_id;
      this.userDetail.school_name = this.schoolPickerVals.school_name;
      // 确认选择学校之后 重置已经选择的宿舍楼
      this.userDetail.house_id = '';
      this.userDetail.house_num = '';
      this.schoolSheet.visible = false;
    },

    // 学校选择发生改变的时候
    onSchoolValuesChange (picker, values) {
      this.schoolPickerVals = values[0];
    },

    // 根据宿舍id获取宿舍的名称
    getHouseById(houseId) {
      let houseItems = this.houseItems;
      for (let i = 0; i < houseItems.length; i++) {
        if ((houseItems[i].house_id = houseId)) {
          return houseItems[i].house_num;
        }
      }
    },
    // 查询学校内的宿舍楼列表
    queryHouseList() {
      let params = {
        school_id: this.userDetail.school_id
      };
      return httpService.post(httpServiceUrl.houseList, params).then(res => {
        this.houseSlots[0].values = this.houseItems = res.houseItems;
      });
    },

    // 点击显示学校宿舍楼列表
    showHouseSheet() {
      if (this.userDetail.school_id === '') {
        Toast('请先学校学校');
        return;
      } else {
        this.queryHouseList().then(() => {
          this.houseSheet.visible = true;
        })
      }
    },

    // 隐藏宿舍选择组件
    closeHouseSheet() {
      this.houseSheet.visible = false;
    },

    // 所选宿舍楼发生改变的回调函数
    onHouseValuesChange(picker, values) {
      this.curHouseValues = values[0];
    },

    // 宿舍楼遮罩点击
    houseSheetMaskClick() {
      this.houseSheet.visible = false;
    },

    // 点击确定选择的时候
    houseSheetConfirm() {
      this.userDetail.house_id = this.curHouseValues.house_id;
      this.userDetail.house_num = this.curHouseValues.house_num;
      this.houseSheet.visible = false;
    },

    // 修改用户的个人信息
    updataUserInfo() {
      let u = this.userDetail;
      let params = {
        user_id: u.user_id
      };

      if (!u.user_name) {
        Toast("请填写姓名!");
        return;
      }

      if (!u.telephone) {
        Toast("请填写手机号码!");
        return;
      } else if (!/^1\d{10}$/.test(u.telephone)) {
        Toast("请填写正确格式的手机号码!");
        return;
      }

      if (u.house_id == undefined) {
        Toast("请选择学校楼栋编号!");
        return;
      }

      if (!u.room_num) {
        Toast("请填写宿舍号码!");
        return;
      }

      if (!u.grade_num) {
        Toast("请填写年级!");
        return;
      }

      if (!u.major) {
        Toast("请填写专业");
        return;
      }

      httpService.post(httpServiceUrl.updateUserInfo, u).then(
        res => {
          Toast("修改个人用户信息成功!");
          setTimeout(() => {
            let getParams = {
              hashUrl: "userInfo",
              getThis: this
            };
            goUrl(getParams);
          }, 1500);
        },
        err => {
          Toast(err.msg || "修改信息失败");
        }
      );
    }
  }
};
</script>
