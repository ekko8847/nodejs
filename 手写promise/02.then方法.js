//构造一个myPromise的类

//exector是默认的回调函数(包含resolve和reject)
function myPromise(exector) {
    //保存this
    const _this = this;
    //给实例化对象扩展两个属性status和value
    //默认status是pending 默认value是undefined
    _this.status = "pending";
    _this.value = undefined;
    _this.callback = {};

    function resolve(value) {
        //当状态不从pengding改变的时候直接返回(状态只能改变一次)
        if (_this.status !== "pending") return;
        _this.status = "resolved";
        _this.value = value;
        //为了保证then中的onResolved函数永远是异步的，则我们给他包裹一层异步代码
        //保证onRejected执行的时候，then要已经执行过了
        setTimeout(() => {
            _this.callback.onResolved(value);
        })
    }

    function reject(reason) {
        if (_this.status !== "pending") return;
        _this.status = "reject";
        _this.value = reason;
        setTimeout(() => {
            _this.callback.onResolved(reason);
        })
    }
    //当构造函数被实例化的时候,exector需要直接触发
    exector(resolve, reject);
}
//then在使用的时候是同步调用了，但是我们可以控制then中的函数是异步调用
myPromise.prototype.then = function(onResolved, onRejected) {
    const _this = this;
    //onResolved和onRejected两个方法需要在reject函数和resolve函数调用的时候才能执行
    //但是这两个函数只能在then中接受,所以我们需要把两个函数交给构造函数中的reject和resolve函数使用
    _this.callback.onResolved = onResolved;
    _this.callback.onRejected = onRejected;
}