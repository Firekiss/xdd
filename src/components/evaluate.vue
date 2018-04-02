<template>
  <div class="evaluate box">
    <div class="evaluate-content-wrap box">
      <div class="goods-clerk border-bottom-1px">
        <div class="header flex-mid">
          <span class="title">收货员</span>
          <star-level :cur-level="shou.shouScore" :level-change="shouLevelChange"></star-level>
        </div>
        <textarea :placeholder="placeholder" v-model="shou.shouContent" class="reason-area box" @input="contentChange(shou.shouContent, 'shou')"></textarea>
        <div class="num-count flex">
          <span class="num">{{shou.contentNum}}/{{maxContent}}</span>
        </div>
      </div>
    </div>
    <div class="evaluate-content-wrap box" style="padding-bottom: 1.0rem">
      <div class="goods-clerk">
        <div class="header flex-mid">
          <span class="title">配送员</span>
          <star-level :cur-level="pei.peiScore" :level-change="peiLevelChange"></star-level>
        </div>
        <textarea :placeholder="placeholder" v-model="pei.peiContent" class="reason-area box" @input="contentChange(pei.peiContent, 'pei')"></textarea>
        <div class="num-count flex">
          <span class="num">{{pei.contentNum}}/{{maxContent}}</span>
        </div>
      </div>
    </div>
    <div class="submit-btn flex-centers" @click="submit">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
  import starLevel from './widget/starLevel.vue';
  import '@/scss/evaluate.scss';
import httpService from '../common/httpService';
import httpServiceUrl from '../common/httpServiceUrl';
  export default {
    name: "evaluate",
    components: {
      starLevel
    },
    data () {
      return {
        maxContent: 50,
        placeholder: '服务您是否满意，说说您的心得，分享给大家呗~',
        orderId: Request('orderId'),
        shou: {
          shouScore: 5,
          shouContent: '',
          contentNum: 0
        },
        pei: {
          peiScore: 5,
          peiContent: '',
          contentNum: 0
        }
      }
    },
    methods: {
      // 收货员星级发生改变的回调函数
      shouLevelChange (newLevel) {
        this.shou.shouScore = newLevel;
      },
      // 配送员星级发生改变的回调函数
      peiLevelChange (newLevel) {
        this.pei.peiScore = newLevel;
      },
      // 当评论的内容发生改变时的回调函数
      contentChange (content, type) {
        content = content.substring(0, this.maxContent);
        this[type][type + 'Content'] = content;
        this[type]['contentNum'] = content.length;
      },
      // 提交评价
      submit () {
        let params = {
          user_id: window.wxUserData.user_id,
          order_id: this.orderId,
          shou_score: this.shou.shouScore,
          pei_score: this.pei.peiScore,
          shou_content: this.shou.shouContent,
          pei_content: this.pei.peiContent
        };

        httpService.post(httpServiceUrl.orderComment, params).then(res => {
          Toast('订单评价成功');
          setTimeout(() => {
            // 跳转到订单列表页面
            let getParams = {
              hashUrl: "orderIndex",
              getThis: this
            };
            goUrl(getParams);            
          }, 1500);
        }).catch(err => {
          Toast(err.msg || '订单评价失败');
        })
      }
    }
  }
</script>

<style scoped>

</style>
