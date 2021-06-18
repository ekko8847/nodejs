const express = require("express");
const app = express();
app.get("/login", (req, res) => {
    //get请求中用req.query
    const {
        user,
        pass,
        callback
    } = req.query;
    console.log(req.query);
    //允许某一个地址进行跨域
    res.set("Access-Control-Allow-Orign", "http://127.0.0.1:5000");

    if (user === "kiko" && pass === "123") {
        const data = {
            mes: "ok",
            code: 1
        }
        res.set("content-type", "application/javascript;charset=utf-8");
        return res.send(`${callback}(${JSON.stringify(data)})`)
    }

    const err = {
        mes: "no ok",
        code: 0
    }
    return res.send(err);

})
app.listen("5000", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("http://127.0.0.1:5000");
})