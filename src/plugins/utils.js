/*
 * @Author: jiashuangxi
 * @Date: 2020-12-24 10:04:29
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2020-12-24 10:04:50
 * @Describe: 
 */
import XEUtils from 'xe-utils/methods/xe-utils';
import includes from 'xe-utils/methods/array/includes';
import dependencies from 'vxe-table/packages/utils/dependencies';

// 按需导入依赖函数库
XEUtils.mixin(dependencies);
XEUtils.includes = includes;
