import config from '../config';
import tools from './tools';
import axios from 'axios';
import qs from 'qs';
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';

axios.defaults.timeout = 20000; // 接口超时配置
axios.defaults.baseURL = config.serverBaseUrl; // baseUrl设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let requestNum = 0;
let indicatorTimer = null;

function openIndicator () {
  if (++requestNum === 1) {
    indicatorTimer = setTimeout(() => {
      Indicator.open();
    }, 300)
  }
}

function closeIndicator () {
  if (--requestNum === 0) {
    clearTimeout(indicatorTimer);
    Indicator.close();
  }
}

axios.interceptors.response.use(response => {
  // 返回的res数据
  let data = response.data;
  if (data.success === true) {
    return data;
  } else {
    return Promise.reject(data);
  }
}, err => {
  return Promise.reject(err);
});

export default {
  /**
   * 封装get请求
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  get (url, params = {}) {
    if(window.wxUserData&&window.wxUserData.user_id){
       params.user_id=wxUserData.user_id;
    }
    if(window.openid){
      params.openid = window.openid;
    }
    return new Promise ((resolve, reject) => {
      openIndicator();
      axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
        closeIndicator();
      })
      .catch(err => {
        reject(err);
        closeIndicator();
      })
    })
  },

  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise<any>}
   */
  post (url, data = {}) {
    return new Promise((resolve, reject) => {
      openIndicator();
      axios({
        method: 'post',
        url: url,
        data: qs.stringify(data)
      })
      .then(response => {
        resolve(response.data);
        closeIndicator();
      }, err => {
        reject(err);
        closeIndicator();
      })
    })
  }
}
