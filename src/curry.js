function curry(fn) {
    var args = [...arguments].slice(1);
    var len = fn.length;
    // TODO
}


var add = function(x) {
    return function(y) {
        return function(z) {
            return x + y + z;
        }
    }
}

// add(1) == 
// function(y) {
//    return function(z) {
//        return 1 + x + y
//    }
//}

// add(1)(2) == 
// function(z) {
    // return 1 + 2 + z;
// }

// add(1)(2)(3) == 
// return 1 + 2 + 3;