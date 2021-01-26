/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-05 10:02:44
 * @Describe: 
 */
import axios from 'axios';
import qs from 'qs';
// import { Message } from 'h2-pc';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
  timeout: 30000, // 请求超时时间
});
const BASE_URL = process.env.VUE_APP_SERVER || '';
// service.defaults.withCredentials = true; 跨域传cookie需要
service.interceptors.request.use(
  (config) => {
    // 开发环境引入包装api
    config.url = `${BASE_URL}${config.url}`;
    config.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate,max-age=-1,private';
    // post请求并且需要将data以form data 形式传给后端 需要传一个formType为true boolean
    if (config.method === 'post' && config.formType === true) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // 未登录状态处理;
    if (response.data.code === 401) {
      window.location.href = 'http://toutiaovideo.cn/user/login?redirect=http://fengcao1.toutiaovideo.cn/';
      return null;
    }
    if (!response.data || response.data.code !== 200) {
      Message({
        message: response.data.return_msg || '服务异常，请联系系统管理员',
        type: 'error',
        duration: 3 * 1000,
      });
      return null;
    }
    // 如果响应头中有disposition字段且其值为attachment，视为下载post数据，返回完整的response
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('attachment') !== -1) {
      return response;
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.message === 'Network Error') {
      Message({
        message: '网络正忙，请稍后重试',
        type: 'error',
        duration: 3 * 1000,
      });
    } else {
      Message({
        message: error.message || '网络异常，请稍后重试。',
        type: 'error',
        duration: 3 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

export default service;
