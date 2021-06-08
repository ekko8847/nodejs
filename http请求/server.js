const http = require("http");
// const server = http.createServer((request, response) => {
//     console.log("客户端请求");
//     response.setHeader("content-Type", "text/html");
//     response.end('<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25d5155b25644a2d8180f68b29400453~tplv-k3u1fbpfcp-watermark.image" alt="image.png" loading="lazy" class="medium-zoom-image">')
// })
// server.listen("3000", "192.168.17.71", () => {
//     console.log("服务器启动");
// })
const server = http.createServer((req, rep) => {
    rep.setHeader("content-Type", "text/html");
    rep.end("<h1>hello world!</h1>");
    let port = 3000;
    let host = "192.168.17.71";
    server.listen(port, host, () => {
            console.log("服务器启动成功,请访问:" + `http://${host}:${port}`);
        })
        // server.listen("3000", "192.168.17.71", () => {
        //     console.log("服务器启动");
        // })
})