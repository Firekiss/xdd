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
  applyToRubber: '/CloseCenter/closeUser/applyToRubber.action', // 申请成为派单人员接口
  orderList:'/CloseCenter/closeUser/orderList.action',//用户订单列表接口
  orderDetail:'/CloseCenter/closeUser/orderDetail.action',//订单详情接口
  getCode: '/CloseCenter/closeUser/getCode.action', // 用户注册或修改支付密码时获取验证码接口
  payOrder: '/CloseCenter/closeUser/payOrder.action', // 余额支付订单接口
  updateUserInfo: '/CloseCenter/closeUser/updatePerMsg.action', // 修改个人信息
  setPayPassword: '/CloseCenter/closeUser/setYuePayPassWord.action', // 设置余额支付密码
  confirmOrder: '/CloseCenter/closeUser/comfireOrder.action', // 用户确认订单接口
  orderComment: '/CloseCenter/closeUser/orderComment.action', // 用户评价订单
  applyAfterSale: '/CloseCenter/closeUser/applyReturnMoney.action', // 申请售后的接口
  robOrderList: '/CloseCenter/closeRubber/rubOrderList.action?', // 派单员抢单列表接口
  robOrder: '/CloseCenter/closeRubber/rubOrder.action', // 派单员抢单接口
  getErWeiCodeSign: '/CloseCenter/closeUser/getErWeiCodeSign.action', // 用户JSSDK注入权限验证接口
  chargeMoneyList: '/CloseCenter/closePublic/chargeMoneyList.action?', // 充值金额列表接口
  addChargeOrder: '/CloseCenter/closeUser/addChargeOrder.action', // 用户提交充值订单
  chargeNotify: '/CloseCenter/closeUser/user/wx/charge.action', // 用户充值微信支付订单
  walletList: '/CloseCenter/closeUser/walletList.action?', // 用户消费记录列表接口
  scanBundOrder: '/CloseCenter/closeUser/scanBundOrder.action', // 订单扫描绑定衣袋接口
  rubAllOrderList: '/CloseCenter/closeRubber/rubAllOrderList.action?', // 配送员订单列表接口
  myTeamList: '/CloseCenter/closeUser/myTeamList.action?', // 营销人员列表接口
  userAdvice: '/CloseCenter/closeUser/userAdvice.action', // 用户意见内容接口
}
