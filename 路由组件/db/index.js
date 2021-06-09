const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/login", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//监听数据库是否连接成
mongoose.connection.once("open", err => {
    //数据库中错误优先处理
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})