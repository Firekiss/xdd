<template>
  <div class="order-immediately">
    <div class="show-img">
      <img :src="goodDetail.image_url" v-if="goodDetail.image_url">
    </div>
    <div class="order-num">
      <div class="clothes-num-section flex">
        <span class="title" v-if="typeNum == 1">洗衣数量</span>
        <span class="title" v-else>衣服数量</span>
        <div class="clothes-num-changer flex-mid">
          <span class="clothes-num-reduce flex-mid" v-if="typeNum != 3" @click="reduceWashNum">－</span>
          <span class="clothes-num-cur" :class="{'shoe': typeNum == 3}">{{washNumber}}</span>
          <span class="clothes-num-add flex-mid" v-if="typeNum != 3" @click="addWashNum">＋</span>
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
        <span class="money">¥{{this.goodDetail.price}}</span>
      </div>
      <span
        class="order-btn flex-centers"
        :class="{'disable': washNumber === 0}"
        @click="goOrder">立即下单</span>
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
        return (this.goodDetail.price * 1000 * this.washNumber) / 1000
      }
    },
    mounted () {
      (this.typeNum == 3) && (this.washNumber = 1);
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
      },
      // 点击下单
      goOrder () {
        if (this.washNumber > 0) {
          let goUrlParam = {
            "hashUrl": 'submitOrder',
            "getThis": this,
            'params': {
              washNumber: this.washNumber,
              price: this.goodDetail.price,
                goodType: this.typeNum
            }
          };
          goUrl(goUrlParam);
        }
      }
    }
  }
</script>
