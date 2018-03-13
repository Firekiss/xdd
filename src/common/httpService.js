import config from '../config';
import tools from './tools';
import axios from 'axios';

axios.defaults.timeout = 20000; // 接口超时配置
axios.defaults.baseURL = config.serverBaseUrl; // baseUrl设置

axios.interceptors.response.use(response => {
  // 返回的res数据
  let data = response.data;
  if (data.success === true) {
    return data;
  }
}, err => {
  return Promise.reject(err)
});

export default {
  /**
   * 封装get请求
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  get (url, params = {}) {
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
    return new Promise((resolve, reject) => {
      // axios.post(url, data)
      //   .then(response => {
      //     resolve(response.data)
      //   }, err => {
      //     reject(err)
      //   })
      axios({
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          url: url,
          method: 'post',
          data: JSON.stringify(data)
      }).then(function(res) {
          resolve(res.data);
      }).catch(function(data){
          reject(data);
      })
    })
  }
}
