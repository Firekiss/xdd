import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Container from './components/Container'
import httpService from './common/httpService'
import tools from './common/tools'
import commonToast from './common/commonToast'
import config from './config'
const SubjectHome = r => require.ensure([], () => r(require('./components/SubjectHome')), 'SubjectHome');

const Robot = r => require.ensure([], () => r(require('./components/Robot')), 'Robot');
const MyEvalutation = r => require.ensure([], () => r(require('./components/MyEvalutation')), 'MyEvalutation');
const MyExamination = r => require.ensure([], () => r(require('./components/MyExamination')), 'MyExamination');
const MyProcess = r => require.ensure([], () => r(require('./components/MyProcess')), 'MyProcess');
const MySign = r => require.ensure([], () => r(require('./components/MySign')), 'MySign');
const LearnTimeStatistics = r => require.ensure([], () => r(require('./components/LearnTimeStatistics')), 'LearnTimeStatistics');
const SchoolEnvironment = r => require.ensure([], () => r(require('./components/SchoolEnvironment')), 'SchoolEnvironment');
const MyLearnProcess = r => require.ensure([], () => r(require('./components/MyLearnProcess')), 'MyLearnProcess');
const ComplainSchoolDes = r => require.ensure([], () => r(require('./components/ComplainSchoolDes')), 'ComplainSchoolDes');
const complainCoachDes = r => require.ensure([], () => r(require('./components/complainCoachDes')), 'complainCoachDes');
const editMenu = r => require.ensure([], () => r(require('./components/EditMenuNew')), 'EditMenuNew');
const Coach_detail = r => require.ensure([], () => r(require('./components/Coach_detail')), 'Coach_detail');
const Videolist = r => require.ensure([], () => r(require('./components/Videolist')), 'Videolist');
const FindSchool = r => require.ensure([], () => r(require('./components/FindSchool')), 'FindSchool');
const SimulateFromScan = r => require.ensure([], () => r(require('./components/SimulateFromScan')), 'SimulateFromScan');
const SimulateSign = r => require.ensure([], () => r(require('./components/SimulateSign')), 'SimulateSign');
const PayScan = r => require.ensure([], () => r(require('./components/PayScan')), 'PayScan');
const BaiduSearch = r => require.ensure([], () => r(require('./components/BaiduSearch')), 'BaiduSearch');
const BaiduMap = r => require.ensure([], () => r(require('./components/BaiduMap')), 'BaiduMap');
const SchoolDes = r => require.ensure([], () => r(require('./components/SchoolDes')), 'SchoolDes');
const ComplaintSchool = r => require.ensure([], () => r(require('./components/ComplaintSchool')), 'ComplaintSchool');
const Jiaxiao_complain = r => require.ensure([], () => r(require('./components/Jiaxiao_complain')), 'Jiaxiao_complain');
const Personal = r => require.ensure([], () => r(require('./components/Personal')), 'Personal');
const ComplaintCoach = r => require.ensure([], () => r(require('./components/ComplaintCoach')), 'ComplaintCoach');
const LearnEvaluation = r => require.ensure([], () => r(require('./components/LearnEvaluation')), 'LearnEvaluation');
const MyLogTopBar = r => require.ensure([], () => r(require('./components/MyLogTopBar')), 'MyLogTopBar');
const StuRecord = r => require.ensure([], () => r(require('./components/StuRecord')), 'StuRecord');
const CarRecord = r => require.ensure([], () => r(require('./components/CarRecord')), 'CarRecord');
const CancelRecord = r => require.ensure([], () => r(require('./components/CancelRecord')), 'CancelRecord');
const MyLogDesTopBar = r => require.ensure([], () => r(require('./components/MyLogDesTopBar')), 'MyLogDesTopBar');
const LogPhoto = r => require.ensure([], () => r(require('./components/LogPhoto')), 'LogPhoto');
const Order_Theory = r => require.ensure([], () => r(require('./components/Order_Theory')), 'Order_Theory');
const Order_Exam = r => require.ensure([], () => r(require('./components/Order_Exam')), 'Order_Exam');
const NewIndex = r => require.ensure([], () => r(require('./components/NewIndex')), 'NewIndex');
const MyConsumption = r => require.ensure([], () => r(require('./components/MyConsumption')), 'MyConsumption');
const RecordConsume = r => require.ensure([], () => r(require('./components/RecordConsume')), 'RecordConsume');
const RecordRecharge = r => require.ensure([], () => r(require('./components/RecordRecharge')), 'RecordRecharge');
const RecordWaitPay = r => require.ensure([], () => r(require('./components/RecordWaitPay')), 'RecordWaitPay');
const Order_Train = r => require.ensure([], () => r(require('./components/Order_Train')), 'Order_Train');
const Order_simulate = r => require.ensure([], () => r(require('./components/Order_simulate')), 'Order_simulate');
const Order_bus = r => require.ensure([], () => r(require('./components/Order_bus')), 'Order_bus');
const HealthForm = r => require.ensure([], () => r(require('./components/HealthForm')), 'HealthForm');
const PayRecord = r => require.ensure([], () => r(require('./components/PayRecord')), 'PayRecord');
const Sign = r => require.ensure([], () => r(require('./components/Sign')), 'Sign');
const CodeSign = r => require.ensure([], () => r(require('./components/CodeSign')), 'CodeSign');
const SimulateSchoolList = r => require.ensure([], () => r(require('./components/SimulateSchoolList')), 'SimulateSchoolList');
const OnlineOrder = r => require.ensure([], () => r(require('./components/OnlineOrder')), 'OnlineOrder');
const PaySimulateOrder = r => require.ensure([], () => r(require('./components/PaySimulateOrder')), 'PaySimulateOrder');
const OnlineAnswer = r => require.ensure([], () => r(require('./components/OnlineAnswer')), 'OnlineAnswer');
const Learn = r => require.ensure([], () => r(require('./components/Learn')), 'Learn');

const ExamOnline = r => require.ensure([], () => r(require('./components/ExamOnline')), 'ExamOnline');
const MockOnline = r => require.ensure([], () => r(require('./components/MockOnline')), 'MockOnline');
const MockResult = r => require.ensure([], () => r(require('./components/MockResult')), 'MockResult');
const TestPaper = r => require.ensure([], () => r(require('./components/TestPaper')), 'TestPaper');

const PersonalDetail = r => require.ensure([], () => r(require('./components/PersonalDetail')), 'PersonalDetail');
const SubjectHomeWechat = r => require.ensure([], () => r(require('./components/SubjectHomeWechat')), 'SubjectHomeWechat');
const Stu_preRegister = r => require.ensure([], () => r(require('./components/Stu_preRegister')), 'Stu_preRegister');
const Stu_bind = r => require.ensure([], () => r(require('./components/Stu_bind')), 'Stu_bind');
const Stu_register = r => require.ensure([], () => r(require('./components/Stu_register')), 'Stu_register');
const Stu_signUpRegister = r => require.ensure([], () => r(require('./components/Stu_signUpRegister')), 'Stu_signUpRegister');
const SignUp = r => require.ensure([], () => r(require('./components/SignUp')), 'SignUp');
const SignUpNext = r => require.ensure([], () => r(require('./components/SignUpNext')), 'SignUpNext');
const CheckSign = r => require.ensure([], () => r(require('./components/CheckSign')), 'CheckSign');
const PaySign = r => require.ensure([], () => r(require('./components/PaySign')), 'PaySign');
//屏蔽掉的页面
/*const VipClass = r => require.ensure([], () => r(require('./components/VipClass')), 'VipClass');
const MyComplain = r => require.ensure([], () => r(require('./components/MyComplain')), 'MyComplain');
const VipDetail = r => require.ensure([], () => r(require('./components/VipDetail')), 'VipDetail');
const VipPay = r => require.ensure([], () => r(require('./components/VipPay')), 'VipPay');
const UpDetail = r => require.ensure([], () => r(require('./components/UpDetail')), 'UpDetail');
const Uppay = r => require.ensure([], () => r(require('./components/Uppay')), 'Uppay');
const Recommend = r => require.ensure([], () => r(require('./components/Recommend')), 'Recommend');
const inviter = r => require.ensure([], () => r(require('./components/inviter')), 'inviter');
const MyMsg = r => require.ensure([], () => r(require('./components/MyMsg')), 'MyMsg');
const MyMsgCard = r => require.ensure([], () => r(require('./components/MyMsgCard')), 'MyMsgCard');
const Perfect_Data = r => require.ensure([], () => r(require('./components/Perfect_Data')), 'Perfect_Data');
const Mail_Information = r => require.ensure([], () => r(require('./components/Mail_Information')), 'Mail_Information');
const UpVip = r => require.ensure([], () => r(require('./components/UpVip')), 'UpVip');


*/


//优惠券功能屏蔽
/*const Preferential = r => require.ensure([], () => r(require('./components/Preferential')), 'Preferential');
const GetCoupon = r => require.ensure([], () => r(require('./components/GetCoupon')), 'GetCoupon');
const couponRules = r => require.ensure([], () => r(require('./components/couponRules')), 'couponRules');
const MyCoupon = r => require.ensure([], () => r(require('./components/MyCoupon')), 'MyCoupon');*/




Vue.use(VueRouter);
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index',
        component: Container,
        children: [
            // 首页
            { path: 'helloWorld', component: require('./components/HelloWorld') },
            { path: 'hello', component: require('./components/Hello') },
            { path: 'home', component: require('./components/home') },

            { path: 'robot', component: Robot }, //banner-机器人智能教练


            { path: 'myEvalutation', component: MyEvalutation }, //我的评价
            { path: 'myExamination', component: MyExamination }, //考试记录
            { path: 'myProcess', component: MyProcess }, //我的进度
            { path: 'mySign', component: MySign }, //我的签到
            { path: 'learnTimeStatistics', component: LearnTimeStatistics }, //学时统计
            { path: 'schoolEnvironment', component: SchoolEnvironment }, //驾校环境
            { path: 'myLearnProcess', component: MyLearnProcess }, //我的进度
            { path: 'complainSchoolDes', component: ComplainSchoolDes }, //投诉驾校详情
            { path: 'complainCoachDes', component: complainCoachDes }, //投诉教练详情
            { path: 'editMenu', component: editMenu }, //菜单编辑

            { path: 'subjectHome', component: SubjectHome }, //科目学习
            { path: 'coach_detail', component: Coach_detail }, //教练详情
            { path: 'videolist', component: Videolist }, //教学视频
            { path: 'findSchool', component: FindSchool }, //驾校列表

            { path: 'simulate', component: SimulateFromScan },
            { path: 'simulateSign', component: SimulateSign },
            { path: 'payScan', component: PayScan }, //支付订单
            { path: 'baiduSearch', component: BaiduSearch }, //修改当前位置
            { path: 'baiduMap', component: BaiduMap }, //修改当前位置
            { path: 'schoolDes', component: SchoolDes }, //驾校详情
            { path: 'complaintSchool', component: ComplaintSchool }, //投诉驾校
            { path: 'jiaxiao_complain', component: Jiaxiao_complain },
            { path: 'personal', component: Personal }, //个人中心
            
            { path: 'complaintCoach', component: ComplaintCoach }, //我要投诉
            { path: 'learnEvaluation', component: LearnEvaluation }, //满意度评价
            {
                path: 'myLog',
                component: MyLogTopBar,
                children: [
                    { path: 'stuRecord', component: StuRecord }, //学习记录
                    { path: 'carRecord', component: CarRecord }, //班车记录
                    { path: 'cancelRecord', component: CancelRecord } //取消记录
                ]
            },
            {
                path: 'myLogDes',
                component: MyLogDesTopBar,
            },
            { path: 'logPhoto', component: LogPhoto }, //训练照片
            { path: 'order_thoery', component: Order_Theory }, //理论预约
            { path: 'order_exam', component: Order_Exam }, //考试预约
            { path: 'index', component: NewIndex }, //首页报名
            {
                path: 'my_consumption',
                component: MyConsumption,
                children: [
                    { path: 'record_consume', component: RecordConsume }, //我的消费-消费记录
                    { path: 'record_recharge', component: RecordRecharge }, //我的消费-充值记录
                    { path: 'record_waitpay', component: RecordWaitPay }, //我的消费-待缴记录
                ]
            },
            { path: 'order_Train', component: Order_Train }, //训练预约
           
            { path: 'order_simulate', component: Order_simulate }, //模拟预约
            { path: 'order_bus', component: Order_bus }, //班车预约
            { path: 'health_form', component: HealthForm }, //驾考体检流程
            { path: 'pay_record', component: PayRecord }, //支付订单
            { path: 'sign', component: Sign }, //理论签到,理论签退
            { path: 'codeSign', component: CodeSign }, //扫码签到签退
            { path: 'simulateSchoolList', component: SimulateSchoolList }, //考前模拟选择驾校
            { path: 'onlineOrder', component: OnlineOrder }, //考前模拟选择驾校
            { path: 'paySimulateOrder', component: PaySimulateOrder }, //考前模拟选择驾校
            { path: 'onlineAnswer', component: OnlineAnswer }, //在线答题
            { path: 'learn', component: Learn }, //学习资料
            
            { path: 'examOnline', component: ExamOnline }, //试题
            { path: 'mockOnline', component: MockOnline }, //试题
            { path: 'mockResult', component: MockResult }, //试题
            { path: 'testPaper', component: TestPaper }, //试题
            
            
            
            
            { path: 'personalDetail', component: PersonalDetail },
            //学员详情

            { path: 'subjectHomeWechat', component: SubjectHomeWechat }, //微信的科目学习首页

            { path: 'stu_preRegister', component: Stu_preRegister }, //注册绑定报名
            { path: 'stu_bind', component: Stu_bind },
            { path: 'stu_register', component: Stu_register },
            { path: 'stu_signUpRegister', component: Stu_signUpRegister },
            { path: 'signUp', component: SignUp },//报名页面
            { path: 'signUpNext', component: SignUpNext },//报名页面的下一页
            { path: 'checkSign', component: CheckSign },//查看报名资料页面
            { path: 'paySign', component: PaySign }, //支付报名费

            //屏蔽掉的页面

            /*{ path: 'vipclass', component: VipClass }, //banner-智能VIP班介绍页
            { path: 'myComplain', component: MyComplain }, //我的投诉
            { path: 'vipDetail', component: VipDetail }, //智能VIP班
            { path: 'vipay', component: VipPay }, //支付报名费
            { path: 'upDetail', component: UpDetail }, //升级包
            { path: 'upay', component: Uppay }, //升级包支付
            { path: 'recommend', component: Recommend }, //推荐有礼
            { path: 'inviter', component: inviter }, // ==map-    邀请人
            { path: 'myMsg', component: MyMsg }, //我的消息
            { path: 'myMsgCard', component: MyMsgCard }, //消息
            { path: 'perfect_data', component: Perfect_Data }, //完善资料
            { path: 'mail_info', component: Mail_Information }, //邮寄资料
            { path: 'upVip', component: UpVip }, //升级包


            //优惠券功能屏蔽
            { path: 'preferential', component: Preferential }, //优惠活动
            { path: 'getCoupon', component: GetCoupon }, //优惠券领取
            { path: 'couponRules', component: couponRules }, //优惠券领取
            { path: 'myCoupon', component: MyCoupon }, //我的优惠券*/


        ],
        beforeEnter: (to, from, next) => {
            if (!window.valueFromNativeAll) {
                //调用native方法，本地调试注释
                tools.getNativeData().then(function(data) {
                    window.valueFromNativeAll = data;
                    //alert(JSON.stringify(window.valueFromNativeAll))
                    next();
                }, function() {
                    //出现公共错误页面提示刷新，重新获取native
                    alert("main.js getNativeData error");
                });
                 /*window.valueFromNativeAll = {
                     address: "Yurun University",
                     avatarurl: "https://duolunstorage.oss-cn-hangzhou.aliyuncs.com/studentPhoto/15101914093FQZK04U.jpg",
                     cityCode: "",
                     cityName: "南京市",
                     classType: 1,
                     coachId: "",
                     cardType: '身份证',
                     cardNo: "123",
                     email: "123",
                     gps: "31.937550,118.898390",
                     html5BaseUrl: "http://192.168.13.178:8083",
                     html5Flag: 0,
                     "html_version": 3,
                     isBackUpdateMessage: "",
                     isLogin: true,
                     isSelectCity: 0,
                     nickName: "动态普通班测试",
                     osVersion: "10.2",
                     phoneNo: "15999990000",
                     schoolCode: "doron",
                     schoolId: "5",
                     schoolName: "南京多伦学车分校",
                     schoolUrl: "https://testd.duolunxc.com",
                     studentId: "1239501",//2000593,2000580(A),2000487(B)
                     studentName: "现网学员看看",
                     subjectType: "-1",
                     token: "O8IFsS6ZH7nNArEmBY93EQ==",
                     version: "2.2.2",
                     sex: "1",
                     stuCode: "DR17110013"
                 }
                 next();*/
                /* window.valueFromNativeAll = {
                     address: "Yurun University",
                     avatarurl: "",
                     cityCode: "",
                     cityName: "南京市",
                     classType: 2,
                     coachId: "",
                     gps: "31.937550,118.898390",
                     html5BaseUrl: "http://192.168.13.178:8083",
                     html5Flag: 0,
                     "html_version": 3,
                     isBackUpdateMessage: "",
                     isLogin: true,
                     isSelectCity: 0,
                     nickName: "动态普通班测试",
                     osVersion: "10.2",
                     phoneNo: "15999990000",
                     schoolCode: "doron",
                     schoolId: "1",
                     schoolName: "南京多伦学车分校",
                     schoolUrl: "https://testd.duolunxc.com",
                     studentId: "1239501",//2000593,2000580(A),2000487(B)
                     studentName: "\U5b66\U5458SS",
                     subjectType: "4",
                     token: "hTna8VVj27OA%252Br0Kx9kxRA%253D%253D",
                     version: "2.2.2"
                 }
                 next();*/
                window.valueFromNativeAll = {
                      address : "Yurun University",
                      avatarurl : "",
                      cityCode: "",
                      cityName :"南京市",
                      classType :"",
                      coachId: "",
                      gps: "",
                      html5BaseUrl :"localhost:8081",
                      html5Flag: 0,
                      "html_version":3,
                      isBackUpdateMessage :"",
                      isLogin : true,
                      isSelectCity :0,
                      nickName :"动态普通班测试",
                      osVersion: "10.2",
                      phoneNo :"",
                      schoolCode: "",
                      schoolId: "",
                      schoolName: "",
                      schoolUrl: "https://tmainapp.duolunxc.com/mobileRest",
                      studentId : "",
                      studentName: "",
                      subjectType: "",
                      token :"hTna8VVj27OA%252Br0Kx9kxRA%253D%253D",
                      version :"2.2.2"
                  }
                next();
            } else {
                next();
            }
        }
    },{
        //教练版路由
        path: '/',
        redirect: '/index',
        component: Container,
        children: [
            // 首页
            { path: 'helloWorlds', component: require('./components/HelloWorld') },
        ],
        beforeEnter: (to, from, next) => {
            if (!window.valueFromNativeAll) {
                //调用native方法，本地调试注释
                tools.getNativeData(1).then(function(data) {
                    window.valueFromNativeAll = data;
                    //alert(JSON.stringify(window.valueFromNativeAll))
                    next();
                }, function() {
                    //出现公共错误页面提示刷新，重新获取native
                    alert("main.js getNativeData error");
                });
            } else {
                next();
            }
        }
    }]
});

window.autoHideTime = 2000;
window.bus = new Vue();
window.menuData = [
    { id: 0, imgSrc: "./static/img/menu_zxdt.png", imgUrl: "onlineAnswer", title: "在线答题" },
    { id: 1, imgSrc: "./static/img/menu_xxzl.png", imgUrl: "learn", title: "学习资料" },
    { id: 2, imgSrc: "./static/img/menu_kqmn.png", imgUrl: "simulateSchoolList", title: "考前模拟" },
    { id: 3, imgSrc: "./static/img/menu_xnyy.png", imgUrl: "order_Train", title: "训练预约" },
    { id: 4, imgSrc: "./static/img/menu_mnxl.png", imgUrl: "order_simulate", title: "模拟预约" },
    { id: 5, imgSrc: "./static/img/menu_llyy.png", imgUrl: "order_thoery", title: "理论预约" }, //使用考试预约图标
    { id: 6, imgSrc: "./static/img/menu_xxjl.png", imgUrl: "myLog/stuRecord", title: "学习记录" }, //使用新手指南图标
    { id: 7, imgSrc: "./static/img/menu_xfjl.png", imgUrl: "my_consumption/record_consume", title: "消费记录" },
    { id: 8, imgSrc: "./static/img/menu_jdcx.png", imgUrl: "myProcess", title: "我的进度" }
];

router.afterEach(route => {
    document.body.scrollTop = 0;
});

//window.bus = new Vue();
Vue.filter('formatName', function(name, subLength) {
    if (!subLength) {
        subLength = 5; //防止不传
    }
    if (name.length > subLength) {
        return name.slice(0, subLength) + "...";
    } else {
        return name;
    }
});
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

/*window.preventTouch2 = function() {
    event.preventDefault();
};*/