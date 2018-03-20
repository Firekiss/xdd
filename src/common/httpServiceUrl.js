export default {
  login: '/CloseCenter/closeUser/login.action',//登录接口
  doorImageList: '/CloseCenter/closePublic/doorImageList.action?', // 首页轮播图列表和活动列表接口
  goodTypeDetail: '/CloseCenter/closePublic/goodTypeDetail.action?', // 根据商品类别查询详情接口
  firstRegister:'/CloseCenter/closeUser/firstRegister.action',//注册第一步
  personalById:'/CloseCenter/closeUser/personalById.action',//用户个人信息
  userCoupleList: '/CloseCenter/closeUser/userCoupleList.action?', // 获取用户优惠券列表
  addOrder: '/CloseCenter/closeUser/addOrder.action', // 用户提交订单接口
  areaList: '/CloseCenter/closePublic/areaList.action?', // 查询省市区接口
  schoolList: '/CloseCenter/closePublic/schoolListByArea.action?', // 查询学校列表接口
  houseList: '/CloseCenter/closePublic/houseListBySchoolId.action?', // 查询学校宿舍列表接口
  weChatOpenId:'/CloseCenter/closeUser/weChatOpenId.action',//获取openid
  secRegister: '/CloseCenter/closeUser/secRegister.action', //注册第二步接口
  createWxOrder:'/CloseCenter/closeUser/user/wx.action',//生成订单接口
  orderList:'/CloseCenter/closeUser/orderList.action',//用户订单列表接口
  orderDetail:'/CloseCenter/closeUser/orderDetail.action',//订单详情接口
}
