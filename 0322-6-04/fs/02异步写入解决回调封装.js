const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "text.txt");

function open() {
    return new Promise((resolve, reject) => {
        fs.open(filePath, "a", (err, fd) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fd);
            console.log(fd);
        })
    })
}

function write(fd) {
    return new Promise((resolve, reject) => {
        fs.write(fd, "牵着我的手看最新展出的油画", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
            console.log(fd);
        })
    })
}

function close(fd) {
    return new Promise((resolve, reject) => {
        fs.close(fd, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("全部完成");
            console.log(fd);
            //fd 文件的描述符，通过fd来对文件进行操作
        })
    });
}
(async() => {
    const fd = await open();
    await write(fd);
    const re = await close(fd);
    return re;
})()
.then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })