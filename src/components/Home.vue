<template>
	<div class="myContainer" style="width: 100%;height: 100%;background: red;">
      <div class="swiper-container" style="width: 100%;height: auto;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in imageSrcs" style="background: yellow;">
        	    <img :src="item.imageSrc" style="width: 100%;"/>
          </div>
        </div>
    <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      </div>
      
      
		
	</div>
	
</template>

<script>
	
import Vue from 'vue';
import Loadmore from 'mint-ui/lib/loadmore';
import 'mint-ui/lib/loadmore/style.css';


Vue.component(Loadmore.name, Loadmore);

	export default {
		data(){
			return {
				imageSrcs:[{imageSrc:"http://img06.tooopen.com/images/20170321/tooopen_sy_202706818574.jpg"},
				           {imageSrc:"http://img03.tooopen.com/images/20160703/tooopen_sy_168772353872.jpg"},
				           {imageSrc:"http://img02.tooopen.com/images/20151029/tooopen_sy_146789743587.jpg"}],
				 list:[{left:"学车咨询",right:"直营教练"},{left:"班车预约",right:"学车顾问"},{left:"上门取件",right:"一费到底"},{left:"不限学时",right:"在线支付"},{left:"快速拿证",right:"限时维权"}]
				 
			}
			
			
		},
		mounted:function(){
	    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: 2000,
        speed:500,
        //  effect:"coverflow",
        autoplayDisableOnInteraction:false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    
       // 如果需要前进后退按钮
       //  nextButton: '.swiper-button-next',
       //  prevButton: '.swiper-button-prev',
    
       // 如果需要滚动条
       //  scrollbar: '.swiper-scrollbar',
  })        
		}
	}
</script>

<style>
</style>