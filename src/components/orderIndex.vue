<template>
	<div class="orderIndex">
        <div class="tab-row">
            <div class="myTab-item" @click="orderItemTab(index)" v-for="(item,index) in showTopItem">
                <div class="textCon" :class="{'onfocusColor':item.orderFocus}">{{item.name}}</div>
            </div>
        </div>
        <div class="orderLists">
            <div class="orderItem">
                <div class="line1">
                    <span class="span1">订单编号：</span>
                    <span class="span2">1255855699</span>
                    <span class="span3">配送中</span>
                </div>
                <div class="line2">
                    <img class="vertical1" src="../assets/orderPic@2x.png">
                    <div class="vertical2"></div>
                    <div class="vertical3"></div>
                </div>
                <div class="line3">
                    
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import Vue from 'vue';
    import httpServiceUrl from '../common/httpServiceUrl';
    import httpService from '../common/httpService';
    import tool from '../common/tools';
    import Loadmore from 'mint-ui/lib/loadmore';
    import '../scss/orderIndex.scss';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        data() {
            return {
                showTopItem:[
                    {   
                        name:"全部",
                        orderFocus:1
                    },
                    {   
                        name:"待付款",
                        orderFocus:0
                    },
                    {   
                        name:"待配送",
                        orderFocus:0
                    },
                    {   
                        name:"已完成",
                        orderFocus:0
                    },
                    {   
                        name:"售后",
                        orderFocus:0
                    }
                ],
            }
        },
        mounted: function() {
        },
        methods: {
            orderItemTab:function(index){
                for(var i = 0;i<this.showTopItem.length;i++){
                    this.showTopItem[i].orderFocus = 0;
                }
                this.showTopItem[index].orderFocus = 1;
            },
        }

    }
</script>