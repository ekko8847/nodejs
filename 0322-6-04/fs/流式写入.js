const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "text.txt");
//流式写入,创建可写流
const fd = fs.createWriteStream(filePath, {
    flag: "a"
});
//可写流有一个open和close事件,当可写流打开和关闭时候触发
fd.on("open", () => {
    console.log("可写流打开, 开始写入");
})
fd.on("close", () => {
    console.log("可写流关闭,停止写入");
})
fd.write("锄");
fd.write("禾");
fd.write("日");
fd.close();
//使用流式写入会覆盖之前的内容