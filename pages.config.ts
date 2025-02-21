import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '喵博士 x 汪博士',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#8C8C8C',
    selectedColor: '#020617',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/images/icon/home.png',
        selectedIconPath: 'static/images/icon/home-active.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        iconPath: 'static/images/icon/report.png',
        selectedIconPath: 'static/images/icon/report-active.png',
        pagePath: 'pages/report/index',
        text: '报告',
      },
      {
        iconPath: 'static/images/icon/cart.png',
        selectedIconPath: 'static/images/icon/cart-active.png',
        pagePath: 'pages/home/product_list',
        text: '商城',
      },
      {
        iconPath: 'static/images/icon/personal.png',
        selectedIconPath: 'static/images/icon/personal-active.png',
        pagePath: 'pages/personal/index',
        text: '个人',
      },
    ],
  },
})
