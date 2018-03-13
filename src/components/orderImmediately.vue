<template>
  <div class="order-immediately">
    <div class="show-img">
      <img :src="goodDetail.image_url" v-if="goodDetail.image_url">
    </div>
    <div class="order-num">
      <div class="clothes-num-section flex">
        <span class="title">衣服数量</span>
        <div class="clothes-num-changer flex-mid">
          <span class="clothes-num-reduce flex-mid" @click="reduceWashNum">－</span>
          <span class="clothes-num-cur">{{washNumber}}</span>
          <span class="clothes-num-add flex-mid" @click="addWashNum">＋</span>
        </div>
      </div>
      <div class="clothes-num-section flex">
        <span class="title">洗衣袋数量</span>
        <span>1</span>
      </div>
    </div>
    <div class="explain">
      <div class="explain-detail">
        <h5 class="explain-title">洗衣说明</h5>
        <p>
          {{goodDetail.content}}
        </p>
      </div>
    </div>
    <div class="total-cart flex border-top-1px">
      <div class="total-bar flex-mid">
        <span class="title">合计</span>
        <span class="money">¥{{totalMoney}}</span>
      </div>
      <span class="order-btn flex-centers">立即下单</span>
    </div>
  </div>
</template>

<script>
  import httpServiceUrl from '../common/httpServiceUrl';
  import httpService from '../common/httpService';
  import '@/scss/orderImmediately.scss'
  export default {
    name: "order-immediately",
    data () {
      return {
        typeNum: Request("typeNum"),
        goodDetail: {},
        washNumber: 0
      }
    },
    computed: {
      totalMoney () {
        return this.goodDetail.price * this.washNumber
      }
    },
    mounted () {
      this.getGoodDetail(this.typeNum)
    },
    methods: {
      // 获取商品详情
      getGoodDetail (typeNum) {
        httpService.get(httpServiceUrl.goodTypeDetail, {
          type: typeNum
        }).then(res => {
          this.goodDetail = res;
        }).catch(err => {})
      },
      // 减少一个衣服数量
      reduceWashNum () {
        if (this.washNumber > 0) {
          this.washNumber--;
        }
      },
      // 增加一个衣服数量
      addWashNum () {
        this.washNumber++;
      }
    }
  }
</script>
