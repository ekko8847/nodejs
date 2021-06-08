const fs = require("fs");
const path = require("path");
//得到文件路径
const filePath = path.resolve(__dirname, "text.txt");
//异步打开文件
fs.open(filePath, "a", (err, fd) => {
    if (err) {
        return;
    }
    //异步写入文件
    fs.write(fd, "蓬松的头发", (err) => {
        if (err) {
            return;
        }
        //异步关闭文件
        fs.close(fd, (err) => {
            if (err) {
                return;
            }
            console.log("文件关闭成功");
        })
    })
})