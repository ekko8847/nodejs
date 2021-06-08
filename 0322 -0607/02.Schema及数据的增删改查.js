const mongoose = require("mongoose");
//连接数据库(open事件监听)
mongoose.connect("mongodb://127.0.0.1:27017/someone", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    //当数据库连接成功后 会触发mongoose.connection的open事件
mongoose.connection.once("open", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据库连接成功!");
})


//1.创建Schema对象,方便未来对某个集合的值进行约束
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, //唯一存在(不能有name重名)
        required: true //必填项
    },
    age: Number,
    sex: String,
    hobby: [String], //限制值必须是一个数组,并且数组的值必须是字符串
    createTime: {
        type: Date,
        default: Date.now
    }
});
// console.log(teacherSchema);

//2.创建model对象(集合)
//两个参数:集合的名字 集合的约束对象
const teacherModel = mongoose.model("teacher", teacherSchema);
// //初始化集合的内容(也可以不初始化)
// new teacherModel({
//     name: "zhangsan",
//     age: 18,
//     sex: "nan",
//     hobby: ["唱", "跳"],
//     createTime: Date.now()
// }).save((err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("初始化完成");
// })

//增加一个文档
teacherModel.create({
        name: "老八",
        age: 43,
        sex: "男",
        hobby: ["吃粑粑", "喊麦"],
        createTime: Date.now()
    }, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("数据添加成功");
    })
    //增加多个文档
teacherModel.create([{
    name: "老王",
    age: 23,
    sex: "女",
    hobby: ["玩游戏", "逛街"],
    createTime: Date.now()
}, {
    name: "老李",
    age: 33,
    sex: "男",
    hobby: ["打篮球", "打电动"],
    createTime: Date.now(),
}], err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("ok数据添加成功")
})

// create方法返回一个promise对象,所以可以解决回调函数问题
teacherModel.create({
        name: "阿马",
        age: 25,
        sex: "男",
        hobby: ["打手枪", "看电视"],
        createTime: Date.now()
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
    // 查 提供find方法 返回一个promise对象
teacherModel.find({
        age: {
            $lte: 25
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

//改 updataMany方法可以更新数据
//updataOne方法可以进行更新数据
teacherModel.updateOne({
    name: "老八"
}, {
    $set: {
        age: 2
    }
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})

//删 delete方法可以删除
teacherModel.deleteOne({
        name: "王七"
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })