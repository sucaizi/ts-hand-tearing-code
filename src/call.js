/**
 * 原理：在指定的上下文执行函数
 * 需要绑定fn到上下文
 * 传入参数执行fn
 * 删除上下文的fn，恢复原状
 * 返回fn的执行结果
 * @param {} context 
 * @param  {...any} args 
 */
const bind = function(context) {
  context = context ? Object(context) : window;
  context.fn = this;

  let args = Array.prototype.slice.call(arguments, 1);
  let r = eval('context.fn(' + args.join(',') + ')');
  delete context.fn;
  return r;
};

Function.prototype.bind = bind;
