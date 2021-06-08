const http = require("http");

const server = http.createServer((request, response) => {
    // request 请求对象：客户端发送给服务器的数据
    // response 响应对象：服务器发送给客户端的数据
    console.log("客户端请求")
        //设置响应头
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    //response的end方法就是返回响应,参数就是响应的内容
    response.end("你来了?");
})
let port = 3000;
let host = '192.168.17.71';
//给当前创建的服务添加端口号和主机地址,其中第三个参数是回调函数,启动服务的时候调用
server.listen(port, host, () => {
    console.log("服务器启动,请访问:" + `http://${host}:${port}`);
})