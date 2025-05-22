

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
      viewportWidth: file => file.includes("node_modules/vant") ? 375 : 750,
      enableMediaQuery: true,
      desktopWidth: 600,
      landscapeWidth: 450,
      border: false,
      appSelector: ".root-class",
      propertyBlackList: {
        ".van-icon": "font"
      },
      rootContainingBlockSelectorList: [".van-tabbar", ".vant-swiper", ".van-dropdown-item"],
      demoMode: true,
      side: {
        selector1: ".footer",
      }
    }
  }
};

