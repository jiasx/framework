/**
 * @Author: fangweiqiang
 * @Date: 2019-07-22 20:49:56
 * @LastEditors: fangweiqiang
 * @LastEditTime: 2019-08-14 17:32:11
 * @Description: 基本header
 */

<template>
  <el-header height="50" class="layout__header">
    <!-- logo -->
    <div class="layout__header--logo" @click="turnPage({name: 'home'})">
        <div class="iconfont logo layout__header--logo--set"></div>
    </div>
    <!-- 用户信息 -->
    <div class="layout__header--user">
      <div class="layout__header--user--nav">
        <div class="iconfont navbar layout__header--user--navbarset"></div>
        <bread-crumb class="layout__header--user--navbartit"></bread-crumb>
      </div>
      <div class="layout__header--user--block">
        <span class="iconfont tiktok layout__header--user--tiktok"></span>
        <span class="iconfont question layout__header--user--question"></span>
        <el-dropdown class="layout__header--user--dropdown" :hide-on-click="false" @command="handleDropDownClick">
          <span class="layout__header--user--wrap">
            <span class="layout__header--user--nickname">{{telname}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{method: 'logout', args: []}">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    </div>
  </el-header>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { getUser } from '@/api/locowerApi';

export default {
  name: 'Head',
  data() {
    return {
      telname: '',
    };
  },
  created() {
    // 热门视频列表
    this.getusrset();
  },
  methods: {
    handleDropDownClick(command) {
      if (command.args.length > 0) {
        this[command.method](...command.args);
      } else {
        this[command.method]();
      }
    },
    turnPage(route) {
      if (route) { 
        this.$router.push(route); 
      }
    },
    // 获取用户信息
    getusrset() {
      getUser().then((res) => {
        if (res.code === 200) {
          this.telname = res.data.info[0].tel;
        }
      });
    },
    // 退出
    logout() {
      window.location.href = 'http://toutiaovideo.cn/index.php/user/login/index?redirect=http://fengcao1.toutiaovideo.cn/';
    },
  },
  components: {
    BreadCrumb,
  },

};
</script>

<style lang="scss" scoped>
  $height: 60px;
  .layout__header{
    line-height: $height;
    height: $height;
    overflow: hidden;
    padding: 0px;
    display: flex;
    background: linear-gradient(127deg, #3E6BFE 0%, #7E41FC 100%);
    box-shadow: 0px 3px 6px rgba(62, 107, 254, 0.3);
    position: relative;
    z-index: 1;
    color: #333848;
    &--logo{
      width: 200px;  
      color: #333;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      background: #3E52FE;
      box-shadow: 0px 3px 6px rgba(62, 107, 254, 0.3);
      &--set{
        font-size: 28px;
        color: #fff;
      }
      &:hover{
        cursor: pointer;
      }
    }
    
    &--user{
      flex: 1;
      padding: 0 20px;
      &--nav {
        width: 200px;
        float: left;
      }
      &--block {
        float: right;
      }
      &--tiktok {
        color: #fff;
        font-size: 16px;
        margin-right: 14px;
      }
      &--question {
        color: #fff;
        font-size: 16px;
        margin-right: 14px;
      }
      &--dropdown {
        color: #fff;
      }
      &--navbarset {
        color: #fff;
        font-size: 18px;
        margin-right: 10px;
        float: left;
      }
      &--navbartit {
        color: #fff;
        font-size: 18px;
      }

      &--wrap {
        cursor: pointer;
        display: inline-block;
        line-height: $height;
        font-size: 12px;
      }
      &--avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        vertical-align: -7px;
      }
      &--nickname {
        margin: 0 5px;
        color: #fff;
        font-size: 14px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        padding-left: 10px;
      }
      .tool-bar {
        position: absolute;
        z-index: 99999;
        background-color: #fff;
        top: 100%;
        right: 16px;
        width: 98px;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
        .tool-item {
          line-height: 32px;
          cursor: pointer;
          font-size: 12px;
          text-align: center;
          color: #333333;
          &:hover {
            background: #f5fbf6;
            color: #42c57a;
          }
        }
      }
    }
  }
</style>
