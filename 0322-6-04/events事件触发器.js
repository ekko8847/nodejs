const EventEmitter = require("events");
//创建子类继承父类EventEmitter
class myEmitter extends EventEmitter {};
//实例化子类
const e1 = new myEmitter();
//绑定事件.
e1.on("event", () => {
    console.log("嘿嘿,你调用了我");
})
setTimeout(() => {
    //触发事件 emit()事件触发器
    e1.emit("event");
    e1.emit("event");
})