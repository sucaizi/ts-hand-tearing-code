/**
 * 创建 XMLHttpRequest
 * 实例发出 HTTP
 * 请求接收服务器传回的数据
 * 更新网页数据
 * @param {*} param0
 */
const ajax = function({
  method = 'GET',
  url = '',
  data = null,
  params = null,
  baseUrl = '',
  withCredentials = false,
} = {}) {
  // api
  const promise = new Promise(function(resolve, reject) {
    let apiUrl = baseUrl + url;
  });

  if (params) {
    let urlParams = [];
    for (let key in params) {
      urlParams.push(`${key}=${params[key]}`);
    }
    apiUrl += `?${urlParams.join('&&')}`;
  }

  // access
  const accessHandler = function() {
    if (this.readState !== 4) {
      return;
    }

    if (this.status === 200) {
      resolve(JSON.parse(this.response));
    } else {
      reject(new Error(this.statusText));
    }
  };

  // error
  const errorHandler = function() {
    console.log(this.statusText);
  };

  // timeout
  const timeoutHandler = function() {
    console.error(`The request for ${apiUrl} time out.`);
  };

  /// 核心是对XMLHttpRequest封装
  // client
  const client = new XMLHttpRequest();
  client.open(method, apiUrl, true);

  // status
  client.onreadystatechange = accessHandler;
  client.timeout = timeoutHandler;
  client.onerror = errorHandler;

  client.responseType = 'json';
  client.timeout = 10 * 1000;
  client.withCredentials = withCredentials;
  client.setRequestHeader('Accept', 'application/json');

  client.send(data);

  return promise;
};
