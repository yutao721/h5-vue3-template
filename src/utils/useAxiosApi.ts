import axios, {AxiosRequestConfig} from 'axios';
import {Toast} from 'vant';


const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: false,
  timeout: 5000,
});


instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    return config;
  },
  (error) => {
    // do something with request error
    Toast.clear();
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    Toast.clear();
    const res = response.data;
    if (res.code !== 0) {
      Toast(res.message);
      return Promise.reject(res.message || 'Error');
    } else {
      return res;
    }
  },
  (error) => {
    Toast.clear();
    console.log('err' + error);
    Toast(error.message);
    return Promise.reject(error.message);
  },
);


export default instance
