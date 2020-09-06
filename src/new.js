/**
 * 原理：一个干净的对象，把Fn的原型链接到新对象，
 * 把this指向obj，处理返回结果(Fn执行后可能返回基本的数据类型，需要忽略);
 */
function New(Fn, ...args) {
      if (typeof Fn !== 'function') {
        throw 'New function the first param must be a function';
      }
      let obj = {};
      Object.setPrototypeOf(obj, Fn.prototype);
      let r = Fn.apply(obj, args);
      return r instanceof Object ? r : obj;
}