<template>
  <div class="user-info">
    <div class="user-base-info border-bottom-1px">
      <div class="avatar-wrapper">
        <img src="" class="avatar">
      </div>
      <div class="user-info-brief">
        <span class="user-name">Suyemxx</span>
        <span class="user-detail-btn">个人信息></span>
      </div>
    </div>
    <div class="user-asset">
      <div class="balance">
        <span class="balance-val">326.00</span>
        <span class="balance-name">余额</span>
      </div>
      <div class="balance">
        <span class="balance-val">6</span>
        <span class="balance-name">卡券</span>
      </div>
      <div class="balance">
        <span class="balance-val">36</span>
        <span class="balance-name">积分</span>
      </div>
    </div>
    <div class="invite"></div>
    <div class="user-handle-list">
      <div class="list-item border-bottom-1px flex-mid">
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
      <div class="list-item border-bottom-1px flex-mid">
        <div class="list-item-left flex">
          <span class="item-icon">
            <img :src="icons.member">
          </span>
          <span class="item-name">
            成为派单员
          </span>
        </div>
        <div class="list-item-right flex-mid">
          <span class="item-lever">初级</span>
          <span class="item-arrow">
            <img :src="arrow">
          </span>
        </div>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
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
      <div class="list-item flex-mid">
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
        arrow: require('../assets/icon_arrow.png')
      }
    }
  }
</script>
