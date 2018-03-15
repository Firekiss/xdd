<template>
  <div class="person-info box">
    <div class="info-list box">
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">用户名</span>
        <span class="content">{{userDetail.user_name}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">手机号</span>
        <span class="content">{{userDetail.telephone}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在地区</span>
        <span class="content">{{userDetail.province}}{{userDetail.city}}{{userDetail.area}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在学校</span>
        <span class="content">{{userDetail.school_name}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在专业</span>
        <!-- <span class="content">{{userDetail.}}</span> -->
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在年级</span>
        <!-- <span class="content">{{userDetail.}}</span> -->
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">详细地址</span>
        <span class="content">{{userDetail.room_num}}</span>
      </div>
      <div class="list-item flex-mid">
        <span class="label"></span>
        <span class="content">{{userDetail.house_num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/scss/personInfo.scss'
import httpServiceUrl from '../common/httpServiceUrl';
import httpService from '../common/httpService';
  export default {
    name: "person-info",
    data () {
      return {
        userDetail:"",//用户信息
      }
    },
    mounted: function () {
      this.initDetail();
    },
    methods: {
      initDetail:function(){
        var self = this;
          var personalByIdUrl = httpServiceUrl.personalById;
          var personalByIdParam = {

          };
          httpService.get(personalByIdUrl,personalByIdParam).then(function(data){
            self.userDetail = data;
          }).catch(function(data){
            if (data && (data.msg || data.message)) {
              Toast(data.msg || data.message);
            }
          });

      },
    },
  }
</script>
