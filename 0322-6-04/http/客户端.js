const http = require("http");
//服务端地址
const url = "http://192.168.17.71:3000";
//http模块有一个request方法可以请求服务端(创建客户端)
const request = http.request(url, (response) => {
        //回调函数有一个参数,就是请求服务端得到的响应response
        console.log(response);
        //得到响应状态码
        console.log(response.statusCode);
        //响应的数据是一个可读流,通过data方法监听得到
        response.on("data", (chunk) => {
            console.log(chunk.toString());
            console.log(chunk);
        })
        response.on("end", (chunk) => {
            console.log("响应数据接收完毕");
        })
    })
    //创建的客户端有一个end方法,可以开始发送请求
request.end();