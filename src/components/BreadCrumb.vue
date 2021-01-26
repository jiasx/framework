<!--
 * @Author: jiashuangxi
 * @Date: 2020-11-26 17:50:56
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-26 10:45:40
 * @Describe: 面包屑组件
-->
<template>
  <div class="layout__breadcrumb" v-if="$route.meta.length">
    <el-breadcrumb>
      <template v-for="(item, index) in $route.meta">
        <el-breadcrumb-item v-if="!item.url" :key="index">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
};
</script>

<style lang="scss" scoped>
.layout__breadcrumb {
  padding-top: 22px;
  font-size: 18px;
  /deep/.el-breadcrumb {
    font-size: 16px;
    &__inner {
      color: #fff;
    }
    &__inner:hover {
      color: #fff;
    }

  }
}

</style>
