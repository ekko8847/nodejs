//引入mongoose模块
const mongoose = require("mongoose");
// //连接数据库(回调函数监听)
// mongoose.connect("mongodb://127.0.0.1:27017/someone", {
//     //去除警告
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("数据库连接成功");
// });
//连接数据库(open事件监听)
mongoose.connect("mongodb://127.0.0.1:27017/someone", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once("open", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("成功1");
})