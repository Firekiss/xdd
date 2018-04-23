<template>
  <div class="team-manage">
    <div class="total">
      <span class="total-num">总计：{{allNum}}</span>
    </div>
    <div class="team-type-list">
      <div
        v-for="(item, index) in teamList"
        :key="index"
        class="team-type-item">
        <div class="team-type-head border-bottom-1px flex-mid" @click="stateChange(item)">
          <span class="team-type-name">{{item.className}}</span>
          <div class="team-type-right flex-mid">
            <span class="team-type-num">{{item.classListItems.length}}</span>
            <span class="team-type-arrow" :class="{'team-type-arrow-down': item.toggle}">
              <img :src="icons.arrowRight">
            </span>
          </div>
        </div>
        <div class="team-list" v-if="item.toggle">
          <div 
            class="team-list-item flex-mid border-bottom-1px"
            v-for="(person, index) in item.classListItems"
            :key="index">
            <div class="avator">
              <img :src="person.user_image_url">
            </div>
            <div class="list-item-info">
              <div class="user-base-info">
                <span class="user-name">{{person.user_name}}</span>
                <span class="user-tell">{{person.telephone}}</span>
              </div>
              <span class="user-focus">关注时间：{{person.create_time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/scss/team_manage.scss'
import httpService from '../common/httpService';
import httpServiceUrl from '../common/httpServiceUrl';
  export default {
    name: "team-manage",
    data () {
      return {
        icons: {
          arrowRight: require('../assets/icon_arrow.png')
        },
        allNum: '',
        teamList: [],
        type: Request('type')
      }
    },
    mounted () {
      // 获取营销人员列表
      this.getMyTeamList();
    },
    methods: {
      stateChange (item) {
        item.toggle = !item.toggle;
      },
      
      // 获取用户销售团队列表数据
      getMyTeamList () {
        var url, params;
        
        if (this.type === 'order') {
          url = httpServiceUrl.rubNextList;
          params = {
            rubber_id: window.wxUserData.rubber_id,
          };
        } else {
          url = httpServiceUrl.myTeamList;
          params = {
            user_id: window.wxUserData.user_id
          };
        }

        httpService.get(url, params).then(res => {
          this.teamList = this.addCoupleToggle(res.classItems);
          this.allNum = res.allNum;
        }).catch(err => {
          Toast(err.msg || '获取营销人员列表失败');
        })
      },
      // 为每一个用户分组添加开关属性
      addCoupleToggle (items) {
        let arrItems = [];
        items.forEach(item => {
          arrItems.push(Object.assign({}, item, {
            toggle: false
          }));
        });

        return arrItems;
      }
    }
  }
</script>
