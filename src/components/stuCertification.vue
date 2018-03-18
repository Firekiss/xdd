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
          <span @click="showAreaSheet" class="input-row">{{stuParams.address || '请选择你所在的地区'}}</span>
        </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所在学校</span>
        <span class="mustFlow">*</span>
        <span class="span2">
          <span @click="showSchoolSheet" class="input-row">{{stuParams.school || '请选择你所在的学校'}}</span>
        </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所在年级</span>
        <span class="mustFlow">*</span>
        <span class="span2">
          <input type="text" placeholder="请选择您的所在年级" class="input-row" v-model="stuParams.grade">
        </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">所属专业</span>
        <span class="mustFlow">*</span>
        <span class="span2">
          <input type="text" placeholder="请选择您的所属专业" class="input-row" v-model="stuParams.professional">
        </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span1">详细地址</span>
        <span class="mustFlow">*</span>
        <span class="span2">
          <span @click="showHouseSheet" class="input-row">{{stuParams.addressDetail || '宿舍楼栋'}}</span>
        </span>
      </div>
      <div class="commonLine border-bottom-1px">
        <span class="span2">
            <input type="text" placeholder="宿舍号" class="input-row" v-model="stuParams.addressNum">
        </span>
      </div>
      <div class="nextBut" @click="submitRegister">完成</div>

      <!-- 地区选择组件 -->
      <widget-mask-sheet
        :visible="areaSheet.visible"
        :title="areaSheet.title"
        :showConfirm="areaSheet.showConfirm"
        :close="closeAreaSheet"
        :maskClick="areaSheetMaskClick"
        :confirm="areaSheetConfirm">
        <mt-picker :slots="slots" value-key="name" @change="onValuesChange"></mt-picker>
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
  </div>
</template>

<script>
  import Vue from 'vue';
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';
  import tool from '../common/tools';
  import widgetMaskSheet from './widget/widgetMaskSheet';
  import {Picker} from 'mint-ui';
  import '../scss/stuCertification.scss';

  Vue.component(Picker.name, Picker);

  export default {
    components: {
      widgetMaskSheet
    },
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
        areaSheet: {
          visible: false,
          title: '所在地区',
          showConfirm: true
        },
        schoolSheet: {
          visible: false,
          title: '所在学校',
          showConfirm: true
        },
        houseSheet: {
          visible: false,
          title: '所在宿舍楼',
          showConfirm: true
        },
        slots: [
          {
            flex: 1,
            values: [],
            textAlign: 'center'
          }, {
            divider: true,
            content: '-'
          }, {
            flex: 1,
            values: [],
            textAlign: 'center'
          }, {
            divider: true,
            content: '-'
          }, {
            flex: 1,
            values: [],
            textAlign: 'center'
          }
        ],
        schoolSlots: [
          {values: []}
        ],
        houseSlots: [
          {values: []}
        ],
        areaList: [],
        areaIds: [],
        curCityValues: '',
        curSchoolValues: '',
        curHouseValues: ''
      }
    },
    mounted: function () {
      // 查询默认的省市区的数据
      this.queryAreaList(1).then(() => {
        this.areaIds[0] = this.areaList[0][0].id;
        return this.queryAreaList(2, this.areaIds[0])
      }).then(() => {
        this.areaIds[1] = this.areaList[1][0].id;
        return this.queryAreaList(3, this.areaIds[1])
      }).then(() => {
        this.areaIds[2] = this.areaList[2][0].id;
      })
    },
    methods: {
      // 查询省市区
      queryAreaList (type, id) {
        let params = {
          type: type
        };

        if (id !== undefined) {
          params.other_id = id
        }

        return httpService.get(httpServiceUrl.areaList, params).then(res => {
          let values = [];
          res.otherItems && res.otherItems.length &&
          res.otherItems.forEach(item => {
            values.push({
              id: item.other_id,
              name: item.other_name
            })
          });
          this.slots[(type - 1) * 2].values = this.areaList[type - 1] = values
        })
      },
      // 修改省份之后， 重新请求省下面的市与区的数据
      changeProvince (provinceId) {
        return this.queryAreaList(2, provinceId).then(() => {
          return this.queryAreaList(3, this.areaList[1][0].id)
        })
      },
      // 修改城市之后， 重新请求该城市下面的区的数据
      changeCity (cityId) {
        return this.queryAreaList(3, cityId)
      },
      // 查询区域内的学校列表
      querySchoolList () {
        let params = {
          province: this.curCityValues[0].name,
          city: this.curCityValues[1].name,
          area: this.curCityValues[2].name,
        };
        httpService.post(httpServiceUrl.schoolList, params).then(res => {
          this.schoolSlots[0].values = res.schoolItems;
          this.curSchoolValues = res.schoolItems[0];
        })
      },
      // 查询学校内的宿舍楼列表
      queryHouseList () {
        let params = {
          school_id: this.curSchoolValues.school_id
        };
        httpService.post(httpServiceUrl.houseList, params).then(res => {
          this.houseSlots[0].values = res.houseItems;
        })
      },
      showAreaSheet () {
        this.areaSheet.visible = true
      },
      // 关闭地区选择
      closeAreaSheet () {
        this.areaSheet.visible = false
      },
      // 点击地区选择的遮罩
      areaSheetMaskClick () {
        this.areaSheet.visible = false
      },
      // 修改了地区的回调函数
      onValuesChange (picker, values) {
        // 当前地区信息赋值
        this.curCityValues = values;
        // 遍历比较省市的修改，请求相应的数据
        for (let i = 0; i < values.length; i++) {
          if (values[i] && values[i].id !== this.areaIds[i]) {
            if (i === 0) {
              this.changeProvince(values[i].id).then(() => {
                this.areaIds[i] = values[i].id
              })
            } else if (i === 1) {
              this.changeCity(values[i].id).then(() => {
                this.areaIds[i] = values[i].id
              })
            }
          }
        }
      },
      // 确定选择区域
      areaSheetConfirm () {
        this.curCityValues.forEach(val => {
          this.stuParams.address += val.name;
        });
        this.areaSheet.visible = false
      },
      // 点击显示区域内的学校
      showSchoolSheet () {
        if (this.stuParams.address) {
          this.schoolSheet.visible = true
          this.querySchoolList()
        } else {
          Toast('请先选择你所在的区域')
        }
      },
      closeSchoolSheet () {
        this.schoolSheet.visible = false
      },
      schoolSheetMaskClick () {
        this.schoolSheet.visible = false
      },
      // 所选学校发生改变的回调函数
      onSchoolValuesChange (picker, values) {
        this.curSchoolValues = values[0]
      },
      schoolSheetConfirm () {
        this.schoolSheet.visible = false
        this.stuParams.school = this.curSchoolValues.school_name
      },
      // 显示宿舍楼选择列表
      showHouseSheet () {
        if (this.stuParams.school) {
          this.houseSheet.visible = true;
          this.queryHouseList()
        } else {
          Toast('请先选择你所在的学校')
        }
      },
      closeHouseSheet () {
        this.houseSheet.visible = false
      },
      houseSheetMaskClick () {
        this.houseSheet.visible = false
      },
      // 确认选择
      houseSheetConfirm () {
        this.houseSheet.visible = false;
        this.stuParams.addressDetail = this.curHouseValues.house_num;
      },
      // 所选宿舍楼发生改变的回调函数
      onHouseValuesChange (picker, values) {
        this.curHouseValues = values[0]
      },
      // 点击完成提交注册
      submitRegister () {
        let params = {
          openid: window.openid,
          telephone: Request('telephone')
        };

        if (!this.stuParams.name) {
          Toast('请填写姓名');
          return
        } else {
          params.user_name = this.stuParams.name;
        }
        if (!this.stuParams.addressDetail) {
          Toast('请填写详细地址');
          return
        } else {
          params.house_id = this.curHouseValues.house_id;
        }

        if (!this.stuParams.grade) {
          Toast('请填写所在年级');
          return
        } else {
          params.grade_num = this.stuParams.grade;
        }

        if (!this.stuParams.professional) {
          Toast('请填写专业');
          return
        } else {
          params.major = this.stuParams.professional
        }

        if (!this.stuParams.addressNum) {
          Toast('请填写宿舍号');
          return
        } else {
          params.room_num = this.stuParams.addressNum;
        }

        httpService.post(httpServiceUrl.secRegister, params).then(res => {
          console.log(res)
        })
      }
    }

  }
</script>
