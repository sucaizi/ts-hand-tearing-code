/**
 * 原理：apply 本身是改变上下文的，因此：
 * 绑定fn到上下文
 * 在该上下文执行函数
 * 删除上下文的fn
 * 返回执行结果
 * @param {*} context 
 * @param  {...any} args 
 */
const apply = function(context) {
    contxt = context ? Object(context) : window;
    context.fn = this;
    let args = Array.prototype.call(arguments, 1);
    if(!args) return context.fn();
    let r = eval('context.fn(' + args + ')');
    delete context.fn;
    return r;
}

Function.prototype.apply = apply;