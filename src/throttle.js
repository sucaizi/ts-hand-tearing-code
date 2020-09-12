/**
 * 原理：
 * 多次触发，以第一次触发为准，当持续触发事件时，
 * 保证在设置的时间范围内只调用一次事件处理函数。
 * @param {} fn 
 * @param {*} time 
 * @param  {...any} args 
 */
function throttle(fn, time, ...args) {
  var timer = null;
  // 劫持原函数fn，把fn包装到一个定时里
  return function() {
    var _this = this;
    // 定时器首次生效后，只有等到其执行后，新的定时器才生效
    // 这样保证了多次触发，只有首次生效
    if (!timer) {
      timer = setTimeout(function() {
        fn.call(_this, ...args);
        timer = null;
      }, time);
    }
  };
}
