<template>
  <div class="user-info">
    <div class="user-base-info border-bottom-1px">
      <div class="avatar-wrapper">
        <img :src="personalInfo.user_image_url" v-if="personalInfo.user_image_url" class="avatar">
      </div>
      <div class="user-info-brief">
        <span class="user-name">{{personalInfo.user_name}}</span>
        <div>
          <span class="user-detail-btn">评分：4.8</span>
          <span class="user-detail-btn">总单数：120</span>
        </div>
      </div>
    </div>


    <!-- 派单员操作列表 -->
    <div class="user-handle-list" style="margin-top: .5rem;">
      <div class="list-item border-bottom-1px flex-mid" @click="goTeamManage">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img src="../assets/userInfo/wallet_icon@2x.png">
          </span>
          <span class="item-name">
            我的钱包
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever"></span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item border-bottom-1px flex-mid" @click="goFeedBack">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img src="../assets/userInfo/appraise_icon@2x.png">
          </span>
          <span class="item-name">
            我的评价
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever"></span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img src="../assets/userInfo/lever_icon@2x.png">
          </span>
          <span class="item-name">
            我的等级
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever"></span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item border-bottom-1px flex-mid" @click="goSettings">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img src="../assets/userInfo/send_icon@2x.png">
          </span>
          <span class="item-name">
            下级派单员
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever"></span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item flex-mid" @click="goSettings">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img src="../assets/userInfo/set_icon@2x.png">
          </span>
          <span class="item-name">
            设置
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever"></span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/userInfo.scss'
  import tool from '../common/tools';
  import httpService from "../common/httpService";
  import httpServiceUrl from "../common/httpServiceUrl";

  export default {
    name: "user-info",
    data () {
      return {
        icons: {
          team: require('../assets/userInfo/team_icon@2x.png'),
          member: require('../assets/userInfo/member_icon@2x.png'),
          option: require('../assets/userInfo/opinion_icon@2x.png'),
          set: require('../assets/userInfo/set_icon@2x.png')
        },
        arrow: require('../assets/icon_arrow.png'),
        wxUserData: window.wxUserData, // 用户个人信息
        personalInfo: {}, // 用户信息
        // 优惠券列表
        coupleList: [],
        // 成为派单员信息
        rubberInfo: {
          id_num: '',
          id_name: '',
          rub_type: ''
        }
      }
    },
    mounted () {
      this.getUserCoupleList();
      this.getPersonalInfo();
    },
    methods: {
      // 获取用户个人中心信息
      getPersonalInfo () {
        httpService.get(httpServiceUrl.personalById, {
          user_id: this.wxUserData.user_id
        }).then(res => {
          this.personalInfo = res
        })
      },
      // 获取用户所有的优惠券列表
      getUserCoupleList () {
        httpService.get(httpServiceUrl.userCoupleList, {
          user_id: this.wxUserData.user_id,
          type: 2
        }).then(res => {
          this.coupleList = res.userCoupleItems;
        })
      },
      // 跳转到申请成为派单员页面
      goBeSender () {
        if (this.personalInfo.is_deliver === 0) {
          Toast('已经发起过申请，请等待管理员审核');
          return;
        };
        let goUrlParam = {
          hashUrl: 'applySender',
          getThis: this
        };
        goUrl(goUrlParam)
      },
      // 跳转到优惠券列表
      goCoupleList () {
        let goUrlParam = {
          hashUrl : 'coupon',
          getThis: this
        };
        goUrl(goUrlParam);
      },
      // 跳转到团队管理
      goTeamManage () {
        let goUrlParam = {
          "hashUrl": 'teamManage',
          "getThis": this
        };
        goUrl(goUrlParam);
      },
      // 跳转到意见反馈
      goFeedBack () {
        let goUrlParam = {
          "hashUrl": 'feedBack',
          "getThis": this
        };
        goUrl(goUrlParam);
      },
      // 跳转到设置
      goSettings () {
        let goUrlParam = {
          "hashUrl": 'settings',
          "getThis": this
        };
        goUrl(goUrlParam);
      },
      getDeliverLevel (info) {
        if (info.is_deliver === 0) {
          return '申请中'
        }

        switch (info.deliverType) {
          case 0:
            return '';
            break;
          case 1:
            return '初级';
            break;
          case 2:
            return '中级';
            break;
          case 3:
            return '高级';
            break;
          case 4:
            return '市级';
            break;
          default:
            break;
        }
      }
    }
  }
</script>

