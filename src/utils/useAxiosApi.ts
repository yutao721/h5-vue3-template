import axios from 'axios';
import { showToast, showLoadingToast, closeToast } from 'vant';


const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, // 超时时间
});

const isUseProxy = import.meta.env.VITE_USE_PROXY === 'true';
console.log(isUseProxy);
// 根据环境变量判断是否使用mock数据
if (isUseProxy) {
  // 设置baseURL
  instance.defaults.baseURL = '';
}


instance.interceptors.request.use(
  async (config: any) => {
    const { url, method, headers, data, isHideLoading, ...otherOptions } = config;
    if (!isHideLoading) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
      });
    }
    const token = localStorage.getItem('token');
    const newConfig = {
      url: url,
      method: method.toLocaleLowerCase(),
      headers: {
        Accept: 'application/json, text/javascript, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers
      },
      responseType: 'json',
      data,
      ...otherOptions
    };
    return newConfig;
  },
  (error) => {
    // do something with request error
    closeToast();
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    closeToast();
    const res = response.data;
    if (res.code !== 0) {
      showToast(res.message);
      return Promise.reject(res.message || 'Error');
    } else {
      return res.data;
    }
  },
  (error) => {
    closeToast();
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);


export default instance
