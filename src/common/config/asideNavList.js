/*
 * @Author: fangweiqiang
 * @Date: 2019-07-26 15:09:56
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:18:35
 * @Description: 侧边栏目录结构
 */

export default [
  {
    title: '首页',
    iconName: 'home',
    value: 'home',
  },
  {
    title: '达人发现',
    iconName: 'find',
    value: 'talent',
    children: [
      {
        title: '达人查找',
        value: 'talentfind',
      },
      {
        title: '指数排行榜',
        value: 'talentlist',
      },
    ],
  },
];
