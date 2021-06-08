const fs = require("fs");
const path = require("path");
//得到文件路径  
//path.resolve([...paths]) 方法将路径或路径片段的序列解析为绝对路径
const filePath = path.resolve(__dirname, "text.txt");
(async() => {
    const fd = await new Promise((resolve, reject) => {
        fs.open(filePath, "a", (err, fd) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fd);
        })
    });
    await new Promise((resolve, reject) => {
        fs.write(fd, "牵着我的手看最新展出的油画", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    });
    const re = await new Promise((resolve, reject) => {
        fs.close(fd, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("文件写入完成");
        })
    });
    return re;
})()
.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})