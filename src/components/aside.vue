<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:51:55
 * @Describe: 
-->
/**
 * @Author: fangweiqiang
 * @Date: 2019-07-23 09:51:39
 * @LastEditors: fangweiqiang
 * @LastEditTime: 2019-08-05 10:02:23
 * @Description: 基础侧边栏
 */

<template>
  <el-aside width="200px" class="layout__aside">
    <!-- 一级 -->
    <el-menu :defaultActive="this.$route.name" @select="handleSelect">
      <template v-for="(item) in navList" >
        <el-menu-item v-if="!item.children" :key="item.value" :index="`${item.value}`">
          <el-icon :name="item.iconName" class="iconfont iconsize"/>
          {{item.title}}
        </el-menu-item>
        <!-- 二级 -->
        <el-submenu v-else :key="item.value" :index="`${item.value}`">
          <template slot="title">
            <el-icon :name="item.iconName" class="iconfont iconsize"/>
            {{item.title}}
          </template>
          <el-menu-item v-for="(subItem) in item.children" :key="subItem.value" class="menu-tit" :index="`${subItem.value}`">
            {{subItem.title}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import navList from '@/common/config/asideNavList';

/* eslint-disable no-unused-vars */
export default {
  name: 'Aside',
  data() {
    return {
      navList, // 目录
      activeIndex: '',
    };
  },
  created() {
    this.navInit();
  },
  beforeUnMount() {
    this.navClear();
  },
  methods: {
    handleSelect(select) {
      if (select !== this.$route.name) {
        this.$router.push({
          name: select,
        });
      }
    },
    // 侧边栏默认选定功能
    navInit() {
      this.activeIndex = this.$route.name;
    },
    // 导航定位清空
    navClear() {
      this.activeIndex = '';
      this.defaultOpeneds = [];
    },
  },
};
</script>

<style lang="scss" scoped>
  $height: 48px;
  // 默入字体颜色
  $normalcolor: #333;
  // 当前字体颜色
  $activecolor: #3E6BFE;
  // 当前背景色，划过背景色
  $activebackground: #E4EAFC;
  
  
  .layout__aside{
    background: #fff;
    .el-menu {
      border-right: 0;
    }
  }
  /deep/ .el-submenu .el-submenu__title{
    line-height: $height;
    height: $height;
    color: $normalcolor;
    &:hover {
      background: $activebackground;
      color: $activecolor;
      .iconsize{
        color: $activecolor;
      }
    }
  }
  /deep/ .el-menu-item {
    line-height: $height;
    height: $height;
    color: $normalcolor;
    & .iconsize{
      font-size: 12px;
      margin-right: 3px;
    }
    &:hover {
      color: $activecolor;
      background: $activebackground;
      .iconsize{
        color: $activecolor;
      }
    }
    &.is-active {
      background: $activebackground;
      color: $activecolor;
    }
  }
  .el-icon {
    margin-right: 5px;
  }
  .iconsize{
      font-size: 12px;
      margin-right: 3px;
    }
 .menu-tit {
   font-size: 13px;
   text-indent: 10px;
 }
</style>
