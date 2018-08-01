// 发布emit 订阅on
/*
    订阅：订阅了一件事情，这件事情会触发回调函数（一个或多个）
    发布：触发了这件事情，所有的回调都会执行
*/
function People() {
    this._event = {};
}
People.prototype.on = function(eventName, callback) {
    if (!this._event[eventName]) {
        this._event[eventName] = [callback];
    } else {
        this._event[eventName].push(callback);
    }
}
People.prototype.emit = function(eventName, ...args) {
    // 把类数组转化为数组
    // [].slice.call(arguments,1)
    // Array.from(arguments).slice(1)
    if (this._event[eventName]) {
        // this._event[eventName].forEach(cb => {
        //     [].slice.call(arguments, 1).forEach(item => {
        //         cb(item);
        //     });
        // })

        this._event[eventName].forEach(cb => cb(...args))
    }

}

let p = new People();
let eat = (who) => console.log(who + '吃饭');
let sleep = (who) => console.log(who + '睡觉');
let study = (who) => console.log(who + '学习');
p.on('生活', eat);
p.on('生活', sleep);
p.on('生活', study);

p.emit('生活', '我', '你');