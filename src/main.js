import Vue from 'vue'
import VueRouter from 'vue-router'
import VConsole from 'vconsole'

import App from './App'
import Container from './components/Container'
import httpService from './common/httpService'
import httpServiceUrl from './common/httpServiceUrl'
import tools from './common/tools'
import config from './config'

const HelloWorld = r => require.ensure([], () => r(require('./components/HelloWorld')), 'HelloWorld');
const Index = r => require.ensure([], () => r(require('./components/Index')), 'Index');
const RegisterLogin = r => require.ensure([], () => r(require('./components/RegisterLogin')), 'RegisterLogin');
const StuCertification = r => require.ensure([], () => r(require('./components/StuCertification')), 'StuCertification');
const OrderIndex = r => require.ensure([], () => r(require('./components/OrderIndex')), 'OrderIndex');
const UserInfo = r => require.ensure([], () => r(require('./components/userInfo')), 'OrderIndex');
const TeamManage = r => require.ensure([], () => r(require('./components/teamManage')), 'teamManage');
const FeedBack = r => require.ensure([], () => r(require('./components/feedBack')), 'feedBack');
const Settings = r => require.ensure([], () => r(require('./components/settings')), 'settings');
const OrderImmediately = r => require.ensure([], () => r(require('./components/orderImmediately')), 'orderImmediately');
const SubmitOrder = r => require.ensure([], () => r(require('./components/submitOrder')), 'submitOrder');
const OrderDetail = r => require.ensure([], () => r(require('./components/orderDetail')), 'orderDetail');
const AfterSale = r => require.ensure([], () => r(require('./components/afterSale')), 'afterSale');
const Evaluate = r => require.ensure([], () => r(require('./components/evaluate')), 'evaluate');
const Recharge = r => require.ensure([], () => r(require('./components/recharge')), 'recharge');
const Balance = r => require.ensure([], () => r(require('./components/balance')), 'balance');
const ExpenseHistory = r => require.ensure([], () => r(require('./components/expenseHistory')), 'expenseHistory');
const Coupon = r => require.ensure([], () => r(require('./components/coupon')), 'coupon');
const PersonInfo = r => require.ensure([], () => r(require('./components/personInfo')), 'personInfo');
const SetPassword = r => require.ensure([], () => r(require('./components/setPassword')), 'setPassword');
const ApplySender = r => require.ensure([], () => r(require('./components/applySender')), 'applySender');
const RobOrder = r => require.ensure([], () => r(require('./components/robOrder')), 'robOrder');
const MyOrder = r => require.ensure([], () => r(require('./components/myOrder')), 'myOrder');
const MyEvaluate = r => require.ensure([], () => r(require('./components/myEvaluate')), 'myEvaluate');
const Withdraw = r => require.ensure([], () => r(require('./components/withdraw')), 'withdraw');

Vue.use(VueRouter);
new VConsole(); // 移动端日志打印工具

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/index',
    component: Container,
    children: [
      // 首页
      {path: 'helloWorld', component: HelloWorld},
      {path: 'hello', component: require('./components/Hello')},
      {path: 'home', component: require('./components/home')},
      {path: 'index', component: Index}, //首页
      {path: 'registerLogin', component: RegisterLogin}, //注册的第一个页面
      {path: 'stuCertification', component: StuCertification},//学生认证页面
      {path: 'orderIndex', component: OrderIndex},//用户订单列表首页
      {path: 'userInfo', component: UserInfo},// 用户信息
      {path: 'teamManage', component: TeamManage},// 团队管理
      {path: 'feedBack', component: FeedBack},// 意见反馈
      {path: 'settings', component: Settings},// 用户设置
      {path: 'orderImmediately', component: OrderImmediately},// 立即下单
      {path: 'submitOrder', component: SubmitOrder},// 提交订单
      {path: 'orderDetail', component: OrderDetail},// 订单详情
      {path: 'afterSale', component: AfterSale},// 售后
      {path: 'evaluate', component: Evaluate},// 评价
      {path: 'recharge', component: Recharge},// 充值
      {path: 'balance', component: Balance},// 余额
      {path: 'expenseHistory', component: ExpenseHistory},// 消费记录
      {path: 'coupon', component: Coupon},// 卡券
      {path: 'personInfo', component: PersonInfo},// 个人信息
      {path: 'setPassword', component: SetPassword},// 设置密码
      {path: 'applySender', component: ApplySender},// 申请成为派单员
      {path: 'robOrder', component: RobOrder},// 抢单
      {path: 'myOrder', component: MyOrder},// 我的订单
      {path: 'myEvaluate', component: MyEvaluate},// 我的评价
      {path: 'withdraw', component: Withdraw},// 提现
    ]
  }]
});

window.autoHideTime = 2000;
window.bus = new Vue();


// 获取微信重定向地址中的code值
function getWxCode() {
  let codeReg = /\?\S*code=(\S*)(?:&)?/;
  let href = window.location.href;
  let matches = href.match(codeReg);
  return matches ? matches[1] : '';
}

// 获取openid
function getOpenid(code) {
  if (!code) {
    //重定向获取code
    console.error('没有获取到code, 进行路由重定向');
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx950fa5385b73d05b&redirect_uri=http%3a%2f%2fwww.njtyxxkj.com%2fxdd%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  }

  if (!window.openid) {
    let params = {
      code
    };

    // 返回获取openid的promise对象
    return httpService.get(httpServiceUrl.weChatOpenId, params).then(res => {
      window.openid = res.openid;
      window.user_image_url = data.user_image_url;

      if (window.openid) {
        console.info('当前用户openid >>>>', window.openid)
      } else {
        console.error('用户openid为空')
      }
    }).catch(err => {
      Toast(err.msg)
    })
  }
}



router.beforeEach((to, from, next) => {

  //window.openid = '18013872740';
  // window.openid = 'o1SGg0oogq7X27qURVtFWqZNsAS0';
  //window.openid = 'o1SGg0tcrZQ3zCBESPja6CY3-Fok';
  // let code = '001O0hXR1uQSK61tNe1S1KotXR1O0hXM';

  if (!window.openid) {
    let code = getWxCode();
    getOpenid(code).then(() => {
      guard();
    })
  } else {
    guard();
  }

  function guard() {
    if (!window.wxUserData && (to.path !== '/registerLogin' && to.path !== '/stuCertification')) {
      // 获取用户信息
      console.log('开始获取用户信息');
      tools.getUserData().then(function (data) {
        // 如果当前用户已经注册过了
        // 将用户信息挂载到全局属性上面
        console.log('用户信息 >>', data);
        window.wxUserData = data;
        // 跳转
        next();
      }, function () {
        console.log('用户尚未注册，跳转注册页');
        // 如果用户尚未注册则跳转到注册页面
        next({
          path: '/registerLogin',
          replace: true
        })
      });
    } else {
      console.log('存在用户信息, 自然跳转');
      next();
    }
  }
});

router.afterEach(route => {
  document.body.scrollTop = 0;
});

//window.bus = new Vue();
Vue.filter('formatName', function (name, subLength) {
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
