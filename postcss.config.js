

module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions'
      ],
      grid: true
    },

    'postcss-mobile-forever': {
      appSelector: '.root-class',
      viewportWidth: 375,
      maxDisplayWidth: 520,
    }



    // 'postcss-px-to-viewport-8-plugin': {
    //   unitToConvert: 'px', // 要转化的单位
    //   viewportWidth: 375, // UI设计稿的宽度
    //   unitPrecision: 6, // 转换后的精度，即小数点位数
    //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
    //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
    //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //   replace: true, // 是否转换后直接更换属性值
    //   exclude: [/node_modules/] // 设置忽略文件，用正则做目录名匹配
    // }
  }
};



// module.exports = {
//   plugins: [
//     require("postcss-mobile-forever")({
//       viewportWidth: file => file.includes("node_modules/vant") ? 375 : 750,
//       enableMediaQuery: true,
//       desktopWidth: 600,
//       landscapeWidth: 450,
//       border: true,
//       appSelector: ".root-class",
//       propertyBlackList: {
//         ".van-icon": "font"
//       },
//       rootContainingBlockSelectorList: ["van-tabbar"],
//       demoMode: true,
//       side: {
//         selector1: ".footer",
//       }
//     }),
//   ],
// };