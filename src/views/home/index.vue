<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-11 16:48:10
 * @Describe: 首页
-->
<template>
  <div class="page-home__container page-scroll__set">
      <div class="page-home__container__top">
        <!--------------- 显示模块 （达人发现，素材查找，热销商品，实时直播）--------------->
        <div class="home-show" style="display: ">
          <a href="javascript:void(0)" class="home-show__module"
          v-for="tops in topList" @click="goRouter(tops.router)"
          :key="tops.title">
            <div class="home-show__module-pic">
              <img :src="tops.src" class="home-show__module-picsrc"/>
            </div>
            <div class="home-show__module-tit">
              <span>{{tops.title}}</span><br/>
              <span>{{tops.detail}}</span>
            </div>
          </a>
        </div>
        <!--------------- 中间模块（我的达人，达人视频）---------------->
        <div class="home-mid" style="display:;">
           <!-- 我的达人 -->
           <div class="home-mid__talent talent-block">
             <!-- 标题 -->
             <div class="tit-set">
               <h3 class="tit-set__name">我的达人</h3>
               <a href="javascript:void(0)" class="tit-set__more color-set" @click="goNew()">
                 查看更多<i class="el-icon-arrow-right"></i></a>
             </div>
             <!-- 数据模块 -->
            <div class="talent-detail" v-loading="loading" >
              <div v-if="tanlentlist.length > 0">
                <div v-for="talent in tanlentlist"
                 class="talent-detail__main background-set"
                :key="talent.name">
                <!-- 左侧 -->
                <!-- 头像列表设置 公共-->
                <div class="head-list">
                  <div class="head-list__pic">
                    <img  v-lazy="talent.avatar" :key="talent.avatar"
                     class="head-list__pic-picsrc head-pic"/>
                  </div>
                    <div class="head-list__tit">
                      <span class="head-list__tit-name" :title="talent.nickname" @click="lookPort(talent)">{{talent.nickname}}
                      <!-- 直播 -->
                        <i class="video-cion set-com-cion set-cion"></i>
                        <!-- 商品橱窗 -->
                        <i class="pro-cion set-com-cion" v-if="talent.with_commerce_entry"></i>
                        </span>
                      <span class="head-list__tit-tyh">抖音号：{{talent.short_id === null ? '未知': talent.short_id }}</span>
                    </div>
                </div>
                <!-- 右侧 -->
                <div class="talent-detail__detail">
                    <div class="talent-detail__detail-fans">
                      <p></p>
                      <p class="pic-person pic-set">
                        <span>{{talent.follower_count | numtransfor}}</span>&nbsp;
                        <span v-if="talent.follower_count_grow >= 0" class="upset">{{talent.follower_count_grow | numtransfor}}↑</span>
                        <span v-else class="downset">{{talent.follower_count_grow | numtransfor}}↓</span>
                        </p>
                      <p class="pic-heart pic-set">
                        <span>{{talent.total_favorited | numtransfor}}</span>&nbsp;
                        <span v-if="talent.total_favorited_grow >= 0" class="upset">{{talent.total_favorited_grow | numtransfor}}↑</span>
                        <span v-else class="downset">{{talent.total_favorited_grow | numtransfor}}↓</span>
                      </p>
                      <p class="pic-yg pic-set">
                        <span style="text-align: center;">{{talent.easy_rate | yznumtransfor}}</span></p>
                    </div>
                </div>
                </div>
              </div>
                <div class="nodata" v-else>暂无数据</div>
            </div>
            

           </div>
           <!-- 达人视频 -->
           <div class="home-mid__video talent-block">
             <!-- 标题 -->
             <div class="tit-set">
               <h3 class="tit-set__name">达人视频</h3>
             </div>
              <!-- 达人视频模块 -->
              <div class="video-detail" v-loading="loading" >
                <div v-if="videolist.length > 0">
                <div class="video-detail__main" v-if="videolist !==[]">
                  <div class="video-detail__main-pic" v-for="video in videolist" :key="video.id">
                    <a :href="video.url" target="_blank" class="video-detail__main-pic--set">
                      <img v-lazy="video.cover_url" :key="video.cover_url" class="video-pic">
                      <p>{{video.digg_count | numtransfor}}</p>
                      <p>{{video.comment_count | numtransfor}}</p>
                      <p>{{video.share_count | numtransfor}}</p>
                    </a>
                    <!-- {{video.create_time | datetime}} -->
                  <span class="video-detail__main-datetime">发布于：{{video.create_time | datetime}}</span>
                  </div>
                  </div>
                </div>
                <div class="nodata" v-else>暂无数据</div>
              </div>
              
           </div>
        </div>
      <!--------------- 底部模块 （达人推荐） --------------->
       <div class="home-bt" style="display: ">
         <!-- 标题 -->
            <div class="tit-set">
               <h3 class="tit-set__name">达人推荐</h3>
             </div>
             <div class="recom-detail" v-loading="loading">
               <div class="recom-detail__main" v-if="commendlist.length > 0">
                 <div class="recom-detail__main-block" v-for="commend in commendlist" :key="commend.id">
                  <div class="recom-detail__main-top">
                    <div class="recom-detail__main-left">
                      <p class="tit-name">
                        <span class="nickname-tit" @click="lookPort(commend)">{{commend.nickname}}</span>
                        <!-- 直播 -->
                        <i class="video-cion set-com-cion set-cion"></i>
                        <!-- 商品橱窗 -->
                        <i class="pro-cion set-com-cion" v-if="commend.with_commerce_entry"></i>
                      </p>
                       <template v-if="commend.kol_category != null">
                         <el-tag class="el-tag-set" size="mini" v-for="label in commend.kol_category.split(',')" :key="label">{{label}}</el-tag>
                       </template>
                    </div>
                    <div class="recom-detail__main-right">
                      <img v-lazy="commend.avatar" :key="commend.avatar" class="head-pic">
                    </div>
                  </div>
                  <div class="recom-detail__main-bt">
                    <div class="recom-detail__main-fans">
                        <p class="recom-detail__main-fans--number">
                          <span>{{commend.follower_count | numtransfor}}</span>&nbsp;
                          <span v-if="commend.follower_count_grow >= 0" class="upset">{{commend.follower_count_grow | numtransfor}}↑</span>
                          <span v-else class="downset">{{commend.follower_count_grow | numtransfor}}↓</span>

                        </p>
                        <p>粉丝量</p>
                    </div>
                    <div class="recom-detail__main-fans">
                        <p class="recom-detail__main-fans--number">
                          <span>{{commend.total_favorited | numtransfor}}</span>&nbsp;
                          <span v-if="commend.total_favorited_grow >= 0" class="upset">{{commend.total_favorited_grow | numtransfor}}↑</span>
                          <span v-else class="downset">{{commend.total_favorited_grow | numtransfor}}↓</span>
                        </p>
                        <p>点赞量</p>
                    </div>
                    
                    <div class="recom-detail__main-fans">
                        <p class="recom-detail__main-fans--number">
                          <span class="number-set">{{commend.easy_rate | yznumtransfor}}</span>
                        </p>
                        <p>易指数</p>
                    </div>
                  </div>
                 </div>
               </div>
               <div class="nodata" v-else>暂无数据</div>
             </div>
             
       </div>
        
      </div>
  </div>
</template>

<script>
import { getTalentList, getVideoList, getcommendList } from '@/api/locowerApi';

export default {
  name: 'home',
  data() {
    return {
      // 我的达人
      tanlentlist: [],
      // 达人视频 
      videolist: [],
      // 达人推荐
      commendlist: [],
      // 加载
      loading: false,
      // 显示模块
      topList: [
        {
          title: '达人发现',
          detail: '潜力达人智能推荐',
          src: require('./images/pic-one.png'),
          router: '/talent/talentfind',
        },
        {
          title: '素材查找',
          detail: '热门素材即时发现',
          src: require('./images/pic-two.png'),
          router: '/creative/creativevideo',
        },
        {
          title: '热销商品',
          detail: '爆款好物精心筛选',
          src: require('./images/pic-three.png'),
        },
        {
          title: '实时直播',
          detail: '火热直播实时监测',
          src: require('./images/pic-four.png'),
        },
      ],
    };
  },
  created() {
    // 我的达人
    this.getTalent();
    // 达人视频
    this.getVideo();
    // 达人推荐
    this.getCommend();
  },
  methods: {
    // 路由跳转
    goRouter(router) {
      this.$router.push({ path: router });
    },
    getTalent() {
      this.loading = true;
      getTalentList().then((res) => {
        if (res.code === 200) {
          // 默认显示前四条数据
          this.tanlentlist = res.data.collection_list.slice(0, 4);
          this.loading = false;
        }
      });
    },
    getVideo() {
      this.loading = true;
      getVideoList().then((res) => {
        if (res.code === 200) {
          // 默认显示前四条数据
          this.videolist = res.data.collection_video.slice(0, 4);
          this.loading = false;
        }
      });
    },
    getCommend() {
      this.loading = true;
      getcommendList().then((res) => {
        if (res.code === 200) {
          this.commendlist = res.data.kol_list.slice(0, 4);
          this.loading = false;
        }
      });
    },

    lookPort(item) {
      this.$router.push({
        path: '/homesage',
        query: {
          uid: item.uid,
          nickname: item.nickname,
          avatar: item.avatar,
          short_id: item.short_id,
        },
      });
    },
    
    goNew() {
      // this.$router.push({ path: '/homesage' });
      this.$router.push({ path: '/collection/collectiontalent' });
      
    },

  },
};
</script>

<style lang="scss" scoped>
@import 'common/css/common.scss';
@import "./styles/index.scss";

</style>

