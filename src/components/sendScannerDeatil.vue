<template>
    <div class="person-info box">
    <div class="info-list box">
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">用户名</span>
        <span class="content house-id">{{userName}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">手机号</span>
        <span class="content house-id">{{telephone}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在地区</span>
        <span class="content house-id">{{area}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">所在学校</span>
        <span class="content house-id">{{schoolName}}</span>
      </div> 
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">学校楼栋编号</span>
        <span class="content house-id">{{houseNum}}</span>
      </div>
      <div class="list-item border-bottom-1px flex-mid">
        <span class="label">宿舍号码</span>
        <span class="content house-id">{{roomNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '../scss/personInfo.scss';

export default {
  data () {
    return {
      userName: Request('userName'),
      telephone: Request('telephone'),
      area: Request('area'),
      schoolName: Request('schoolName'),
      houseNum: Request('houseNum'),
      roomNum: Request('roomNum'),
    }
  }
}
</script>
