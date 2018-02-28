<template>
    <div id="entry">
        <div @touch="preDefalut($event)" id="wholeCover" @touchmove.prevent></div>
        <div :class="magicHeight">
            <router-view></router-view>
        </div>

        <div class="bottomBar" v-if="showBottom">
            <div class="subItem" @click="changeItem('index')">
                <div v-if="nowTabIndex!=1&&(nowTabIndex==2||nowTabIndex==3)" class="tabIndexClass">
                   <img src="../assets/stu_indexTab.png" alt="">
                </div>
               
                <div v-if="nowTabIndex==1" class="tabIndexClass">
                   <img src="../assets/stu_indexTab2.png" alt="">
                </div>
            </div>
            <div class="subItem" @click="changeItem('orderPage')">
                <div v-if="nowTabIndex!=2&&(nowTabIndex==1||nowTabIndex==3)" class="tabIndexClass">
                   <img src="../assets/subjectTab.png" alt="">
                </div>
               
                <div v-if="nowTabIndex==2" class="tabIndexClass">
                   <img src="../assets/subjectTab2.png" alt="">
                </div>
            </div>
            <div class="subItem" @click="changeItem('mySelf')">
                <div v-if="nowTabIndex!=3&&(nowTabIndex==1||nowTabIndex==2)" class="tabIndexClass">
                   <img src="../assets/personalTab.png" alt="">
                </div>
               
                <div v-if="nowTabIndex==3" class="tabIndexClass">
                   <img src="../assets/personalTab2.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>

/*import '../scss/commonStyle.scss';*/
import 'mint-ui/lib/style.css';
require('swiper/dist/css/swiper.css');
export default {
    data() {
            return {
                transitionName: 'expand',
                urlHash: window.location.hash,
                magicHeight: 'wholeHeight',
                showBottom: false,
                nowTabIndex:1,//当前展示tab页的索引
                doron_appId:'wxcc1bc83f7604f895',//公有云：wxf8f4ffba5ad3a93d     测试环境：wxcc1bc83f7604f895
            }
        },

        watch: {
            '$route': 'fetchData'
        },
        mounted:function(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.urlHash = window.location.hash;
                if(window.location.href.toLowerCase().indexOf('openid') != -1){
                    this.showBottom = true;
                    this.magicHeight = 'partHeight';
                    if(this.urlHash.indexOf('index') == -1 
                        && this.urlHash.indexOf('orderPage') == -1
                        && this.urlHash.indexOf('mySelf') == -1){

                        this.showBottom = false;
                        this.magicHeight = 'wholeHeight';
                    }
                    if(this.urlHash.indexOf('index')> -1){
                        this.nowTabIndex = 1;
                    }else if(this.urlHash.indexOf('orderPage')> -1){
                        this.nowTabIndex = 2;
                    }else if(this.urlHash.indexOf('mySelf')> -1){
                        this.nowTabIndex = 3;
                    }
                }
            },
            preDefalut:function (events) {
                return;
            },
            changeItem: function(hashName) {
                /*var pushUrl= valueFromNativeAll.html5BaseUrl + "/index.html";
                var getParams = {
                    url:pushUrl,
                    hashUrl:hashName,
                    getThis:this,
                    pushType:'replace'//说明是replace跳转
                }
                goUrl(getParams);*/
                //this.$router.replace({ path: goUrlParam.hashUrl, query: params});
            }
        },
        components: {
            
        }
}
</script>
<style>
html,
body {
    height: 100%;
    width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
div{
    -webkit-tap-highlight-color:rgba(0,0,0,0); 
}

.wholeHeight{
    height: 100%;
}
.partHeight{
    height: -webkit-calc(100% - 50px);
    overflow: auto;
}
.bottomBar{
    position: fixed;
    height: 3rem;
    width: 100%;
    display: flex;
    bottom: 0px;
    font-size: 0.875rem;
    line-height: 3rem;
    z-index: 1;
    background-color: #ebebeb;
}
.subItem{
    width: 33%;
    text-align: center;
    color: #677a88;
    position: relative;
    padding-top: 0.35rem;
}
.subItem .tabIndexClass {
    line-height: 2.3rem;
}
.subItem .tabIndexClass img{
    width: 35px;
}
#wholeCover{
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: .2;
    display: none;
    width: 100%;
    height: 100%;
    z-index: 999;
}

#entry {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
}

.expand-enter-active {
    transition: all .3s ease;
}

.expand-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.expand-enter,
.expand-leave-active {
    padding-left: 10px;
    opacity: 0;
}

</style>
