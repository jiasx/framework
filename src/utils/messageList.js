import { getType } from './reg';

let eventList = {};

//绑定
export function on(type, fn) {
  if (getType(type) === 'String' && getType(fn) === 'Function') {
    eventList[type] = eventList[type] || [];
    eventList[type].push(fn);
  }
}

//触发
export function file(type, value) {
  if (eventList[type]) {
    eventList[type].forEach((item) => {
      item(value);
    });
  }
}

//移除
export function off(type, fn) {
  if (getType(type) === 'String') {
    if (getType(fn) === 'Function') {
      eventList[type].forEach((item, index) => {
        if (fn === item) {
          eventList[type].slice(index, 1);
        }
      });
    } else {
      eventList[type] = [];
    }
  }
}

//清空
export function clear() {
  eventList = {};
}

export default {
  on,
  off,
  file,
  clear,
};
