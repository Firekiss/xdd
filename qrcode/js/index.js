$(function(){

  let config = {
    url: "http://39.107.71.117",
    inviteUrl: "http://www.njtyxxkj.com/xdd/index.html#/index?invite_code="
  };

  let els = {
    qrcode: $("#qrcode"),
    body: $("body")
  };

  let methods = {
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return '';
    }
  };

  // 生成二维码的方法 
  function createQRcode(url, width) {
    return new QRCode('qrcode', {
      text: url,
      width: width,
      height: width,
      colorDark : '#000000',
      colorLight : '#ffffff'
    })
  }

  // 主函数
  function main () {
    var openId = window.openId;
    var code = methods.getQueryString('code');
    var width = els.qrcode.css('width').replace('px', '');

    if (!code) {
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx950fa5385b73d05b&redirect_uri=http%3a%2f%2fwww.njtyxxkj.com%2fqrcode%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    } else {
      els.body.mLoading("show");

      $.ajax({
        type: "post",
        url: config.url + '/CloseCenter/closeUser/weChatOpenId.action',
        dataType: 'json',
        data: {
          code: code
        }
      })
      .success(function(res){
        if (res.success === true) {
          els.body.mLoading("hide");
          // 生成二维码
          createQRcode(config.inviteUrl + res.data.invite_code, width);
        } else {
          alert(res.msg);
        }
      })
      .error(function(){
        alert("获取openId失败");
      });
    }
  }
  
  // new VConsole();
  main();
})