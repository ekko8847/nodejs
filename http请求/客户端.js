const http = require("http");

const url = "http://192.168.17.71:3000";
const request = http.request(url, request => {
    console.log(request.statusCode);
    let result = {};
    request.on("data", (chunk) => {
        // console.log(chunk.toString());
        result += chunk.toString();
    })
    request.on("end", () => {
        console.log("数据接收完毕", result);
    });
})
request.end();