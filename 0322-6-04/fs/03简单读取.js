const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "text.txt");
//简单读取文件(一次性读取)
fs.readFile(filePath, (err, data) => {
    if (err) {
        return;
    }
    console.log(data);
    console.log(data.toString());
})