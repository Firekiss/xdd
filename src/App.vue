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
</style>