/*
 * @Author: jiashuangxi
 * @Date: 2019-07-11 15:20:08
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:22:35
 * @Description: 内容管理
 */

import fetch from '@/utils/fetch';

/**
 * 分页列表
 * @param {Object} params
 */

/****** 个人信息 ******/
export const getUser = (params = {}) => fetch({
  url: '/user/info',
  method: 'get',
  params,
});

/****** 首页-我的达人，个人收藏-达人收藏******/
export const getTalentList = (params = {}) => fetch({
  url: '/collect/collection_list',
  method: 'get',
  params,
});

// 达人视频
export const getVideoList = (params = {}) => fetch({
  url: '/collect/collection_video',
  method: 'get',
  params,
});

/****** 首页-达人推荐、达人发现-达人查找******/
export const getcommendList = (params = {}) => fetch({
  url: '/douyinkol/kol_list',
  method: 'post',
  params,
});

/****** 达人发现 ******/
// 达人查找
export const gettalentfindList = (params = {}) => fetch({
  url: '/douyinkol/kol_list',
  method: 'post',
  params,
});

// 指数排行榜
// 指数排行榜- 数据榜
export const gettalentdataList = (params = {}) => fetch({
  url: '/kolrank/easy_rate_rank',
  method: 'get',
  params,
});

// 指数排行榜- 飙升榜
export const gettalentsoarList = (params = {}) => fetch({
  url: '/kolrank/grow_rate_rank',
  method: 'get',
  params,
});

// 指数排行榜- 地域榜
export const gettalentareaList = (params = {}) => fetch({
  url: '/kolrank/location_rank',
  method: 'get',
  params,
});

// 指数排行榜- 蓝V榜
export const gettalentbluevList = (params = {}) => fetch({
  url: '/kolrank/enterprise_rank',
  method: 'get',
  params,
});
