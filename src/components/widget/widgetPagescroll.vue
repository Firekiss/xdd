<template>
  <div class="page-scroll">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from '../../common/iscroll';

export default {
  props: {
    selector: {
      type: String,
      default: '.scroll-wrapper'
    },
    options: {
      type: Object,
      default: function(){
        return {};
      }
    }
  },
  data () {
    return {
      myScroll: {}
    }
  }
}
</script>

<style lang="scss">
  .page-scroll{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
