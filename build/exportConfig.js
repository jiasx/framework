/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2020-12-01 13:45:40
 * @Describe: 
 */
const glob = require('glob');

let defaultData = require('../config/default.json');

if (process.env.NODE_ENV !== 'production') {
  // 获取JSON配置信息
  glob.sync('./config/*.json', {
    ignore: ['./config/default.json'],
  }).forEach((item) => {
    // eslint-disable-next-line import/no-dynamic-require
    const data = require(`.${item}`);
    defaultData = Object.assign(defaultData, data);
  });

  // 获取命令中的信息
  const params = JSON.parse(process.env.npm_config_argv || '{}').original || [];

  params.forEach((item) => {
    const paramsInfo = item.match(/(qa)?test\d+/);
    if (paramsInfo) {
      // eslint-disable-next-line prefer-destructuring
      defaultData.testEnv = paramsInfo[0];
    }
    
    if (item.match(/mock/)) {
      defaultData.Mocks = true;
    }
    if (item.match(/host/)) {
      defaultData.hostUrl = true;
    }
    if (item.match(/proxy/)) {
      defaultData.proxy = true;
    }
    if (item.match(/online/)) {
      defaultData.online = true;
    }
  });
}


module.exports = defaultData;
