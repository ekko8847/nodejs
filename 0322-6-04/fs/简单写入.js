const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "text.txt");
//简单写入
fs.writeFile(filePath, "就只剩我一个人狂欢的party", {
    flag: "a"
}, (err) => {
    if (err) {
        return;
    }
    console.log("文件写入成功");
})