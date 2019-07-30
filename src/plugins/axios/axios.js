import axios from 'axios';
import qs from 'qs';

var instance = axios.create({
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
});

instance.defaults.timeout = 10000;
instance.all = axios.all;
instance.spread = axios.spread;

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method === 'get') {
    if (!config.params) {
      config.params = {};
    }
  } else if (config.method === 'post') {
    if (!config.data) {
      config.data = {};
    }
    config.data = qs.stringify(config.data); // 将post请求的参数序列化
  }
  config.url = encodeURI(config.url);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {

  }
  return Promise.reject(error);
});

export default instance;