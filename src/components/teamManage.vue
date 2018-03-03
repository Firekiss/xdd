<template>
  <div class="team-manage">
    <div class="total">
      <span class="total-num">总计：670</span>
    </div>
    <div class="team-type-list">
      <div class="team-type-item">
        <div class="team-type-head border-bottom-1px flex-mid" @click="stateChange">
          <span class="team-type-name">高级</span>
          <div class="team-type-right flex-mid">
            <span class="team-type-num">320</span>
            <span class="team-type-arrow" :class="{'team-type-arrow-down': listDown}">
              <img :src="icons.arrowRight">
            </span>
          </div>
        </div>
        <div class="team-list" v-if="listDown">
          <div class="team-list-item flex-mid border-bottom-1px">
            <div class="avator">
              <img src="">
            </div>
            <div class="list-item-info">
              <div class="user-base-info">
                <span class="user-name">苏叶</span>
                <span class="user-tell">13258685264</span>
              </div>
              <span class="user-focus">关注时间：2018-02-10</span>
            </div>
          </div>
          <div class="team-list-item flex-mid border-bottom-1px">
            <div class="avator">
              <img src="">
            </div>
            <div class="list-item-info">
              <div class="user-base-info">
                <span class="user-name">苏叶</span>
                <span class="user-tell">13258685264</span>
              </div>
              <span class="user-focus">关注时间：2018-02-10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/team_manage.scss'
  export default {
    name: "team-manage",
    data () {
      return {
        icons: {
          arrowRight: require('../assets/icon_arrow.png'),
          arrowDown: require('../assets/arrow_down_1.png')
        },
        listDown: false
      }
    },
    methods: {
      stateChange () {
        this.listDown = !this.listDown
      }
    }
  }
</script>
