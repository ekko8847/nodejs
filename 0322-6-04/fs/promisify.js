const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "01.mp4");

// function readFile() {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(data);
//         })
//     })
// }
// readFile().then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

//使用promisify
const {
    promisify
} = require("util");
//promisify是把一个异步处理方法处理,返回一个函数,并且这个函数已经使用promise封装了.
//如果异步成功则返回成功的promise对象,否则返回失败的promise对象
const readFile = promisify(fs.readFile);
console.log(readFile); //[Function: readFile]
readFile(filePath).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})