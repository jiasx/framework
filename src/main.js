/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 11:00:16
 * @Describe: 
 */
import Vue from 'vue';

// 可编辑表格组件 按需引入
import '@/plugins/element-ui';

// css按需加载
import '@/common/css/element-variables.scss';
import '@/common/css/normalize.css';

// 使用svg方式引入
import '@/common/iconfonts/iconfont.css';

import VueLazyLoad from 'vue-lazyload';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import fetch from './utils/extendAxios';

import * as filters from './filters';

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.use(VueLazyLoad, {
});

Vue.config.productionTip = false;
Vue.prototype.$fetch = fetch;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
