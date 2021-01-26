/*
 * @Author: jiashuangxi
 * @Date: 2020-12-24 10:05:35
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2020-12-24 10:06:24
 * @Describe: 
 */
// @ts-nocheck
import Vue from 'vue';
import XEUtils from 'xe-utils/methods/xe-utils';
import VXETable from 'vxe-table/packages/v-x-e-table';
import Header from 'vxe-table/packages/header';
import Body from 'vxe-table/packages/body';
import Column from 'vxe-table/packages/column';
import Table from 'vxe-table/packages/table';
import Edit from 'vxe-table/packages/edit';
import Validator from 'vxe-table/packages/validator';
import Toolbar from 'vxe-table/packages/toolbar';
import Tooltip from 'vxe-table/packages/tooltip';

import zhCNLocat from 'vxe-table/packages/locale/lang/zh-CN';
import VXETablePluginElement from 'vxe-table-plugin-element';

VXETable.setup({
  i18n: key => XEUtils.get(zhCNLocat, key),
});

Vue.use(Column);
Vue.use(Header);
Vue.use(Body);
Vue.use(Edit);
Vue.use(Validator);
Vue.use(Toolbar);
Vue.use(Tooltip);
// 安装核心库
Vue.use(Table);
VXETable.use(VXETablePluginElement);
