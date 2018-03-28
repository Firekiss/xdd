<template>
  <div class="star-lever__wrapper">
    <div class="stars flex-mid">
      <span class="star-unselected star-selected"></span>
      <span class="star-unselected star-selected"></span>
      <span class="star-unselected star-selected"></span>
      <span class="star-unselected star-selected"></span>
      <span class="star-unselected"></span>
    </div>
  </div>
</template>

<script>
  import '../../scss/base/var.scss';

  export default {
    name: "star-level",
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
