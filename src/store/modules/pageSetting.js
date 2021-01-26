/*
 * @Author: fangweiqiang
 * @Date: 2019-07-23 15:29:30
 * @LastEditors: fangweiqiang
 * @LastEditTime: 2019-07-26 17:44:01
 * @Description: 页面全局设置
 */

/* eslint-disable */
const state = {
  asideCollapse: false,  // 侧边栏是否收起
};
const actions = {
};
const mutations = {
  // 更改侧边栏收起状态
  changeCollapse(state, payload){
    state.asideCollapse = payload;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
