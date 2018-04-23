<template>
  <div class="user-info">
    <div class="user-base-info border-bottom-1px">
      <div class="avatar-wrapper">
        <img :src="personalInfo.user_image_url" v-if="personalInfo.user_image_url" class="avatar">
      </div>
      <div class="user-info-brief">
        <span class="user-name">{{personalInfo.user_name}}</span>
        <span class="user-detail-btn" @click.stop="goEditUserInfo">个人信息 ></span>
      </div>
    </div>
    <div class="user-asset">
      <div class="balance" @click.stop="balance">
        <span class="balance-val">{{personalInfo.user_money}}</span>
        <span class="balance-name">余额</span>
      </div>
      <div class="balance" @click="goCoupleList">
        <span class="balance-val">{{coupleList.length}}</span>
        <span class="balance-name">卡券</span>
      </div>
      <div class="balance">
        <span class="balance-val">{{personalInfo.credit}}</span>
        <span class="balance-name">积分</span>
      </div>
    </div>
    <div class="invite">
      <img :src="personalInfo.actUrl">
    </div>

    <!-- 普通用户操作列表 -->
    <div class="user-handle-list">
      <div class="list-item border-bottom-1px flex-mid" @click="goTeamManage">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img :src="icons.team">
          </span>
            <span class="item-name">
            团队管理
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever"></span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item border-bottom-1px flex-mid" @click="goBeSender">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img :src="icons.member">
          </span>
          <span class="item-name">
            成为派单员
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever">{{getDeliverLevel(personalInfo)}}</span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item border-bottom-1px flex-mid" @click="goFeedBack">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img :src="icons.option">
          </span>
          <span class="item-name">
            意见反馈
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
            <img :src="icons.set">
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

  let logo = require('../assets/logo@2x.png');

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
      this.invite();
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
        }).catch(err => {
          Toast(err.msg || '获取用户优惠券列表失败');
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
        goUrl(goUrlParam);
      },

      // 跳转到充值的页面
      balance () {
        let goUrlParam = {
          hashUrl: 'balance',
          getThis: this,
          params: {
            userMoney: this.personalInfo.user_money,
            eMoney: this.personalInfo.e_bi_money,
            userType: 'user'
          }
        };
        goUrl(goUrlParam);
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
        
        switch (info.deliver_type) {
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
      },

      // 点击个人信息 跳转到个人信息修改页面
      goEditUserInfo () {
        let goUrlParam = {
          "hashUrl": 'personInfo',
          "getThis": this
        };
        goUrl(goUrlParam);        
      },

      // 用户获取JSSDK注入权限验证数据对象
      getErWeiCodeSign (jsapiTicket, url) {
        return httpService.post(httpServiceUrl.getErWeiCodeSign, {
          jsapi_ticket: jsapiTicket,
          url: url
        }).then(res => {
          return res;
        }).catch(err => {
          Toast(err.msg || '获取JSSDK注入权限验证数据失败');
        })
      },

      // 点击邀请其他用户
      invite () {
        let self = this;
        let jsapiTicket = window.jsapi_ticket;
        let url = window.location.href.split('#')[0];

        this.getErWeiCodeSign(jsapiTicket, url).then(res => {
          wx.config({
            debug: false,
            appId: 'wx950fa5385b73d05b',
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','hideMenuItems']
          })
        }).catch(err => {
          Toast(err.msg || '获取微信sdk签名错误');
        });

        wx.ready(function(){
          wx.onMenuShareTimeline({
              title: '邀请有礼', // 分享标题
              link: 'http://www.njtyxxkj.com/xdd/index.html#/index?invite_code=' + window.wxUserData.invite_code, // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: 'http://39.107.71.117/h5/images/logo@2x.png', // 分享图标
              success: function () {
                console.log('分享成功');
                  // 用户确认分享后执行的回调函数
                  Toast('分享成功');
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
                  Toast('取消成功');
              }
          });

          wx.onMenuShareAppMessage({
              title: '邀请有礼', // 分享标题
              desc: '邀请有礼', // 分享描述
              link: 'http://www.njtyxxkj.com/xdd/index.html#/index?invite_code=' + window.wxUserData.invite_code, // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: 'http://39.107.71.117/h5/images/logo@2x.png', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                  // 用户确认分享后执行的回调函数
                  Toast('分享成功');
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
                  Toast('取消成功');
              }
          });

          wx.hideMenuItems({
            menuList: ['menuItem:share:qq',
                        'menuItem:share:weiboApp',
                        'menuItem:favorite',
                        'menuItem:share:facebook',
                        'menuItem:share:QZone'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            success:function(res){}
          });
        });

        wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          console.log(res);
        });
      }
    }
  }
</script>
