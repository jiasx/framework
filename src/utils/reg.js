/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2020-11-25 23:54:47
 * @Describe: 
 */

// 判断变量类型
export function getType(type) {
  return Object.prototype.toString.call(type).slice(8, -1);
}

//网络地址验证
export function checkURL(str) {
  return /^(http?|ftp):\/\/\w+/.test(str);
  // return /^(https?|ftp):\/\/\w+/.test(str);
}

//手机验证
export function checkPhone(str) {
  return /^1\d{10}$/.test(str);
}

//邮箱验证
export function checkMail(str) {
  return /^[0-9a-zA-Z._-]+@[a-zA-Z0-9]{2,}.((com)|(cn))$/.test(str);
}

//身份证验证
export function checkID(str) {
  const num = str.split('');
  const sum = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2].reduce((tot, val, ind) => ((val * num[ind]) + tot), 0);
  let lastNum = num[num.length - 1] - 0;
  if (Number.isNaN(lastNum)) {
    lastNum = 10;
  }
  return [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2][sum % 11] === lastNum;
}

//邮编证验证
export function checkCode(str) {
  return /^[1-9]\d[5]$/.test(str);
}

//中文验证
export function checkZN(str) {
  return /^[\u4e00-\u9fa5]$/.test(str);
}
    
