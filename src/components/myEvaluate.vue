<template>
  <div class="my-evaluate" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <div 
      class="evaluate-item box"
      v-for="(item, index) in rubCommentList"
      :key="index">
      <div class="order-info flex-mid">
        <span class="order-num">订单编号: {{item.order_num}}</span>
        <span class="order-time">{{item.create_time}}</span>
      </div>
      <star-level :cur-level="item.score" :only-show="onlyShow"></star-level>
      <p class="evaluates">
        {{item.content}}
      </p>
    </div>
  </div>
</template>

<script>
  import starLevel from '../components/widget/starLevel.vue';
  import '@/scss/myEvaluate.scss';
import httpService from '../common/httpService';
import httpServiceUrl from '../common/httpServiceUrl';

  export default {
    name: "my-evaluate",
    components: {
      starLevel
    },
    data () {
      return {
        onlyShow: true,
        scrollMode: 'touch',
        rubCommentList: []
      }
    },
    mounted () {
      this.getRubCommentList();
    },
    methods: {
      getRubCommentList () {
        httpService.get(httpServiceUrl.rubCommentList, {
          rubber_id: window.rubberId
        }).then(res => {
          this.rubCommentList = res.commentItems;
          this.$nextTick(() => {
            this.scrollMode = 'touch';
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
