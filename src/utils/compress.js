const canvas = typeof document === 'object' ? document.createElement('canvas') : {};
canvas.width = 1;
canvas.height = 1;
const isWebp = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
const hostName = ['fengcao1.toutiaovideo.cn', 'toutiaovideo.cn'];
export default (url = '', isTiny, quality = 75) => {
  if (!process.env.VUE_APP_Production || /\.gif/g.test(url)) {
    return url;
  }
  const matchLength = hostName.find(item => url.indexOf(item) > -1);
  debugger;
  if (url && !matchLength) {
    if (isWebp) {
      return isTiny ? `${url}@f_webp,q_${quality},w_100` : `${url}@f_webp,q_${quality}`;
    }
    const isPng = /\.png/g.test(url) ? ',f_png' : '';
    if (isPng) {
      return isTiny ? `${url}@w_100${isPng}` : `${url}`;
    }
    return isTiny ? `${url}@w_100,q_${quality}` : `${url}@q_${quality}`;
  }
  return url;
};
