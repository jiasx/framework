<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:26:55
 * @Describe: 
-->
<template>
  <el-container direction="vertical" class="layout__wrap" v-watermask="options">
    <Head></Head>
    <el-container class="layout__contain">
      <router-view />
    </el-container>
  </el-container>
</template>
<script>

import Head from '@/components/head.vue';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  components: {
    Head,
  },
};
</script>
<style lang="scss" >
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
  }
  body {
    font-family: "Microsoft YaHei","微软雅黑","SimSun","宋体";
  }
  .layout__wrap{
    min-height: 100%;
    min-width: 1360px;
    background: #f0f2f5;
  }
</style>

