const fs = require("fs");
const path = require("path");
//得到要写入文件的绝对路径
const filePath = path.resolve(__dirname, "text.txt")
console.log(filePath);
//同步打开文件(第二个参数是文件系统的flag:r代表可写,如果没有则会报错;a代表追加,没有则创建)
const fd = fs.openSync(filePath, "a");
//读取文件的返回值是一个当前文件的id标识
console.log(fd);
//同步写入
fs.writeSync(fd, "淡黄的长裙");
//关闭文件
fs.closeSync(fd);