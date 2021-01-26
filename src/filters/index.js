/*
 * @Author: jiashuangxi
 * @Date: 2020-12-18 13:53:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-22 15:22:17
 * @Describe: filters过滤器
 */
//  时间：年月日
export function datetime(val) {
  let str = '';
  if (val) {
    const time = new Date(val);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    str = `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
  }
  return str;
}

// 数值转换-粉丝/点赞
export function numtransfor(val) { 
  if (val <= -10000) {
    const downw = val.toString().replace('-', '');
    const numw = `${downw / 10000}w`; 
    return `${parseFloat(numw).toFixed(1)}w`;
  } else if (val < 0 && val > -10000) {
    return val.toString().replace('-', '');
  } else if (val >= 0 && val < 10000) {
    return Math.floor(val);
  } else if (val >= 10000 && val < 100000000) {
    const numw = `${val / 10000}w`; 
    return `${parseFloat(numw).toFixed(1)}w`;
  } else if (val >= 100000000) {
    const numy = `${val / 100000000}`; 
    return `${parseFloat(numy).toFixed(2)}亿`;
  }
}

// 数值转换-达人概况
export function numdrtransfor(val) { 
  if (val <= -10000) {
    const numw = `${val / 10000}w`; 
    return `${parseFloat(numw).toFixed(1)}w`;
  } else if (val < 0 && val > -10000) {
    return val;
  } else if (val >= 0 && val < 10000) {
    return val;
  } else if (val >= 10000 && val < 100000000) {
    const numw = `${val / 10000}w`; 
    return `${parseFloat(numw).toFixed(1)}w`;
  } else if (val >= 100000000) {
    const numy = `${val / 100000000}`; 
    return `${parseFloat(numy).toFixed(2)}亿`;
  }
}

// 数值转换-易指数
export function yznumtransfor(val) {
  return `${(val / 100).toFixed(2)}`;
}

// 数值转换-增长百分比
export function pretransfor(val) {
  if (val < 0) {
    const downw = val.toString().replace('-', '');
    return `${(downw * 100).toFixed(2)}%`;
  } else if (val >= 0) {
    return `${(val * 100).toFixed(2)}%`;
  } 
}

// 数值转换-达人视频
export function prevideotransfor(val) { 
  return `${(val * 100).toFixed(1)}%`;
}
