<template>
    <router-view></router-view>
</template>
<script>
</script>
<style>
    html,
    body {
        height: 100%;
        width: 100%;
        font-family: Source Sans Pro, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
    }

    @media screen and (min-width: 320px) {
        html,
        body {
            font-size: 16px !important;
        }
    }

    @media screen and (min-width: 360px) {
        html,
        body {
            font-size: 17px !important;
        }
    }

    @media screen and (min-width: 375px) {
        html,
        body {
            font-size: 18px !important;
        }
    }

    #entry {
        width: 100%;
        height: 100%;
    }

    /*设备像素比*/
    @media only screen and (-webkit-min-device-pixel-ratio: 2.0), only screen and (min-resolution: 2dppx) {
      .border-bottom-1px::after, .border-top-1px::after {
        transform: scaleY(0.5);
      }

      .border-left-1px::after, .border-right-1px::after {

        transform: scaleX(0.5);
      }
      .border-1px::after {
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: 0 0;
      }
    }

    /*设备像素比*/
    @media only screen and (-webkit-min-device-pixel-ratio: 3.0), only screen and (min-resolution: 3dppx) {
      .border-bottom-1px::after, .border-top-1px::after {
        transform: scaleY(0.333);
      }
      .border-left-1px::after, .border-right-1px::after {
        transform: scaleX(0.333);
      }
      .border-1px::after {
        width: 300%;
        height: 300%;
        transform: scale(0.333);
        transform-origin: 0 0;
      }
    }

    input::-webkit-input-placeholder{
      color: #999;
    }
</style>
