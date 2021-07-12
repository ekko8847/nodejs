//构造一个myPromise的类
//exector是默认的回调函数(包含resolve和reject)
function myPromise(exector) {
    //保存this
    const _this = this;
    //给实例化对象扩展两个属性status和value
    //默认status是pending 默认value是undefined
    _this.status = "pending";
    _this.value = undefined;

    function resolve(value) {
        //当状态不从pengding改变的时候直接返回(状态只能改变一次)
        if (_this.status !== "pending") return;
        _this.status = "resolved";
        _this.value = value;
    }

    function reject(reason) {
        if (_this.status !== "pending") return;
        _this.status = "reject";
        _this.value = reason;
    }
    //当构造函数被实例化的时候,exector需要直接触发
    exector(resolve, reject);
}