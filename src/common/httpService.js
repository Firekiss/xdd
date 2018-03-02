/**
 * Created by hexiaolei on 2016/7/4.
 */
import config from '../config';
import Vue from 'vue';
import VueResource from 'vue-resource';
/*import Indicator from 'mint-ui/lib/indicator';*/
/*import 'mint-ui/lib/indicator/style.css';*/
import commonToast from './commonToast';
import MessageBox from 'mint-ui/lib/message-box';
import 'mint-ui/lib/message-box/style.css';
import tools from './tools';
import axios from 'axios';
import URLSearchParams from 'url-search-params';
Vue.component(MessageBox.name, MessageBox);

Vue.use(VueResource);
//Vue.http.interceptors.push(httpInterceptor);
//var timeoutTimer = null;
var getTimeCount =0;
var indicatorTime_close =null;
var indicatorCounter = 0;
export default {
	post: function(param_url, data, redirect_url,noCover) {
        data.stu_token = encodeURIComponent(valueFromNativeAll.token);
/*        if(data.hasOwnProperty("coachId")){
           delete data.coachId;
        }
        if(data.hasOwnProperty("employeeId")){
           delete data.employeeId ;
        }        
        if(data.hasOwnProperty("school_code")){
           delete data.school_code ;
        }*/
        if(data.studentId){
            delete data.studentId;
        }
        data.user_id = valueFromNativeAll.studentId;
        if(Request("openid")){
           data.user_id = valueFromNativeAll.userId;
           data.openid = Request("openid");
           data.type_wc = valueFromNativeAll.type_wc;
        }
        var that = this;
        var url = config.serverBaseUrl + param_url;
        var timestamp = new Date();
        var type = valueFromNativeAll.type_wc; // 类型 1 ： 教练 2 ： 学员
        data.timestamp = timestamp.getTime();
        if(!noCover&&!(param_url.indexOf("getMwStudentData")>-1)){
          //var indicatorTime = setTimeout(function(){
            /*if(indicatorTime_close){
                clearTimeout(indicatorTime_close);
            }*/
            Indicator.open({
                text: data.toast,
                spinnerType: 'fading-circle'
            });
            indicatorCounter++;
          //},100);
        }
        /*var dataParams = new URLSearchParams();
        for ( var p in data ){
            dataParams.append(p, data[p]);
        }*/
        return new Promise(function(resolve, reject) {
          var timeoutTimer = setTimeout(function(){
              Indicator.close();
              Toast({
                  message: commonToast.timeout,
                  position: 'bottom',
                  duration:2000
              });
              reject({msg:commonToast["timeout"]});
          }, 20000);
            axios({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: url,
                method: 'post',
                data: JSON.stringify(data)
            }).then(function(res) {
                clearTimeout(timeoutTimer);
                //clearTimeout(indicatorTime);
                //indicatorTime_close = setTimeout(function(){
                    if(!(param_url.indexOf("getMwStudentData")>-1)){
                        indicatorCounter--;
                        if(indicatorCounter<1){
                            Indicator.close();
                        }
                    }
                    

                //},200);
                if(typeof res.data == 'string'){
                    res.data = JSON.parse(res.data);
                }
                if (res.data.code == "1008") {
                    tools.getNativeData().then(function (mydata) {
                        valueFromNativeAll.token = mydata.token;
                        that.post(param_url, data).then(
                         /*   function (data) {
                                resolve(data);
                            }*/
                        );
                    });
                } else if (res.data.code == "1006") {
                    if(getTimeCount==0){
                        getTimeCount=1;
                        tools.getNativeData().then(function (mydata) {
                            valueFromNativeAll.token = mydata.token;
                            that.post(param_url, data).then(
                               /* function (data) {
                                    resolve(data);
                                }*/
                            );
                        });
                    }else{
                        getTimeCount=0;
                        var goUrlParam = {
                            "action": "login"
                        };
                        goUrl(goUrlParam);
                        //goUrl('login',0,'','','',0);
                    }
                }else if (res.data.code == "3001") { // openid is not binded
                    // coach is not binded
                    if (type == 1) {
                        MessageBox({
                            title: '',
                            message: '您还没有绑定微信,是否去绑定？',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonClass:"confirmButton-sure",
                            cancelButtonClass:"confirmButton-cancel",
                            cancelButtonText: '否',
                            confirmButtonText: '是'
                        }).then(function(type) {
                            if (type == "confirm") {
                                window.location.href = valueFromNativeAll.html5BaseUrl + "/index.html#/emp_bind?openid=" + Request('openid')+"&appId="+Request('appId');
                                //goUrl(goUrlParam);
                            }else{
                                WeixinJSBridge.call('closeWindow');
                            }

                        });
                        //alert("coach is not binded");
                    }
                    // student is not binded
                    if (type == 2) {
                        MessageBox({
                            title: '',
                            message: '您还没有绑定微信,是否去绑定？',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonClass:"confirmButton-sure",
                            cancelButtonClass:"confirmButton-cancel",
                            cancelButtonText: '否',
                            confirmButtonText: '是'
                        }).then(function(type) {
                            if (type == "confirm") {
                                window.location.href = valueFromNativeAll.html5BaseUrl + "/index.html#/stu_bind?openid=" + Request('openid')+"&appId="+Request('appId');
                                //goUrl(goUrlParam);
                            }else{
                                WeixinJSBridge.call('closeWindow');
                            }

                        });
                    }
                }else if (res.data.code == "1") {
                    if(data.isBackAllData){
                        resolve(res.data);
                    }else{
                        resolve(res.data.data);
                    }
                }else {
                    reject(res.data);
                }
            }).catch(function(res) {
                clearTimeout(timeoutTimer);
                //clearTimeout(indicatorTime);
                //indicatorTime_close = setTimeout(function(){
                if(!(param_url.indexOf("getMwStudentData")>-1)){
                    indicatorCounter--;
                    if(indicatorCounter<1){
                        Indicator.close();
                    }
                }
                //},200);
                if(localStorage.getItem("netWorkStatus_bolck")=="true"){
                    Toast({
                        message: commonToast["connectFail"],
                        position: 'bottom',
                        duration: 2000
                    });
                    reject({msg:commonToast["connectFail"]});
                }else{
                    Toast({
                        message: commonToast["timeout"],
                        position: 'bottom',
                        duration: 2000
                    });
                    reject(res.data);
                }
            });
        });
    },
//  post: function(param_url, data, redirect_url,noCover) {
//      data.stu_token = encodeURIComponent(valueFromNativeAll.token);
///*        if(data.hasOwnProperty("coachId")){
//         delete data.coachId;
//      }
//      if(data.hasOwnProperty("employeeId")){
//         delete data.employeeId ;
//      }        
//      if(data.hasOwnProperty("school_code")){
//         delete data.school_code ;
//      }*/
//      if(data.studentId){
//          delete data.studentId;
//      }
//      data.user_id = valueFromNativeAll.studentId;
//      var that = this;
//      var url = config.serverBaseUrl + param_url;
//      var timestamp = new Date();
//      var type = data.type_wc; // 类型 1 ： 教练 2 ： 学员
//      data.timestamp = timestamp.getTime();
//      if(!noCover){
//
//          if(indicatorTime_close){
//              clearTimeout(indicatorTime_close);
//          }
//          Indicator.open({
//              text: data.toast,
//              spinnerType: 'fading-circle'
//          });
//      }
//      /*var dataParams = new URLSearchParams();
//      for ( var p in data ){
//          dataParams.append(p, data[p]);
//      }*/
//      return new Promise(function(resolve, reject) {
//        var timeoutTimer = setTimeout(function(){
//            Indicator.close();
//            Toast({
//                message: commonToast.timeout,
//                position: 'bottom',
//                duration:2000
//            });
//            reject();
//        }, 20000);
//          axios({
//              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//              url: url,
//              method: 'post',
//              data: JSON.stringify(data)
//          }).then(function(res) {
//              clearTimeout(timeoutTimer);
//              clearTimeout(indicatorTime);
//              indicatorTime_close = setTimeout(function(){
//                  Indicator.close();
//              },200);
//              if(typeof res.data == 'string'){
//                  res.data = JSON.parse(res.data);
//              }
//              if (res.data.code == "1008") {
//                  tools.getNativeData().then(function (mydata) {
//                      valueFromNativeAll.token = mydata.token;
//                      that.post(param_url, data).then(
//                          function (data) {
//                              resolve(data);
//                          }
//                      );
//                  });
//              } else if (res.data.code == "1003") {
//                  if(getTimeCount==0){
//                      getTimeCount=1;
//                      tools.getNativeData().then(function (mydata) {
//                          valueFromNativeAll.token = mydata.token;
//                          that.post(param_url, data).then(
//                              function (data) {
//                                  resolve(data);
//                              }
//                          );
//                      });
//                  }else{
//                      getTimeCount=0;
//                      goUrl('login',0,'','','',0);
//                  }
//              }else if (res.data.code == "1") {
//                  resolve(res.data.data);
//              }else {
//                  reject(res.data);
//              }
//          }).catch(function(res) {
//              clearTimeout(timeoutTimer);
//              clearTimeout(indicatorTime);
//              indicatorTime_close = setTimeout(function(){
//                  Indicator.close();
//              },200);
//              if(netWorkStatus_bolck){
//                  Toast({
//                      message: commonToast["connectFail"],
//                      position: 'bottom',
//                      duration: 2000
//                  });
//                  return;
//              }else{
//                  Toast({
//                      message: commonToast["timeout"],
//                      position: 'bottom',
//                      duration: 2000
//                  });
//                  reject(res.data);
//              }
//          });
//      });
//  },

    get:function(param_url, data,redirect_url,noCover) {
        data.stu_token = encodeURIComponent(valueFromNativeAll.token);
/*        if(data.hasOwnProperty("coachId")){
           delete data.coachId;
        }
        if(data.hasOwnProperty("employeeId")){
           delete data.employeeId ;
        }
        if(data.hasOwnProperty("school_code")){
           delete data.school_code ;
        }*/
        if(data.studentId){
            delete data.studentId;
        }
        console.log(JSON.stringify(valueFromNativeAll));
        data.user_id = valueFromNativeAll.studentId;
        if(Request("openid")){
           data.user_id = valueFromNativeAll.userId;
           data.openid = Request("openid");
           data.type_wc = valueFromNativeAll.type_wc;
        }
        var that = this;
        var url = config.serverBaseUrl + param_url;
        if(!noCover&&!(param_url.indexOf("getMwStudentData")>-1)){
          //var indicatorTime = setTimeout(function(){
           /* if(indicatorTime_close){
                clearTimeout(indicatorTime_close);
            }*/
            Indicator.open({
                text: data.toast,
                spinnerType: 'fading-circle'
            });
            indicatorCounter++;
          //},100);
        }
        var timestamp = new Date();
        var type = valueFromNativeAll.type_wc; // 类型 1 ： 教练 2 ： 学员
        data.timestamp = timestamp.getTime();
        return new Promise(function(resolve, reject) {
          var timeoutTimer = setTimeout(function(){
              Indicator.close();
              Toast({
                  message: commonToast["timeout"],
                  position: 'bottom',
                  duration:2000
              });
              reject({msg:commonToast["timeout"]});
          }, 20000);
            axios({
                method: 'get',
                url: url,
                params: data
            }).then(function(res) {
                clearTimeout(timeoutTimer);
                //clearTimeout(indicatorTime);
                //indicatorTime_close = setTimeout(function(){
                if(!(param_url.indexOf("getMwStudentData")>-1)){

                    indicatorCounter--;

                    if(indicatorCounter<1){
                        Indicator.close();
                    }  
                }
                    
                //},200);
                if(typeof res.data == 'string'){
                    try{

                        res.data = JSON.parse(res.data);
                    }catch(e){
                        console.log('接口返回异常');
                        reject(res.data);
                    }
                }

                if (res.data.code == "1008") {
                    tools.getNativeData().then(function (mydata) {
                        valueFromNativeAll.token = mydata.token;

                        that.get(param_url, data).then(
                            /*function (data) {
                                resolve(data);
                            }*/
                        );
                    });
                } else if (res.data.code == "1006") {
                    if(getTimeCount==0){
                        getTimeCount=1;
                        tools.getNativeData().then(function (mydata) {
                            valueFromNativeAll.token = mydata.token;
                            that.get(param_url, data).then(
                                /*function (data) {
                                    resolve(data);
                                }*/
                            );
                        });
                    }else{
                        getTimeCount=0;
                        var goUrlParam = {
                            "action": "login"
                        };
                        goUrl(goUrlParam);
                        //goUrl('login',0,'','','',0);
                    }
                }else if (res.data.code == "3001") { // openid is not binded
                    // coach is not binded
                    if (type == 1) {
                            //window.location.href = valueFromNativeAll.html5BaseUrl + "/emp/emp_bind.html?openid=" + openid + "&redirect_url=" + redirect_url;
                                                
                            MessageBox({
                                title: '',
                                message: '您还没有绑定微信,是否去绑定？',
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonClass:"confirmButton-sure",
                                cancelButtonClass:"confirmButton-cancel",
                                cancelButtonText: '否',
                                confirmButtonText: '是'
                            }).then(function(type) {
                                if (type == "confirm") {
                                    window.location.href = valueFromNativeAll.html5BaseUrl + "/index.html#/emp_bind?openid=" + Request('openid')+"&appId="+Request('appId');
                                    //goUrl(goUrlParam);
                                }else{
                                    WeixinJSBridge.call('closeWindow');
                                }

                            });
                        //alert("coach is not binded");
                    }
                    // student is not binded
                    if (type == 2) {
                            //window.location.href = valueFromNativeAll.html5BaseUrl + "/stu/stu_bind.html?openid=" + openid + "&redirect_url=" + redirect_url;
                            MessageBox({
                                title: '',
                                message: '您还没有绑定微信,是否去绑定？',
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonClass:"confirmButton-sure",
                                cancelButtonClass:"confirmButton-cancel",
                                cancelButtonText: '否',
                                confirmButtonText: '是'
                            }).then(function(type) {
                                if (type == "confirm") {
                                    window.location.href = valueFromNativeAll.html5BaseUrl + "/index.html#/stu_bind?openid=" + Request('openid')+"&appId="+Request('appId');
                                    //goUrl(goUrlParam);
                                }else{
                                    WeixinJSBridge.call('closeWindow');
                                }

                            });
                    }
                }else if (res.data.code == "1") {
                    if(data.isBackAllData){
                        resolve(res.data);
                    }else{
                        resolve(res.data.data);
                    }
                }else {
                    reject(res.data);
                }
            }).catch(function(res) {
                clearTimeout(timeoutTimer);
                //clearTimeout(indicatorTime);
                //indicatorTime_close = setTimeout(function(){
                    if(!(param_url.indexOf("getMwStudentData")>-1)){
                  
                        indicatorCounter--;

                        if(indicatorCounter<1){
                            Indicator.close();
                        }  
                    }
                //},200);
                if(localStorage.getItem("netWorkStatus_bolck")=="true"){
                    Toast({
                        message: commonToast["connectFail"],
                        position: 'bottom',
                        duration: 2000
                    });
                    reject({msg:commonToast["connectFail"]});
                }else{
                    Toast({
                        message: commonToast["timeout"],
                        position: 'bottom',
                        duration: 2000
                    });
                    reject(res.data);
                }
                
                // if(typeof res.data == 'string'){
                //     res.data = JSON.parse(res.data);
                // }
            });
        });
    },
    getNoWarn:function(param_url, data,redirect_url,noCover) {
        data.stu_token = encodeURIComponent(valueFromNativeAll.token);
        if(data.studentId){
            delete data.studentId;
        }
        data.user_id = valueFromNativeAll.studentId;
        var that = this;
        var url = config.serverBaseUrl + param_url;
        var timestamp = new Date();
        var type = data.type_wc; // 类型 1 ： 教练 2 ： 学员
        data.timestamp = timestamp.getTime();
        return new Promise(function(resolve, reject) {

            axios({
                method: 'get',
                url: url,
                params: data
            }).then(function(res) {

               
            }).catch(function(res) {
                
                
            });
        });
    }

}
