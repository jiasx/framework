<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:28:05
 * @Describe: 
-->
<template>
  <el-container>
    <Aside></Aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>

import Aside from './aside.vue';

export default {
  name: 'Wrap',
  data() {
    return {};
  },
  components: {
    Aside,
  },
};
</script>

<style lang="scss" scoped>
  .el-main {
    background: #F5F6FA;
    padding: 10px;
    padding-bottom: 0;
  }
</style>
