<template>
  <div class="star-lever__wrapper">
    <div class="stars flex-mid">
      <span 
        class="star-unselected"
        v-for="(level, index) in levelData"
        :key="index"
        :class="{'star-selected': level.isSelected}"
        @click="levelClick(index)"></span>
    </div>
  </div>
</template>

<script>
  import '../../scss/base/var.scss';

  export default {
    name: "star-level",
    props: {
      maxLevel: {
        type: [Number, String],
        default: 5
      },
      curLevel: {
        type: [Number, String],
        default: 0
      },
      onlyShow: {
        type: Boolean,
        default: false
      },
      levelChange: {
        type: Function,
        default: function(){}
      }
    },
    data () {
      return {
        starNum: 0,
        curNum: 0,
        levelData: []
      }
    },
    created() {
      this.starNum = Number(this.maxLevel);
      this.curNum = Number(this.curLevel);

      if (isNaN(this.starNum) || this.starNum < 0) {
        this.starNum = 5;
      }

      if (isNaN(this.curNum) || this.curNum < 0) {
        this.curNum = 0;
      }

      this.levelData = this.createLevelData(this.starNum, this.curNum);
    },
    methods: {
      // 根据总的星数 和当前已经获得的星数 生成等级数据
      createLevelData (starNum, curNum) {
        let levelData = [];

        for (let i = 0; i < starNum; i++) {
          levelData.push({
            isSelected: (i + 1) <= curNum
          })
        }
        return levelData;
      },
      // 触摸星星的时候变化等级
      levelClick (index) {
        // 不仅仅是展示的时候触摸才有用处
        if (!this.onlyShow) {
          this.levelData = this.createLevelData(this.starNum, index + 1);
          this.levelChange(index + 1);
        }
      }
    }
  }
</script>

<style lang="scss">
.star-lever__wrapper{
  .stars{
    .star-unselected{
      display: block;
      width: 0.9rem;
      height: 0.8rem;
      margin-right: 0.2rem;
      background-image: url("../../assets/star_unselected@2x.png");
      background-size: cover;
    }

    .star-unselected.star-selected{
      background-image: url("../../assets/star_selected@2x.png");
    }
  }
}
</style>
