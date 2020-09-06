
/**
 * 原理：构造一个新的构造函数，链接其原型到对象上，
 * 返回新的对象
 * @param {} obj 
 */
function Create(obj){
    function Fn(){};
    F.prototype = obj;
    return new Fn();
}