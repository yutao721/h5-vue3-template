
继续完善中....

基于 vue3 + vite + vant ui + sass + viewport 适配方案 + axios 封装，构建手机端模板脚手架


### Node 版本要求

推荐你使用 nodejs 14+版本，毕竟技术日新月异。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。

本示例 Node.js 16.1.0

### 启动项目

```bash

npm install

npm run dev

```

可以使用淘宝镜像安装
```bash
npm install --registry=https://registry.npmmirror.com
```

### 配置多环境变量 

`package.json` 里的 `scripts` 配置 `dev` `dev:test` `dev:prod` ，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run dev` 启动本地环境参数 , 执行 `development`
- 通过 `npm run dev:test` 启动测试环境参数 , 执行 `test`
- 通过 `npm run dev:prod` 启动正式环境参数 , 执行 `prod`

```javascript
"scripts": {
    "dev": "vite",
    "dev:test": "vite --mode test",
    "dev:prod": "vite --mode production",
}
```

### 适配方案

项目使用 `viewport` 适配, 下面仅做介绍：

- [postcss-px-to-viewport-8-plugin](https://github.com/xian88888888/postcss-px-to-viewport-8-plugin) 是一款 `postcss` 插件，用于将单位转化为 `vw`, 现在很多浏览器对`vw`的支持都很好。

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
        "last 10 versions"
      ],
      grid: true
    },
    'postcss-px-to-viewport-8-plugin': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 375, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    },
  },
};

```

### vantUI 组件按需加载
Vite 构建工具，使用 unplugin-vue-components 实现按需引入。

#### 安装插件

```bash
npm i unplugin-vue-components -D
```

在 `vite.config.ts` 设置

```javascript
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

 plugins: [
     ...
     Components({
         resolves: [VantResolve()],
     }),
     ...
 ],
```

#### 使用组件

项目在 `plugins/vantUI.ts` 下统一管理组件，用哪个引入哪个，无需在页面里重复引用

```javascript
// 按需全局引入nutUI组件
import Vue from 'vue';
import { Button, Cell } from '@nutui/nutui';
export const nutUiComponents = [Button, Cell];

// 在main.ts文件中引入
nutUiComponents.forEach((item) => {
  app.use(item);
});
```

### Pinia 状态管理

下一代 vuex，使用极其方便，ts 兼容好

目录结构

```bash
├── store
│   ├── modules
│   │   └── user.js
│   ├── index.js
```



#### options API:

```js
interface StoreUser {
  token: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token,
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    login() {
      return new Promise((resolve) => {
        const { data } = loginPassword();
        watch(data, () => {
          this.setInfo(data.value);
          // useCookies().set(VITE_TOKEN_KEY as string, data.value.token);
          resolve(data.value);
        });
      });
    },
  },
});

```

#### Composition API:

```js
export const useUserStore = defineStore('app-user', () => {
  const Token = ref(token);
  const info = ref<Record<any, any>>({});
  const setInfo = (info: any) => {
    info.value = info ? info : '';
  };
  const getUserInfo = () => {
    return info || {};
  };
  const login = () => {
    return new Promise((resolve) => {
      const { data } = loginPassword();
      watch(data, () => {
        setInfo(data.value);
        // useCookies().set(VITE_TOKEN_KEY as string, data.value.token);
        resolve(data.value);
      });
    });
  };
  return {
    Token,
    info,
    setInfo,
    login,
    getUserInfo,
  };
})

```

使用

```html
<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  userStore.login();
</script>
```

### Vue-router

本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`

**注意**：如果你使用了 `history` 模式， `vue.config.js` 中的 `publicPath` 要做对应的**修改**



```javascript
import Vue from 'vue';
import { createRouter, createWebHistory, Router } from 'vue-router';

Vue.use(Router);
export const router = [
  {
    name: 'root',
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/basic/index.vue'),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
```

更多:[Vue Router](https://router.vuejs.org/zh/introduction.html)


### axios 封装及接口管理
utils/useAxiosApi.ts 封装 axios , 开发者需要根据后台接口做修改。

instance.interceptors.request.use 里可以设置请求头，比如设置 token
config.hideloading 是在 api 文件夹下的接口参数里设置，下文会讲
instance.interceptors.response.use 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

```js
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

```

#### 接口管理

在 `src/api` 文件夹下统一管理接口

- 你可以建立多个模块对接接口, 比如 `home.js` 里是首页的接口这里讲解 `user.js`
- `url` 接口地址，请求的时候会拼接上 `baseApi`
- `method` 请求方法
- `data` 请求参数
- `hideloading` 默认 `false`, 设置为 `true` 后，不显示 loading ui 交互中有些接口不需要让用户感知

```javascript
// axios
import request from '@/utils/useAxiosApi';
//user api

// 用户信息
export function getUserInfo(params) {
  return request({
    url: '/user/userinfo',
    method: 'post',
    data: params,
    hideloading: true, // 隐藏 loading 组件
  });
}
```

#### 如何调用

```javascript
// 请求接口
import { getUserInfo } from '@/api/user.js';

const params = {
  user: 'zhangsan',
};
getUserInfo(params)
  .then(() => {})
  .catch(() => {});
```

### 配置 proxy 跨域

```javascript
server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true, // 这里不加服务端无法拿到origin属性
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
```

### 配置alias
```js
resolve: {
  alias: {
    '@': pathResolve('./src'),
    '/#': pathResolve('./types'),
  },
},
```

### Mock


```bash
npm install mockjs vite-plugin-mock -D

```

vite.config.ts
```js
import { viteMockServe } from "vite-plugin-mock"
plugins: [
  viteMockServe({
    mockPath: './src/mock',
    localEnabled: command === 'serve',
    logger: true,
  }),
],
```

### 调试
使用eruda可以在真机上看到接口请求以及其他，类似于VConsole工具

安装 `vite-plugin-eruda`插件
```bash
import eruda from 'vite-plugin-eruda';
```

vite.config.ts
```js
import eruda from 'vite-plugin-eruda';
plugins: [
  eruda(),
],
```

> 可以根据不同环境来配置是否开启，或者打包上线的时候直接注释

### 兼容新
本项目使用legacy 和 build.target选项做了兼容处理，具体参看vite文档。
