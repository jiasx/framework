<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-14 16:50:49
 * @Describe: 指数排行榜
-->
<template>
  <div class="talentfind page-scroll__set">
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="数据榜" name="datalist-compo">
      <data-List v-if="activeName === 'datalist-compo'"></data-List> 
    </el-tab-pane>
    <el-tab-pane label="飙升榜" name="soarlist-compo">
      <soar-List v-if="activeName === 'soarlist-compo'"></soar-List> 
    </el-tab-pane>
    <el-tab-pane label="地域榜" name="arealist-compo">
      <area-List v-if="activeName === 'arealist-compo'"></area-List>
    </el-tab-pane>
    <el-tab-pane label="蓝V榜" name="bluevlist-compo">
      <bluev-List v-if="activeName === 'bluevlist-compo'"></bluev-List>
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import dataList from './dataList.vue';
import soarList from './soarList.vue';
import areaList from './areaList.vue';
import bluevList from './bluevList.vue';

export default {
  name: 'talent',
  data() {
    return {
      activeName: 'datalist-compo',
    };
  },
  components: {
    dataList, // 数据榜
    soarList, // 飙升榜
    areaList, // 地域榜
    bluevList, // 蓝V榜
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
@import 'common/css/common.scss';
</style>
