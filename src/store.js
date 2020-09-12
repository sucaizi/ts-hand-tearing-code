// 发布订阅
// 类似事件总线的作用
class Subject {
    constructor() {
        this.eventList = {};
    }

    subscirbe(name, fn) {
        if(!this.eventList[name]) {
            this.eventList[name] = [];
        }

        this.eventList[name].push(fn);
    }

    unsubscribe(name, fn) {
        var fns = this.eventList[name];
        if(!fns || fns.length == 0) {
            return false;
        }

        if(!fn) {
            fns.length = 0;
        } else {
            fns = fns.filter(f => {return f == fn});
        }
    }

    publish(){
        var name = [].shift.call(arguments);
        var fns = this.eventList[name];
        if(!fns || fns.length === 0) {
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    }
}


class Observer {
    constructor(subject, name, fn) {
        this.subject = subject;
        this.name = name;
        this.subject.subscirbe(name, fn);
    }
}

/**
 * store 标准：
 * state： 状态数据
 * actions：
 * mutations:
 * dispatch: 用于执行 actions
 * commit: 用于执行 mutations
 * 
 */
class Store {
    constructor(params) {
        var self = this;
        this._subject = new Subject();
        this.mutations = params.mutations || {}; 
        this.actions = params.actions || {};
        this.status = '';
        this.state = new Proxy(params.state || {}, {
            get(state, key) {
                return state[key]
            },
            set(state, key, val) {
                if(self.status != 'mutation') {
                    console.warn(`需要采用mutation来改变状态值`);
                }

                state[key] = val;
                self._subject.publish('stateChange', self.state);
                self.status = 'resting';
                return true;
            }
        });
    }

    commit(name, newVal) {
        if(typeof(this.mutations[name]) != 'function'){
            return fasle;
        }
        this.status = 'mutation';
        this.mutations[name](this.state, newVal);
        return true;
    }

    dispatch(key, newVal) {
        if(typeof (this.actions[key]) != 'function') {
            return false;
        }

        this.actions[key](this, newVal);
        self.status = 'action';
        return true;
    }

    getSubject() {
        return this._subject;
    }
}
const store = new Store();
class StoreChange {
    constructor() {
        this.update = this.update || function(){};
        new Observer(store.getSubject(), 'stateChange', this.update.bind(this));
    }
}

// import libStore from "./store";
// let state = {
//   count: 0
// }
// let mutations = {
//   addCount(state, val) {
//     state.count = val
//   },
// }
// let actions = {
//   updateCount(context, val) {
//     context.commit('addCount', val);
//   }
// }
// export default new Store({
//   state,
//   mutations,
//   actions
// })

