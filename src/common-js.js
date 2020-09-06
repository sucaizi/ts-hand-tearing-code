const fs = require('fs');
const path = require('path');
const vm = require('vm');

/**
 * 目标：
 * 所有模块运行在模块自己的作用域中，不影响全局作用域；(闭包函数)
 * 模块可以被多次加载，但只有第一次会运行一次，后面再加载使用缓存。（缓存信息)
 * 读取模块的路径可以不加后缀，自动找到对应后缀模块。
 *  
 * 生成模块的结构：
 * (function(exports, require, module, './src', 'test.js'){
 *   var xxx require('mm');
 *   var fn = function(){};
 *   module.exports = { fn: fn };
 *   // exports.fn = fn;
 * }});
 * 
 * 用例：
 * const func = req('./b');
 * func(); // Hello
 */

/**
 *
 * @param {*} id
 */
const req = function(id) {
  // 根据文件名获取文件的完整路径
  const ext = Module.getPath(id);
  // 如果缓存存在则直接返回
  if (Module.cache[ext]) {
    return Module.cache[ext];
  }
  // 把每个文件都抽象一个Module 对象
  const thisModule = new Module(ext);
  // 获得文件的扩展名，以便区分处理。
  const extName = path.extname(ext);
  // 获取模块导出的包
  const result = Module.extensions[extName](thisModule);
  // 缓存
  Module.cache[ext] = thisModule;
  return result;
};

// 定义module对象
function Module(id) {
  this.id = id;
  this.exports = {};  // 记录当前模块导出的内容
}

// 缓存
Module.cache = {};

Module.extensions = {};

// 处理js文件
Module.extensions['.js'] = function(module) {
  // 读取文件内容
  let script = fs.readFileSync(module.id, 'utf-8');
  // 包装文件内容变成闭包字符串
  const wrapper = `(function(exports, require, module, __dirname, __filename){${script}})`;
  const fn = vm.runInThisContext(wrapper); // 转成js函数
  // 传入module以便使用module.exports = xxxx
  // 传入req，以便使用req('xxx')
  // 传入module, 以便使用module的信息
  // __dirname, __filename 记录当前js文件的信息
  fn(module.exports, req, module, __dirname, __filename);
  return exports;
};

// 处理json文件
Module.extensions['.json'] = function(module) {
  let jsonContent = fs.readFileSync(module.id, 'utf8');
  return JSON.parse(jsonContent);
};

// 获取模块的绝对路径
Module.getPath = function(id) {
  const absPath = path.resolve(id);
  if (fs.exists(absPath)) {
    return absPath;
  }

  const extension = Object.keys(Module.extensions);
  for (let i = 0; i < extension.length; i++) {
    const ext = `${absPath}${extension[i]}`;
    if (fs.existsSync(ext)) {
      return ext;
    }
  }
  throw new Error('The file do not exists');
};
