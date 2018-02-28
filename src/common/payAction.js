/**
 * Created by cpf on 2017/3/27.
 */

import tool from './tools.js';

/*
 *
 * 调用范例
 * var url = "indexTab/index";
 * payAction.payByAliPay("1",payIndex,data);  支付类型，支付场景，参数对象
 *
 */

export default {
    payByAliPay: function(payType, payIndex, params) {
        var deviceType = Request("deviceType");
        var tmpJSON = {
            action: "payAction",
            deviceType: deviceType,
            payIndex: payIndex,
            payType: params.paymentType,
            tradeNO: params.outTradeNo,
            productName: params.subject,
            productDescription: params.subjectDescription,
            amount: params.totalFee,
            notifyURL: params.notifyUrl,
            AliPayPrivateKey: params.aliPayPrivateKey,
            AliPayPartner: params.partner,
            AliPaySeller: params.sellerEmail
        };


        /*
         0 – VIP报名支付
         1 – VIP班待缴记录支付
         2 – 普通班待缴记录支付
         3 – 模拟器扫码支付
         4 – 升级包支付
         */

        switch (payIndex) {
            case 0:
                //跳转到完善资料
                tmpJSON.amount = params.totalPay;
                tmpJSON.driveType = params.driveType;
                tmpJSON.goToUrl = "#/perfect_data";
                tmpJSON.title = "完善资料";
                break;
            case 1:
                //回到上个webview
                break;
            case 2:
                //回到上个webview
                break;
            case 3:
                //退回首页
                break;
            case 4:
                //退回首页
                tmpJSON.driveType = params.driveType;
                break;
        }
        switch (deviceType.toLowerCase()) {
            case "ios":
                window.webkit.messageHandlers.oAction.postMessage(tmpJSON); // 调用ios的 Native定义的方法
                break;
            case "android":
                window.oAction.postMessage(JSON.stringify(tmpJSON)); // 调用android  的 Native定义的方法
                break;
            case "pc":
                console.log("此处PC端测试用");
                break;
        }
    },
    payByWeiXin: function(payType, payIndex, params) {
        var deviceType = Request("deviceType");
        var tmpJSON = {
            action: "payAction",
            deviceType: deviceType,
            payIndex: payIndex,
            payType: payType,
            appid: params.appid
        };



        switch (payIndex) {
            case 0:
                tmpJSON.appid = params.appid;
                tmpJSON.appsecret = params.appsecret;
                tmpJSON.partner = params.partner;
                tmpJSON.partnerkey = params.partnerkey;
                tmpJSON.notifyURL = params.notifyUrl;
                tmpJSON.amount = params.totalPay;
                tmpJSON.tradeNO = params.outTradeNo;
                tmpJSON.subject = params.subject;
                tmpJSON.title = '完善资料';
                tmpJSON.goToUrl = "#/perfect_data";
                tmpJSON.productDescription = params.title;
                tmpJSON.driveType = params.driveType;
                break;
            case 1:
                break;
            case 2:
                tmpJSON.noncestr = params.nonceStr;
                tmpJSON.package = params.package;
                tmpJSON.partnerid = params.partnerId;
                tmpJSON.prepayid = params.prepayId;
                tmpJSON.timestamp = params.timeStamp;
                tmpJSON.sign = params.sign;
                break;
            case 3:
                tmpJSON.appid = params.appid;
                tmpJSON.appsecret = params.appsecret;
                tmpJSON.partner = params.partner;
                tmpJSON.partnerkey = params.partnerkey;
                tmpJSON.notifyURL = params.notifyUrl;
                tmpJSON.amount = params.totalPay;
                tmpJSON.tradeNO = params.outTradeNo;
                tmpJSON.subject = 'params.subject';
                tmpJSON.title = params.title;
                tmpJSON.productDescription = params.title;
                //alert(JSON.stringify(tmpJSON));
                break;
            case 4:
                break;
        }

        switch (deviceType.toLowerCase()) {
            case "ios":
                window.webkit.messageHandlers.oAction.postMessage(tmpJSON); // 调用ios的 Native定义的方法
                break;
            case "android":
                window.oAction.postMessage(JSON.stringify(tmpJSON)); // 调用android  的 Native定义的方法
                break;
            case "pc":
                console.log("此处PC端测试用");
                break;
        }
    }
}