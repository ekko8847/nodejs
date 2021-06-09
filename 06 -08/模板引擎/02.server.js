const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "views");
app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "index.ejs");
    const data = "hello world";
    res.render(filePath, {
        data: data,
        name: "kiko!"
    })
})
let port = "3000";
app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器启动，请访问" + ` http://127.0.0.1:${port}`);
})