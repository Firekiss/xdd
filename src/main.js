import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Container from './components/Container'
import httpService from './common/httpService'
import tools from './common/tools'
import commonToast from './common/commonToast'
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

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index',
        component: Container,
        children: [
            // 首页
            { path: 'helloWorld', component: HelloWorld },
            { path: 'hello', component: require('./components/Hello') },
            { path: 'home', component: require('./components/home') },
            { path: 'index', component: Index }, //首页
            { path: 'registerLogin',component: RegisterLogin }, //注册的第一个页面
            { path: 'stuCertification',component: StuCertification },//学生认证页面
            { path: 'orderIndex',component: OrderIndex },//学生认证页面
            { path: 'userInfo',component: UserInfo },// 用户信息
            { path: 'teamManage',component: TeamManage },// 团队管理
            { path: 'feedBack',component: FeedBack },// 意见反馈
            { path: 'settings',component: Settings },// 用户设置
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
            } else {
                next();
            }
        }
    }]
});

window.autoHideTime = 2000;
window.bus = new Vue();

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
