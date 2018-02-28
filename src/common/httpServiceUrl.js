export default {
    //接口访问路径：每个接口写好注释，写明是什么功能的接口，方便后期维护和查找
    //理论预约
    Url_BranchSchool: "/school/learnrecord/getOverBranchSchoolInfo.do", //获取驾校列表
    Url_OrderList: "/school/schoolstudy/theoryOrderGrid.do", //获取驾校预约科目列表
    Url_Subscribe: "/school/schoolstudy/orderTheory.do", //预约 
    Url_Cancel: "/school/schoolstudy/cancelTheory.do", //取消预约    
    Url_ExamList: "/school/schoolstudy/examOrderGrid.do", //获取考试列表
    Url_ExamOrder: "/school/schoolstudy/orderExam.do", //考试预约
    //我的消费
    Url_Recharger: "/school/onlinepayment/rechargeRecordList.do", //获取充值列表
    Url_NeedPayList: "/school/onlinepayment/getNeedPayRecord.do", //获取代缴记录列表
    Url_GetMyCoupon: "/main/coupon/getMyCoupon.do", //获取我的优惠券
    Url_ConsumeRecordList: "/school/onlinepayment/costDetail.do", //获取消费数据列表
    Url_GetPayWay: "/main/payment/getStudentPayWay.do", //获取支付方式
    Url_SettleAcctiont: "/school/payOrder/studentSettleAccounts.do", //待缴费支付生成订单
    Url_getBank: "/school/payOrder/payCostByBankCard.do", //银行卡支付
    Url_getIsCanManualPay: "/main/payment/getIsCanManualPay.do", //是否支持手动支付

    //完善资料
    Url_PerfectData: "/main/schoolstudy/completeVIPStuInfo.do", //完善资料同步数据
    //邮寄资料
    Url_MailInformation: "/main/schoolstudy/getPostInfo.do", //获取邮寄资料
    Url_ExaminationInfo: "/main/schoolstudy/getExaminationInfo.do", //获取体检表资料




    getCommonPage: "/main/homePage/getCommonPage.do", //科目学习首页公共配置项接口
    getQuestClassify: "/main/onlinestudy/getQuestClassify.do", //章节练习
    getTestPaper: "/school/onlinestudy/getTestPaper.do", //模拟考试
    getStudentLearnStatus: "/school/onlinestudy/getStudentLearnStatus.do", //科目学习首页获取学员状态
    coachList: "/school/schoolstudy/coachList.do", //科目学习首页教练列表
    studentBindCoach: "/school/schoolstudy/studentBindCoach.do", //科目学习首页关注教练
    coachDetails: "/school/schoolstudy/coachDetails.do", //教练详情


    getSchoolList: "/main/map/getNearbySchoolList.do", //驾校列表 //pass
    districtList: "/main/map/getDistrictByCityCode.do", //地区区域列表 //pass
    schoolDetail: "/main/schoolstudy/schoolDetail.do", //駕校詳情
    getSchoolEvaList: "/main/schoolstudy/getSchoolEvaluationList.do", //駕校評價
    cancelSignUp: "/main/schoolstudy/cancelSignUp.do", //评价？？？暂时未知
    recommendCondition: "/main/recommendpolite/recommendCondition.do", //推荐有礼
    shareAndInvite: "/main/recommendpolite/shareAndInvite.do", //分享
    getComplainContent: "/school/complain/getComplainContent.do", //投诉
    saveComplainInfo: "/school/complain/saveComplainInfo.do",
    schoolEvaluationDetail: "/main/schoolstudy/schoolEvaluationDetail.do", //驾校评价
    addSchoolComment: "/main/schoolstudy/addSchoolComment.do", //驾校评价-增加评论
    recommendInformation: '/main/recommendpolite/recommendInformation.do', //邀请人

    //守夜
    getBanner: "/main/homePage/getCommonPage.do",
    getCounp: "/main/coupon/getIsShowCoupon.do",
    getIndexDetail: "/main/homePage/getHomePageDetails.do",
    getMyprocess: "/main/schoolstudy/getMyProgressInfo.do",

    //vip报名详情
    vipDetailUrl: "/main/homePage/getRegistrationDetails.do",
    vipStateUrl: "/main/schoolstudy/getMyProgressInfo.do",

    //vip报名支付
    getCounpList: "/main/coupon/getMyCoupon.do",
    getRecomend: "/main/recommendpolite/reliefAmount.do",
    makePayDetail: "/school/payOrder/createEnrollVipOrder.do",

    //升级包
    upUrl: "/main/homePage/getUpDetails.do",
    makeUpDetail: "/school/payOrder/createUpgradeVipOrder.do",

    //模拟器
    getSignInfo: "/school/schoolstudy/getSimulatorInfo.do",
    checkSignUsed: "/school/schoolstudy/saveSimulatorTempOrder.do",

    makeSignDetail: "/school/payOrder/createSimulatorOrder.do",
    getSignPayway: "/school/payOrder/getSimulatorPayWay.do",

    //模拟器关联模拟预约
    isSimulate: "/main/schoolstudy/getSimulatorIsRelevanceOrder.do",
    canUse: "/school/schoolstudy/getSimulatorOrder.do",
    sign: "/school/schoolstudy/simulatorSign.do",

    //智能评判
    getRorbotInfo: "/school/schoolstudy/getOrderTrainInfo.do",

    makeRorbotDetail: "/school/payOrder/createRobotOrder.do",
    getRorbotPayway: "/school/payOrder/getRobotPayWay.do",

    //个人中心
    getMyProgressInfo: "/main/schoolstudy/getMyProgressInfo.do", //获取我的进度信息
    getStuTimeCost: '/main/personal/getBalance.do', //获取我的学时和余额

    //我的日志-学习记录
    send_msg_url: "/main/message/saveMessage.do", //发送消息给教练
    list_study_url: "/school/schoolstudy/getLearnRecord.do", //获取学习记录
    cancel_url: "/school/schoolstudy/cancelTrain.do", //取消预约接口
    refundmentDetail_url: '/school/schoolstudy/getRefundmentDetail.do', //获取扣除手续费
    list_busLine_url: "/school/learnrecord/getBusOrderRecord.do", //获取班车记录
    cancelOrder_url: "/school/schoolstudy/cancelBus.do", //取消预约
    getCancelUrl: "/school/learnrecord/getCancelOrderRecord.do", //获取取消记录

    //日志详情-训练数据
    list_basic_url: "/school/schoolstudy/studyRecord.do", //获取训练数据学员基本信息、学时数据、项目数据、出错原因
    other_list_basic_url: "/school/schoolstudy/studyRecord.do", //获取其他驾校训练数据学员基本信息、学时数据、项目数据、出错原因
    list_biaoqian_url: "/school/schoolstudy/getLearnCommentRecord.do", //获取训练数据教练评价
    list_photo_url: "/school/schoolstudy/logImageList.do", //获取日志照片
    other_list_photo_url: "/main/schoolstudy/logImageList.do", //获取其他驾校日志照片

    //我的消息
    getMsgUrl: "/school/message/messageType.do", //获取我的消息列表
    delMsgUrl1: "/main/message/messageRecordDelete.do", //删除我的消息接口
    delMsgUrl2: "/school/message/messageRecordDelete.do", //删除我的消息接口
    getMsgCardUrl: "/school/message/messageList.do", //获取消息卡片列表
    getMsgCardDesUrl: "/school/message/messageDetail.do", //获取消息详情

    getCoachUrl: "/school/complain/getComplainContent.do", //获取投诉教练数据
    sendCoachUrl: "/school/complain/saveComplainInfo.do", //提交投诉教练接口


    //三个预约界面(训练，模拟，班车)
    getOverBranchSchoolInfo: "/school/learnrecord/getOverBranchSchoolInfo.do", //训练预约切换驾校列表
    queryDateRange: "/school/schoolstudy/queryDateRange.do", //当前驾校可选日期
    trainOrderGrid: '/school/schoolstudy/trainOrderGrid.do', //训练预约表格数据
    queryRefundMoney: '/school/schoolstudy/queryRefundMoney.do', //取消预约退费
    queryCost: '/school/schoolstudy/queryCost.do', //预约的课程费用
    orderTrain: '/school/schoolstudy/orderTrain.do', //训练预约，预约课程
    cancelTrain: '/school/schoolstudy/cancelTrain.do', //取消训练预约

    simulateOrderGrid: "/school/schoolstudy/simulateOrderGrid.do", //模拟预约表格数据
    orderSimulate: "/school/schoolstudy/orderSimulate.do", //模拟预约，预约课程
    cancelSimulate: "/school/schoolstudy/cancelSimulate.do", //取消模拟预约

    busOrderGrid: "/school/schoolstudy/busOrderGrid.do", //班车预约表格数据
    orderBus: "/school/schoolstudy/orderBus.do", //班车预约，预约班车
    cancelBus: "/school/schoolstudy/cancelBus.do", //取消班车预约
    getIsCanTheorySign: "/school/schoolstudy/getIsCanTheorySign.do", //理论预约签到签退


    //我的考试
    getExamRecord: "/school/learnrecord/getExamRecord.do", //获取考试记录

    //理论签到签退
    sign_check_url: "/school/schoolstudy/saveOrUpdateTheorySign.do",

    //理论签到签退1
    sign_check_url1: "/school/schoolstudy/getStudentSignInfo.do",

    cityList: "/main/map/getProvinceList.do",

    //扫码签到签退页面
    verifyStudentSignInfo: "/school/schoolstudy/getStudentSign.do", //学员签到信息
    saveStudentSignInfo: "/school/schoolstudy/saveStudentSign.do", //保存学员信息
    studentFaceCompare: "/school/sign/studentFaceCompare.do", //人脸比对

    getBeforeExamMockSchool: "/main/schoolstudy/getBeforeExamMockSchool.do", //查询考前模拟驾校
    getBeforeExamMockGrid: "/school/schoolstudy/getBeforeExamMockGrid.do", //查询考前模拟在线预约
    createBeforeExamOrder: "/school/payOrder/createBeforeExamOrder.do", //考前模拟预约生成订单

    workUrl: "/main/homePage/getShortMenuList.do",
    currentUrl: "/school/homePage/currentNodeTaskStatus.do",
    needUrl: "/school/homePage/toDo.do",
    save_menu_url: "/main/homePage/saveShortMenu.do", //菜单保存路径

    unBindWechat: "/wechat/unBindWechat.do",//解绑微信号

    getMwStudentData:"/wechat/getMwStudentData.do",//微信获取学员信息接口
    getMwCoachData:"/wechat/getMwCoachData.do",//获取教练信息接口
    sendCheckCode:"/main/common/sendCheckCode.do",//发送验证码

    studentBasicInfo:"/wechat/studentBasicInfo.do",//报名一级页面基本信息
    uploadPhoto:"/wechat/uploadPhoto.do",//上传身份证
    newSignUp:"/wechat/newSignUp.do",//报名一级页面下一步操作
    studentOtherInfo:"/wechat/studentOtherInfo.do",//报名二级页面展示
    completeStudentInfo:"/wechat/completeStudentInfo.do",//报名二级页面点完成
    studentRegisterInfo:"/wechat/studentRegisterInfo.do",//报名一级页面审核完成学员信息
    
}