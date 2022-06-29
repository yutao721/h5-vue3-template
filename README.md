
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
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
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

Vite 构建工具，使用 vite-plugin-style-import 实现按需引入。

### 状态管理

下一代 vuex，使用极其方便，ts 兼容好

目录结构

```bash
├── store
│   ├── modules
│   │   └── user.js
│   ├── index.js
```

使用

```html
<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  userStore.login();
</script>
```
