/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-19 17:11:12
 * @Describe:
 */

module.exports = (app) => {
  app
    // 个人信息
    .get('/api/user/info', (req, res) => {
      res.json(require('./mocks/user/info.json'));
    })
    /** 首页 达人收藏**/
    // 我的达人
    .get('/api/collect/collection_list', (req, res) => {
      res.json(require('./mocks/home/getTalentList.json'));
    })
    // 达人视频
    .get('/api/collect/collection_video', (req, res) => {
      res.json(require('./mocks/home/getVideoList.json'));
    })
    // 达人推荐/达人发现-达人查找
    .post('/api/douyinkol/kol_list', (req, res) => {
      res.json(require('./mocks/home/getcommendList.json'));
    })

    /** 达人发现 **/
    // 指数排行榜-数据榜
    .post('/api/kolrank/easy_rate_rank', (req, res) => {
      res.json(require('./mocks/talentlist/gettalentdataList.json'));
    })
    // 指数排行榜-飙升榜
    .post('/api/kolrank/grow_rate_rank', (req, res) => {
      res.json(require('./mocks/talentlist/gettalentsoarList.json'));
    })
    // 指数排行榜-地域榜
    .post('api/kolrank/location_rank', (req, res) => {
      res.json(require('./mocks/talentlist/gettalentareaList.json'));
    })
    // 指数排行榜-蓝V榜
    .post('/api/kolrank/enterprise_rank', (req, res) => {
      res.json(require('./mocks/talentlist/gettalentbluevList.json'));
    })

    /** 创意洞察 **/
    // 热门视频
    .get('/api/douyinvideorank/video_rank', (req, res) => {
      res.json(require('./mocks/creativevideo/getctvideoList.json'));
    })
    // 热门音乐
    .get('/api/douyinmusic/music_list', (req, res) => {
      res.json(require('./mocks/creativevideo/getctmusicList.json'));
    })
    // 热门话题
    .get('/api/douyinchallenge/challenge_list', (req, res) => {
      res.json(require('./mocks/creativevideo/getctopicList.json'));
    })
    /** 个人详细信息 **/
    // 信息列表
    .get('/api/douyinkol/kol_detail', (req, res) => {
      res.json(require('./mocks/info/getcinfoList.json'));
    })
    // 新增数据
    .get('/api/douyinkol/kol_grow', (req, res) => {
      res.json(require('./mocks/info/getgrowList.json'));
    })
    // 粉丝趋势
    .get('/api/koltrend/follower_trend', (req, res) => {
      res.json(require('./mocks/info/getfollerList.json'));
    })
    // 点赞趋势
    .get('/api/koltrend/favorited_trend', (req, res) => {
      res.json(require('./mocks/info/getfavList.json'));
    })
    // 达人视频-粉丝趋势
    .get('/api/douyinvideo/kol_video_grow', (req, res) => {
      res.json(require('./mocks/info/getvgrowList.json'));
    })
    // 达人视频-视频列表
    .get('/api/douyinvideo/kol_video_list', (req, res) => {
      res.json(require('./mocks/info/getkvdList.json'));
    })
    
    /** 电商带货 **/
    // 商品搜索
    .post('/api/shop/shopsearch', (req, res) => {
      res.json(require('./mocks/shop/getshopSearch.json'));
    })
    // 热门商品榜
    .get('/api/shop/shophot', (req, res) => {
      res.json(require('./mocks/shop/getshopHot.json'));
    })
    // 商品详情
    .get('/api/shop/shoplist', (req, res) => {
      res.json(require('./mocks/shop/getshoplistData.json'));
    })
    // 抖店搜索
    .post('/api/shop/tiktoksearch', (req, res) => {
      res.json(require('./mocks/shop/gettiktokSearch.json'));
    })
    // 抖店排行榜-数据榜
    .get('/api/shop/shopdata', (req, res) => {
      res.json(require('./mocks/shop/getshopData.json'));
    })
    // 抖店排行榜-评分榜
    .get('/api/shop/shopscore', (req, res) => {
      res.json(require('./mocks/shop/getshopScore.json'));
    })
    // 商品-信息列表
    .get('/api/shop/kol_detail', (req, res) => {
      res.json(require('./mocks/shop/getcinfoList.json'));
    });
    
};
