import service from './fetch';

// 发送表单数据post请求
service.postFormData = (url, data, config) => {
  const formData = new FormData();
  const { keys } = Object;
  keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  // for (const key of keys(data)) {
  //   if (data[key]) formData.append(key, data[key]);
  //   else formData.append(key, '');
  // }
  return service.post(url, formData, Object.assign({ headers: { 'Content-Type': 'multipart/form-data' } }, config));
};

// 下载post请求的数据
service.downloadPostResponse = (url, data) => {
  service.postFormData(url, data, { responseType: 'arraybuffer' }).then((response) => {
    const disposition = response.headers['content-disposition'];
    let filename = '';
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
    }
    const type = response['content-type'];
    const blob = typeof File === 'function'
      ? new File([response.data], filename, { type })
      : new Blob([response.data], { type });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007:
      // One or more blob URLs were revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing the URL has been freed."
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const URL = window.URL || window.webkitURL;
      const downloadUrl = URL.createObjectURL(blob);
      if (filename) {
        // use HTML5 a[download] attribute to specify filename
        const a = document.createElement('a');
        // safari doesn't support this yete
        if (typeof a.download === 'undefined') {
          window.location = downloadUrl;
        } else {
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        }
      } else {
        window.location = downloadUrl;
      }
      setTimeout(() => { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
    }
  });
};

export default service;
