/**
 * 原理：
 * 如果在设定的时间范围内频繁触发某个事件，
 * 则每次都会清空之前的计时，重新从0开始计时，
 * 直到在设定的时间范围内，
 * 没有事件触发，才会执行事件处理函数
 * 以最后一次为准
 * @param {} fn
 * @param {*} time
 * @param  {...any} args
 */
function debounce(fn, time, ...args) {
  var timer;
  // 即劫持原fn函数，返回一个由定时器包装后的fn
  return function() {
    var _this = this;  // 先保存上下文，这样setTimeout 时，fn可以重新指向原上下文
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      fn.call(_this, ...args);
    }, time);
  };
}
