const fs = require("fs");
const path = require("path");
const readFilePath = path.resolve(__dirname, "01.mp4");
const writeFilePath = path.resolve(__dirname, "05.mp4");

const rs = fs.createReadStream(readFilePath);
const ws = fs.createWriteStream(writeFilePath, {
    falg: "a"
});
//pipe会持续性消费可读流数据
//将可读流数据写入到可写流中
//会自动关闭可写流
rs.pipe(ws);
rs.on("end", () => {
    console.log("读取完成");
})