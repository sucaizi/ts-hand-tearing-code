/**
 * 事件总线
 * 1.注册事件
 * 2.触发事件
 * 3.解除事件
 * 4.只执行一次事件
 */
class EventBus {

    constructor() {
        this.task = {};  // 维护事件队列
    }

    on(name, cb) {
        if(!this.task[name]) {
            this.task[name] = []; 
        }

        typeof cb === 'function' && this.task[name].push(cb);
    }

    emit(name, ...arg) {
        let taskQueue = this.task[name];
        if(taskQueue && taskQueue.length > 0) {
            taskQueue.forEach(cb => {
               cb(...arg);
            });
        }
    }

    off(name, cb) {
        let taskQueue = this.task[name];
        if(taskQueue && taskQueue.length > 0) {
            let index = taskQueue.indexOf(cb);
            index != -1 && taskQueue.splice(index, 1);
        }
        if(typeof cb === 'undefined') {
            this.task[name].length = 0;
        }
    }

    once(name, cb) {
        let callback = (...args) => {
            this.off(name, callback);
            cb(...args);
        }

        typeof cb === 'function' && this.on(name, callback);
    }
}