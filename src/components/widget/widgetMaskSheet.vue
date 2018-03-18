<template>
  <div class="mask-sheet" v-if="visible">
    <div class="mask" @click="maskClick"></div>
    <div class="sheet-content">
      <div class="close-bar flex-centers border-bottom-1px">
        <img src="../../assets/btn_delete.png"
             class="close-btn"
             @click.stop="close">
        <span>{{title}}</span>
        <span v-if="showConfirm" class="confirm-btn" @click="confirm">确定</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "widget-mask-sheet",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '请选择'
      },
      showConfirm: {
        type: Boolean,
        default: false
      },
      close: {
        type: Function,
        default: function () {}
      },
      maskClick: {
        type: Function,
        default: function () {}
      },
      confirm: {
        type: Function,
        default: function () {}
      }
    }
  }
</script>

<style lang="scss">
  @import "../../scss/base/var";
  .mask-sheet{
    .mask{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: rgba(0,0,0, 0.6);
      z-index: 99;
    }

    .sheet-content{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #ffffff;
      min-height: 100px;
      z-index: 100;

      .close-bar{
        position: relative;
        height: 2.5rem;

        .close-btn{
          position: absolute;
          left: 1.0rem;
          top: 0.7rem;
          width: 0.8rem;
          height: 0.8rem;
        }

        .confirm-btn{
          position: absolute;
          right: 1.0rem;
          top: 0;
          height: 2.5rem;
          line-height: 2.5rem;
          color: $projectGreen;
        }
      }
    }
  }
</style>
