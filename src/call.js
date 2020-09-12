/**
 * 原理：在指定的上下文执行函数
 * 需要绑定fn到上下文
 * 传入参数执行fn
 * 删除上下文的fn，恢复原状
 * 返回fn的执行结果
 * @param {} context
 * @param  {...any} args
 */
const call = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Not [function] type');
  }

  // 绑定到上下文
  context = context ? Object(context) : window;
  context.fn = this;

  // 提取参数
  let args = [...arguments].slice(1);

  // 执行
  let r = context.fn(...args);

  // 恢复上下文
  delete context.fn;

  return r;
};

Function.prototype.call = call;
