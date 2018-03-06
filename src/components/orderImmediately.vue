<template>
  <div class="order-immediately">
    <div class="show-img"></div>
    <div class="order-num">
      <div class="clothes-num-section flex">
        <span class="title">衣服数量</span>
        <div class="clothes-num-changer flex-mid">
          <span class="clothes-num-reduce flex-mid">－</span>
          <span class="clothes-num-cur">2</span>
          <span class="clothes-num-add flex-mid">＋</span>
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
          对于水洗标，大家可能都非常熟悉，它是日常生活中常见的一类，服装上面用得最多，一般是缝在上衣或者裤子的里侧面，除此之外像包袋、沙发、坐垫、帐篷、毛绒玩具、鞋子、帽子、雨伞、纺织产品等各行各业都会用到水洗标。
          水洗标在日常生活中又叫洗水标、水洗唛、洗水唛、洗涤标、洗标，大部分是经过印刷制作而成，叫做印标、布标或者缎标等；有少量的织唛织上水洗内容也可称为水洗标。总之水洗标的叫法不一，但它的内容一般是一些服装参数和注意事项、衣服的面料成份、正确的洗涤方法等，有的水洗标也会印上客人的品牌LOGO，可过洗不掉色。
          衣物如何洗涤是一个很重要的问题，因为正确的洗涤方法会让衣物亮丽如新，而不当的洗涤方法严重的会损坏衣物。所以大家都很有必要了解一下水洗标。
          对于水洗标，大家可能都非常熟悉，它是日常生活中常见的一类，服装上面用得最多，一般是缝在上衣或者裤子的里侧面，除此之外像包袋、沙发、坐垫、帐篷、毛绒玩具、鞋子、帽子、雨伞、纺织产品等各行各业都会用到水洗标。
          水洗标在日常生活中又叫洗水标、水洗唛、洗水唛、洗涤标、洗标，大部分是经过印刷制作而成，叫做印标、布标或者缎标等；有少量的织唛织上水洗内容也可称为水洗标。总之水洗标的叫法不一，但它的内容一般是一些服装参数和注意事项、衣服的面料成份、正确的洗涤方法等，有的水洗标也会印上客人的品牌LOGO，可过洗不掉色。
          衣物如何洗涤是一个很重要的问题，因为正确的洗涤方法会让衣物亮丽如新，而不当的洗涤方法严重的会损坏衣物。所以大家都很有必要了解一下水洗标。
        </p>
      </div>
    </div>
    <div class="total-cart flex border-top-1px">
      <div class="total-bar flex-mid">
        <span class="title">合计</span>
        <span class="money">¥24.00</span>
      </div>
      <span class="order-btn flex-centers">立即下单</span>
    </div>
  </div>
</template>

<script>
  import '@/scss/orderImmediately.scss'
  export default {
    name: "order-immediately"
  }
</script>
