import httpService from './httpService';
import httpServiceUrl from './httpServiceUrl';
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
window.Request = function (key) {
  //var retValue = (decodeURI(window.location.search).match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
  var url = window.location.hash.indexOf('?') == -1 ? window.location.search : window.location.hash
  var getStr = "?" + decodeURI(url).split("?")[1];
  var retValue = (getStr.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
  return (retValue == null ? "" : retValue);
};

window.quitUrl = function () {

};

var openid = Request("openid") == "" ? "doron_test_openid" : Request("openid");

var appId = Request("appId") == "" ? "doron_test_appId" : Request("appId");


window.printlog = function (logstring) {
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

window.changeHtml5Hash = function (getThis, getPath, params) {
  if (localStorage.getItem("netWorkStatus_bolck") == "true") {
    Toast({
      message: commonToast["connectFail"],
      position: 'bottom',
      duration: 2000
    });
  } else {
    getThis.$router.push({path: getPath, query: params});
  }
};
var showCover = true;
window.Toast = function (getParam) {
  return new definedToast(getParam);
};
var definedToast = function (getParam) {
  //param可能是一个直接展示的字符串，也可能是一个对象（都要处理）
  var param = {
    message: "",
    duration: 2000
  };
  var self = this;
  if (typeof getParam == 'string') {
    param.message = getParam;
  }
  if (typeof getParam == 'object') {
    //防止message和duration为空的情况
    if (getParam.message) {
      param.message = getParam.message
    }
    if (getParam.duration) {
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
  if (param.message.length > 11) {
    //大于十个字，强提示
    MessageBox({
      title: '',
      message: param.message,
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: '确定'
    }).then(function (type) {
    });
    return;
  } else {
    //小于十个字，弱提示
    param.duration = 1000;
  }


  if (param.message.length == 0) {
    return;
  }
  if (document.getElementsByClassName("definedToast").length < 1) {
    var divToast = document.createElement("div");
    document.body.appendChild(divToast);
    divToast.className = 'definedToast';
    divToast.id = 'definedToast';
  }
  var isSame = false;
  if (document.getElementsByClassName("innerToastDiv").length > 0) {
    for (var j = 0; j < document.getElementsByClassName("innerToastDiv").length; j++) {
      if (param.message == document.getElementsByClassName("innerToastDiv")[j].innerText) {
        isSame = true;
      }
    }
  }
  if (isSame) {
    return;
  }
  this.innerToastDiv = document.createElement("div");
  document.getElementById("definedToast").appendChild(this.innerToastDiv);
  this.innerToastDiv.className = 'innerToastDiv';
  //this.innerToastDiv.innerHTML =' <div class="center"> <div class="contents">'+ param.message+'</div></div>';
  this.innerToastDiv.innerText = param.message;
  document.getElementById('wholeCover').style.display = 'block';
  showCover = false;

  setTimeout(function () {
    document.getElementById("definedToast").removeChild(self.innerToastDiv);
    if (document.getElementsByClassName("innerToastDiv").length < 1) {
      document.getElementById('wholeCover').style.display = 'none';
      showCover = true;
    }
  }, param.duration)

};
window.Indicator = {
  open: function (param) {
    document.getElementById('wholeCover').style.display = 'block';
    indicator.open(param);
  },
  close: function () {
    indicator.close();
    if (showCover) {
      document.getElementById('wholeCover').style.display = 'none';
    }
  }
};
//监测断网情况
window.getNetChange = function (data) {
  //键：netWorkStatus  参数：0—断网；1—Wi-Fi；2—4g
  //sendAction({action: "repeatedNetworkStatus"});//告知native前端已经收到网络变化信息
  if (data.netWorkStatus == 0 || data.netWorkStatus == -1) {
    //window.netWorkStatus_bolck = true;//断网

    //因为总是有一点概率无法检测到网络情况，先屏蔽该功能

  } else {
    window.netWorkStatus_bolck = false;//有网
  }
  window.netWorkStatus = data.netWorkStatus;//网络状况
  localStorage.setItem("netWorkStatus_bolck", window.netWorkStatus_bolck);
  if (window.netWorkStatus_bolck) {
    Toast({
      message: commonToast["connectFail"],
      position: 'bottom',
      duration: 2000
    });
  }
};
//监测token变化
window.getChangeToken = function (data) {
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

window.goUrl = function (goUrlParam, isFromBind) {
  //如果是直接跳网页，那么直接跳转
  if (!goUrlParam.hashUrl) {
    window.location.href = goUrlParam.url;
    return;
  }
  if(!goUrlParam.params){
     goUrlParam.params = {};
  }
  if (window.openid||Request(openid)) {
    console.log(window.openid);
     goUrlParam.params.openid = window.openid?window.openid:Request(openid);
    //goUrlParam.params.appId = window.appId;
  }
  if (goUrlParam.pushType == 'replace') {
    //如果存在pushType为1,说明用replace跳转
    goUrlParam.getThis.$router.replace({path: "/" + goUrlParam.hashUrl, query: goUrlParam.params});
  } else {
    goUrlParam.getThis.$router.push({path: "/" + goUrlParam.hashUrl, query: goUrlParam.params});
  }
};

window.sendAction = function (param) {

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
window.getLongDistance = function (lon1, lat1, lon2, lat2) {
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
  ostMessage: function () {
    var json = {"action": "get", "isBackNeedRefresh": "", "url": ""};
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

  getUserData: function () {
    //获取学员信息接口
    let getUrl = httpServiceUrl.login;
    let params = {
      openid: window.openid
    };
    console.log(params, '请求用户信息参数')
    return new Promise(function (resolve, reject) {
      httpService.get(getUrl, params).then(function (data) {
        resolve(window.wxUserData = data);
      }).catch(function (data) {
        reject(data);
      });
    });
  },
  getCommonToastVal: function (getCode, getVal) {
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


  utf16toEntities: function (str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    // 检测utf16字符正则
    str = str.replace(patt, function (char) {
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
