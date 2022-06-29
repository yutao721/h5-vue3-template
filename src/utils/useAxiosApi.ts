import axios, {AxiosRequestConfig} from 'axios';
import {Toast} from 'vant';
import qs from 'qs';


// create an axios instance
const instance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: false,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
  }
});

// request interceptor
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // do something before request is sent
    // const token = store.state.user.token;

    // if (token) {
    //   // let each request carry token
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }
    config.data = qs.stringify(config.data);
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
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    Toast.clear();
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 0) {
      Toast(res.message);
      // 412: Token expired;
      // if (res.code === 412) {
      //   // store.dispatch('user/userLogout');
      // }
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
