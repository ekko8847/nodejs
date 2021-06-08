const mongoose = require("mongoose")
    //连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/login", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//监听数据库是否连接成功
mongoose.connection.once("open", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("成功1");
})