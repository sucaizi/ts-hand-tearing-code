/**
 * 原理：
 * 返回一个新的函数
 * 新函数this指向bind的第一个参数
 * 其余参数作为新函数的参数传入
 * 对new的支持，包括this不能被第一个参数替换，支持绑定函数的prototype属性的访问
 * @param {*} context 
 */
const bind = function(context) {
    if(typeof this !== 'function') {
        throw new Error(
          'Function.prototype.bind - what is trying to be bound is not callable'
        );
    }

    var fn = this;  // this 指向就是函数自身
    var args1 = Array.prototype.slice.call(arguments, 1);

    // 包了一层，因为最终，bind是得到了一个执行新作用域的函数。
    var resultFn = function() { // 支持new操作
        var args2= Array.prototype.slice.call(arguments, 1);
        // 如果执行new时，上下文就是函数自身，否则则是指定的上下文
        return fn.apply(this instanceof resultFn ? this : context, args1.concat(args2));
    }

    var fnTemp = new Function();
    fnTemp.prototype =  fn.prototype;
    resultFn.prototype = new fnTemp();
    return resultFn;
}

Function.prototype.bind = bind;