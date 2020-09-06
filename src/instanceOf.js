/**
 * 原理：从对象的实例的原型上__proto__，自底向上遍历
 * 判断其是否等于目标的原型prototype
 * @param {\} src 
 * @param {*} dest 
 */
function Instanceof(src, dest) {
  dest = dest.prototype;
  src = src.__proto__;

  while (true) {
    if (src === null) {
      return false;
    }

    if (dest === src) {
      return true;
    }

    src = src.__proto__;
  }
}
