/**
 * 原理:
 * 创建script标签节点
 * 添加到body
 * @param {} src 
 */
function jsonp(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  document.body.appendChild(script);
}
