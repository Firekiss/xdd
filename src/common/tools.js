import httpService from './httpService';
import httpServiceUrl from './httpServiceUrl';
import commonToast from './commonToast';
import config from '../config';
import Vue from 'vue';
import indicator from 'mint-ui/lib/indicator';
import MessageBox from 'mint-ui/lib/message-box';
Vue.component(MessageBox.name, MessageBox);

var timeoutTimer = null;
var DEF_PI = 3.14159265359; // PI
var DEF_2PI = 6.28318530712; // 2*PI
var DEF_PI180 = 0.01745329252; // PI/180.0
var DEF_R = 6370693.5; // radius of earth
//var indexNum = 0;
window.deviceType = ""; //因为ostMessage不会每次都调用
window.version = null; //用来接收native的版本号
window.netWorkStatus = 2; //默认有网非wifi
window.netWorkStatus_bolck = false; //默认有网,true表示断网，false有网


//用于获取url地址？号后面的参数值
window.Request = function(key) {
    //var retValue = (decodeURI(window.location.search).match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    var url = window.location.hash.indexOf('?') == -1 ? window.location.search:window.location.hash
    var getStr = "?"+decodeURI(url).split("?")[1];
    var retValue = (getStr.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    return (retValue == null ? "" : retValue);
};

window.quitUrl = function() {

};

var openid = Request("openid") == "" ? "doron_test_openid" : Request("openid");

var appId = Request("appId") == "" ? "doron_test_appId" : Request("appId");

window.ostMessage = function() {
    var json = { "action": "get", "isBackNeedRefresh": "", "url": "" };
    deviceType = Request("deviceType") == "" ? "pc" : Request("deviceType"); //手机系统类型：android，IOS,根据native传过来的deviceType，来调用不同的native方法
    switch (deviceType.toLowerCase()) {
        case "ios":
            window.webkit.messageHandlers.oAction.postMessage(json); // 调用ios的 Native定义的方法
            break;
        case "android":
            json = "{\"action\": \"get\", \"isBackNeedRefresh\": \"\", \"url\": \"\"}";
            window.oAction.postMessage(json); // 调用android  的 Native定义的方法
            break;
        case "pc":
            console.log("此处PC端测试用");
            break;
    }
};

window.printlog = function(logstring) {
    var jsonOpenUrl = {
        "action": "showLog",
        "logString": logstring
    };
    switch (deviceType.toLowerCase()) {
        case "ios":
            window.webkit.messageHandlers.oAction.postMessage(jsonOpenUrl); // 调用ios的 Native定义的方法
            break;
        case "android":
            jsonOpenUrl = "{" +
                "\"action\": \"showLog\"," +
                "\"logString\":\"" + logstring + "\"" +
                "}";
            window.oAction.postMessage(jsonOpenUrl); // 调用android  的 Native定义的方法
            break;
    }
};

window.changeHtml5Hash = function(getThis,getPath,params){
    if(localStorage.getItem("netWorkStatus_bolck")=="true"){
        Toast({
            message: commonToast["connectFail"],
            position: 'bottom',
            duration: 2000
        });
    }else{
        getThis.$router.push({path:getPath,query:params});
    }
};
var showCover = true;
window.Toast = function(getParam){
    return new definedToast(getParam);
};
var definedToast = function(getParam) {
     //param可能是一个直接展示的字符串，也可能是一个对象（都要处理）
     var param = {
        message:"",
        duration:2000
     };
    var self = this;
    if(typeof getParam=='string'){
        param.message = getParam;
    }
    if(typeof getParam=='object'){
        //防止message和duration为空的情况
        if(getParam.message){
            param.message = getParam.message
        }
        if(getParam.duration){
            param.duration = getParam.duration
        }
    }
    //根据提示语文字的长度，设定时间
    /*if(param.duration<5001){
        if (param.message.length > 30){
            param.duration = 5000;
        }else if(param.message.length > 15){
            param.duration = 3000;
        }else{
            param.duration = 2000;
        }
    }*/

    //根据提示语文字的长度，十个字以下弱提示，十个字以上强提示
    if(param.message.length>11){
        //大于十个字，强提示
        MessageBox({
            title: '',
            message: param.message,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: '确定'
        }).then(function(type) {});
        return;
    }else{
        //小于十个字，弱提示
        param.duration = 1000;
    }


    if(param.message.length==0){
        return;
    }
    if(document.getElementsByClassName("definedToast").length<1){
        var divToast=document.createElement("div");
        document.body.appendChild(divToast);
        divToast.className = 'definedToast';
        divToast.id = 'definedToast';
    }
    var isSame = false;
    if(document.getElementsByClassName("innerToastDiv").length>0){
        for(var j = 0;j<document.getElementsByClassName("innerToastDiv").length;j++){
            if(param.message==document.getElementsByClassName("innerToastDiv")[j].innerText){
                isSame = true;
            }
        }
    }
    if(isSame){ 
        return;
    }
    this.innerToastDiv=document.createElement("div");
    document.getElementById("definedToast").appendChild(this.innerToastDiv);
    this.innerToastDiv.className = 'innerToastDiv';
    //this.innerToastDiv.innerHTML =' <div class="center"> <div class="contents">'+ param.message+'</div></div>';
    this.innerToastDiv.innerText =param.message;
    document.getElementById('wholeCover').style.display = 'block';
    showCover = false;

    setTimeout(function(){
        document.getElementById("definedToast").removeChild(self.innerToastDiv);
        if(document.getElementsByClassName("innerToastDiv").length<1){
            document.getElementById('wholeCover').style.display = 'none';
            showCover = true;
        }
    },param.duration)

};
window.Indicator = {
    open:function(param){
        document.getElementById('wholeCover').style.display = 'block';
        indicator.open(param);
    },
    close:function(){
        indicator.close();
        if(showCover){
            document.getElementById('wholeCover').style.display = 'none';
        }
    }
};
//监测断网情况
window.getNetChange = function(data) {
    //键：netWorkStatus  参数：0—断网；1—Wi-Fi；2—4g
    //sendAction({action: "repeatedNetworkStatus"});//告知native前端已经收到网络变化信息
    if(data.netWorkStatus==0||data.netWorkStatus==-1){
        //window.netWorkStatus_bolck = true;//断网

        //因为总是有一点概率无法检测到网络情况，先屏蔽该功能

    }else{
        window.netWorkStatus_bolck = false;//有网
    }
    window.netWorkStatus = data.netWorkStatus;//网络状况
    localStorage.setItem("netWorkStatus_bolck",window.netWorkStatus_bolck);
    if(window.netWorkStatus_bolck){
        Toast({
            message: commonToast["connectFail"],
            position: 'bottom',
            duration: 2000
        });
    }
    /*  var showMsg="";
      switch(data.netWorkStatus){
          case 0:
              showMsg = "网络已断开";
              break;
          case 1:
              showMsg = "";//已切换至Wi-Fi
              break;
          case 2:
              showMsg = "";//已切换至4G
              break;
      }
      if(showMsg!=""){
          Toast({
              message: showMsg,
              position: 'bottom',
              duration: 2000
          });
      }*/
};
//监测token变化
window.getChangeToken = function(data) {
    console.log(JSON.stringify(data));
    valueFromNativeAll.token = data.updateToken;
};

//action ： push , back ; push表示推屏，即打开新窗口 ， back表示返回
//isBackNeedRefresh 表示返回是否需要刷新, 0表示不刷新，1表示刷新
//url表示需要跳转的url地址
//hashUrl需要跳转的路由path
//title 下个页面的标题
//needShowTitleBar 是否需要显示标题栏
//backPageNum 退回几屏，从1开始（上一屏是1），只对back有效
//refreshIndex 刷新第几层页面，只对isRefresh生效
//backFunction   安卓物理键返回所掉的方法
//window.goUrl = function(action, isBackNeedRefresh, url, hashUrl, title, needShowTitleBar, backPageNum, refreshIndex, webViewForbiddenScroll) {

    window.goUrl = function(goUrlParam, isFromBind){
    //如果是直接跳网页，那么直接跳转
    if(!goUrlParam.hashUrl){
        window.location.href = goUrlParam.url;
        return;
    }

    //有openid说明是微信的跳转
/*    var params = {};
    var getParamsSplit = goUrlParam.url.split("index.html?");
    if(getParamsSplit.length>1){
        var getParamsList = getParamsSplit[1].split("&");
        for(var i=0;i<getParamsList.length;i++){
            var getParamItem = getParamsList[i].split("=");
            params[getParamItem[0]] = getParamItem[1];
        }
    }*/
    if(Request('openid')){
        goUrlParam.params.openid = openid;
        goUrlParam.params.appId = appId;
    }
    if(goUrlParam.pushType=='replace'){
        //如果存在pushType为1,说明用replace跳转
        goUrlParam.getThis.$router.replace({ path: "/" + goUrlParam.hashUrl, query: goUrlParam.params });
    }else{
        goUrlParam.getThis.$router.push({ path: "/" + goUrlParam.hashUrl, query: goUrlParam.params });
    }
    return;

    //每次推屏前都判断网络情况

    if(localStorage.getItem("netWorkStatus_bolck")=="true"){
        Toast({
            message: commonToast["connectFail"],
            position: 'bottom',
            duration: 2000
        });
        return;
    }
    //页面跳转加上版本号
    var html_version = window.html_version;
    if (goUrlParam.url&&goUrlParam.url.indexOf("?") > -1) {
        goUrlParam.url = goUrlParam.url + "&deviceType=" + deviceType + "&htmlVersion=" + html_version + "#/" + goUrlParam.hashUrl;
    } else {
        goUrlParam.url = goUrlParam.url + "?deviceType=" + deviceType + "&htmlVersion=" + html_version + "#/" + goUrlParam.hashUrl;
    }
    var jsonOpenUrl = {
        "action": goUrlParam.action!=undefined?goUrlParam.action:"",
        "isBackNeedRefresh": goUrlParam.isBackNeedRefresh!=undefined?goUrlParam.isBackNeedRefresh:"",
        "url": goUrlParam.url!=undefined?goUrlParam.url:"",
        "title": goUrlParam.title!=undefined?goUrlParam.title:"",
        "needShowTitleBar": goUrlParam.needShowTitleBar!=undefined?goUrlParam.needShowTitleBar:"",
        "backPageNum": goUrlParam.backPageNum!=undefined?goUrlParam.backPageNum:"",
        "isRefreshPageIndexDic": goUrlParam.isRefreshPageIndexDic!=undefined?goUrlParam.isRefreshPageIndexDic:"",
        "webViewForbiddenScroll": goUrlParam.webViewForbiddenScroll!=undefined?goUrlParam.webViewForbiddenScroll:"",
        "backFunction":goUrlParam.backFunction!=undefined?goUrlParam.backFunction:""
    };
    switch (deviceType.toLowerCase()) {
        case "ios":
            window.webkit.messageHandlers.oAction.postMessage(jsonOpenUrl); // 调用ios的 Native定义的方法
            break;
        case "android":
           /* if (jsonOpenUrl.backPageNum) {
                jsonOpenUrl = "{" +
                    "\"action\": \"" + jsonOpenUrl.action + "\"," +
                    "\"isBackNeedRefresh\":\"" + jsonOpenUrl.isBackNeedRefresh + "\"," +
                    "\"url\":\"" + jsonOpenUrl.url + "\"," +
                    "\"title\":\"" + jsonOpenUrl.title + "\"," +
                    "\"needShowTitleBar\":\"" + jsonOpenUrl.needShowTitleBar + "\"," +
                    "\"backPageNum\":\"" + jsonOpenUrl.backPageNum + "\"," +
                    "\"isRefreshPageIndexDic\":\"" + jsonOpenUrl.isRefreshPageIndexDic + "\"," +
                    "\"androidBackKeyFunction\":\"" + jsonOpenUrl.androidBackKeyFunction + "\"" +
                    "}";
            } else {
                jsonOpenUrl = "{" +
                    "\"action\": \"" + jsonOpenUrl.action + "\"," +
                    "\"isBackNeedRefresh\":\"" + jsonOpenUrl.isBackNeedRefresh + "\"," +
                    "\"url\":\"" + jsonOpenUrl.url + "\"," +
                    "\"title\":\"" + jsonOpenUrl.title + "\"," +
                    "\"needShowTitleBar\":\"" + jsonOpenUrl.needShowTitleBar + "\"," +
                    "\"isRefreshPageIndexDic\":\"" + jsonOpenUrl.isRefreshPageIndexDic + "\"," +
                    "\"androidBackKeyFunction\":\"" + jsonOpenUrl.androidBackKeyFunction + "\"" +
                    "}";
            }*/
            window.oAction.postMessage(JSON.stringify(jsonOpenUrl)); // 调用android  的 Native定义的方法
            break;
        case "pc":
            window.open(jsonOpenUrl.url);
            break;
    }
};

window.sendAction = function(param) {

    //2016.03.04引入版本号的概念，此版本新引入action的值 isRefresh

    if (!window.version && param.action === 'isRefresh') {
        return;
    }
    switch (deviceType.toLowerCase()) {
        case "ios":
            window.webkit.messageHandlers.oAction.postMessage(param); // 调用ios的 Native定义的方法
            break;
        case "android":
            param.isRefreshPageIndexDic = param.isRefreshPageIndexDic + '';
            window.oAction.postMessage(JSON.stringify(param)); // 调用android  的 Native定义的方法
            break;
        case "pc":
            window.open(param.url);
            break;
    }
};
window.getLongDistance = function(lon1, lat1, lon2, lat2) {
    var ew1, ns1, ew2, ns2;
    var distance;
    // 角度转换为弧度
    ew1 = lon1 * DEF_PI180;
    ns1 = lat1 * DEF_PI180;
    ew2 = lon2 * DEF_PI180;
    ns2 = lat2 * DEF_PI180;
    // 求大圆劣弧与球心所夹的角(弧度)
    distance = Math.sin(ns1) * Math.sin(ns2) + Math.cos(ns1) * Math.cos(ns2) * Math.cos(ew1 - ew2);
    // 调整到[-1..1]范围内，避免溢出
    if (distance > 1.0)
        distance = 1.0;
    else if (distance < -1.0)
        distance = -1.0;
    // 求大圆劣弧长度
    distance = (DEF_R * Math.acos(distance)).toFixed(0);
    return distance;
};




export default {
    ostMessage: function() {
        var json = { "action": "get", "isBackNeedRefresh": "", "url": "" };
        deviceType = Request("deviceType") == "" ? "pc" : Request("deviceType"); //手机系统类型：android，IOS,根据native传过来的deviceType，来调用不同的native方法
        switch (deviceType.toLowerCase()) {
            case "ios":
                window.webkit.messageHandlers.oAction.postMessage(json); // 调用ios的 Native定义的方法
                break;
            case "android":
                json = "{\"action\": \"get\", \"isBackNeedRefresh\": \"\", \"url\": \"\"}";
                window.oAction.postMessage(json); // 调用android  的 Native定义的方法
                break;
            case "pc":
                console.log("此处PC端测试用");
                break;
        }
    },
    
    getNativeData: function(isFromEmp) {
        if (!window.valueFromNativeAll) {
            window.valueFromNativeAll={};
        }
        window.valueFromNativeAll.serverBaseUrl=config.serverBaseUrl;//接口调用统一路径
        window.valueFromNativeAll.html5BaseUrl=config.html5BaseUrl;//h5页面跳转路径
        console.log(Request('openid'));
        if(Request('openid')){
            //有openid说明是微信访问，调取接口获取公共参数
            var type_wc = 2;//1 ：教练    2 ： 学员
            var getUrl = httpServiceUrl.getMwStudentData;//获取学员信息接口
            if(isFromEmp){
                getUrl = httpServiceUrl.getMwCoachData;//获取教练信息接口
                type_wc = 1;
            }
            var params = {
                openid: Request('openid'),
                type_wc: type_wc,
                needBind: 0
            };
            window.valueFromNativeAll.type_wc = type_wc;
            return new Promise(function(resolve, reject) {
                httpService.get(getUrl, params).then(function(data) {
                        console.log(JSON.stringify(data));
                        //window.valueFromNativeAll.gps = data.gps ? data.gps : "32.064735,118.802891";//gps后台不返回。由首页提供
                        window.valueFromNativeAll.schoolId = data.schoolId ? data.schoolId : Request('schoolId');
                        window.valueFromNativeAll.schoolCode = data.schoolCode;
                        window.valueFromNativeAll.studentId = data.studentId;
                        window.valueFromNativeAll.address = data.address;
                        window.valueFromNativeAll.phoneNo = data.phoneNo;
                        window.valueFromNativeAll.subjectType = data.subjectType;
                        window.valueFromNativeAll.cityCode = data.cityCode;
                        window.valueFromNativeAll.studentName = data.studentName;
                        window.valueFromNativeAll.avatarurl = data.avatarurl;
                        window.valueFromNativeAll.schoolName = data.schoolName;
                        window.valueFromNativeAll.isLogin = data.isBind;
                        window.valueFromNativeAll.nickName = data.nickName;
                        window.valueFromNativeAll.classType = data.classType;
                        window.valueFromNativeAll.cardType = data.cardType;
                        window.valueFromNativeAll.studentCardNo = data.studentCardNo;
                        window.valueFromNativeAll.cardNo = data.cardNo;
                        window.valueFromNativeAll.email = data.email;
                        window.valueFromNativeAll.address = data.address;
                        window.valueFromNativeAll.birthday = data.birthday;
                        window.valueFromNativeAll.sex = data.sex;
                        window.valueFromNativeAll.userId = data.userId;
                        window.valueFromNativeAll.type_wc = type_wc;
                        window.valueFromNativeAll.flowType = data.flowType;
                        window.valueFromNativeAll.timeStemp = new Date().getTime();
                        localStorage.setItem('valueFromNativeAll', JSON.stringify(window.valueFromNativeAll));
                        resolve(window.valueFromNativeAll);
                }).catch(function(data){
                    reject(data);
                });
            });
            return;
        }
        self.ostMessage();
        return new Promise(function(resolve, reject) {
            window.callBack = function(para) {
               /* if (para && !para.schoolUrl) {
                    para.schoolUrl = "https://testmainapp.duolunxc.com";
                    //para.schoolUrl = "https://mainapp.duolunxc.com";
                    para.html5BaseUrl = "https://testmainapp.duolunxc.com/emp_2";
                    //para.html5BaseUrl = "https://mainapp.duolunxc.com/emp";
                }*/
                if (!window.version && 　para.native.version)
                    window.version = para.native.version;
                if (!window.html_version && para.native.html_version)
                    window.html_version = para.native.html_version;

                    console.log("native返回的参数：");
                    console.log(JSON.stringify(para));
                    window.valueFromNativeAll = {
                        address: para.native.address,
                        avatarurl: "",
                        photoUrl:"",
                        cityCode: para.native.cityCode,
                        cityName: para.native.cityName,
                        classType: "",
                        gps: para.native.gps,
                        html5BaseUrl: para.native.html5BaseUrl,
                        isLogin: para.native.isLogin,
                        isSelectCity: para.native.isSelectCity,
                        nickName: "",
                        osVersion: para.native.osVersion,
                        phoneNo: "",
                        schoolCode: "",
                        schoolId: "",
                        schoolName: "",
                        schoolUrl: "",
                        studentId: "",
                        studentName: "",
                        subjectType: "",
                        token: para.native.token,
                        version: para.native.version,
                        flowType:""
                    }
                    if (para.native.isLogin == 1) {
                    	
                        window.valueFromNativeAll.avatarurl = para.body.avatarData;
                        window.valueFromNativeAll.photoUrl = para.body.photoUrl;
                        window.valueFromNativeAll.classType = para.body.classType;
                        window.valueFromNativeAll.nickName = para.body.nickName;
                        window.valueFromNativeAll.phoneNo = para.head.phoneNo; //后台返回的是head
                        window.valueFromNativeAll.schoolCode = para.body.schoolCode;
                        window.valueFromNativeAll.schoolId = para.body.schoolId;
                        window.valueFromNativeAll.schoolName = para.body.schoolName;
                        window.valueFromNativeAll.schoolUrl = para.body.schoolUrl;
                        window.valueFromNativeAll.studentId = para.body.stuId;
                        window.valueFromNativeAll.studentName = para.body.name;
                        window.valueFromNativeAll.subjectType = para.body.subjectType==undefined?"":para.body.subjectType;
                        window.valueFromNativeAll.flowType = para.body.flowType;
                    }
                localStorage.setItem('valueFromNativeAll', JSON.stringify(window.valueFromNativeAll));
                resolve(window.valueFromNativeAll);
                setTimeout(function() {
                    //reject();
                }, 2000);
            };
        });
    },
    getCommonToastVal: function(getCode, getVal) {
        var replaceVal = getCode.split("{}");
        if ((replaceVal.length - 1) != getVal.length) {
            return getCode;
        }
        var returnVal = "";
        for (var i = 0; i < getVal.length; i++) {
            returnVal += replaceVal[i] + getVal[i];
        }
        returnVal += replaceVal[replaceVal.length - 1];
        console.log(returnVal);
        return returnVal;
    },



    utf16toEntities: function(str) {
        var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
        // 检测utf16字符正则
        str = str.replace(patt, function(char) {
            var H, L, code;
            if (char.length === 2) {
                // 取出高位
                H = char.charCodeAt(0);
                // 取出低位
                L = char.charCodeAt(1);
                // 转换算法
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;

                return "&#" + code + ";";
            } else {
                return char;
            }
        });
        return str;
    },

}
