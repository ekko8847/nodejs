const express = require("express");
const app = express();
app.get("/login", (req, res) => {
    console.log(req.query);
    //允许某一个地址进行跨域
    res.set("Access-Control-Allow-Orign", "http://127.0.0.1:5000");


    res.set("Access-Control-Allow-Origin", "*");
    res.send(`成功了!`);




})
app.listen("5000", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("http://127.0.0.1:5000");
})