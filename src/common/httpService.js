import config from '../config';
import tools from './tools';
import axios from 'axios';
import qs from 'qs'

axios.defaults.timeout = 20000; // 接口超时配置
axios.defaults.baseURL = config.serverBaseUrl; // baseUrl设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use(response => {
  // 返回的res数据
  let data = response.data;
  if (data.success === true) {
    return data;
  } else {
    return Promise.reject(data.msg);
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
    return new Promise ((resolve, reject) => {
      axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
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
    console.log(data);
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: qs.stringify(data)
      })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    })
  }
}
