/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:20:38
 * @Describe: 路由配置
 */
import Vue from 'vue';
import Router from 'vue-router';
import wrap from '@/components/wrap.vue';

Vue.use(Router);
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: wrap,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
          meta: [
            { name: '抖音数据平台' },
          ],
        },
      ],
    },
    {
      path: '/talent',
      name: 'talent',
      component: wrap,
      children: [
        // 达人查找-达人查找
        {
          path: 'talentfind',
          name: 'talentfind',
          component: () => import(/* webpackChunkName: "talentfind" */ '@/views/talentfind/index.vue'),
          meta: [
            { name: '达人查找' },
          ],
        },
        // 达人查找-指数排行榜
        {
          path: 'talentlist',
          name: 'talentlist',
          component: () => import(/* webpackChunkName: "talentlist" */ '@/views/talentlist/index.vue'),
          meta: [
            { name: '指数排行榜' },
          ],
        },
      ],
    },
    {
      // 登录首页
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
