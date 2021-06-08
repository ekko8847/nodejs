const express = require("express");
const path = require("path");
require("./db")
const userModel = require("./model/userModel");

//创建一个express的application对象
const app = express();
//引入mongoose
const mongoose = require("mongoose");

//引入ejs
const ejs = require("ejs");

//通知express使用ejs模板引擎
app.set("view engine", "ejs");
app.set("views", "views");


//注册接口
app.get("/register", async(req, res) => {
        //查看用户输入内容 拿到用户名和密码
        // console.log(req.query);
        const {
            username,
            password
        } = req.query;

        //查看用户的账号和密码是否有空
        // if (!username || !password) return res.send("账号密码不能为空");
        if (!username || !password) {
            //拼接err.ejs的路径
            const filePath = path.resolve(__dirname, "./public/err.ejs")
            return res.render(filePath, {
                errData: "账号密码不能为空"
            })
        }

        //判断当前的用户名是否被注册
        //去数据库查询当前的用户名
        const isHasUser = await userModel.findOne({
            username
        })

        if (isHasUser) {
            const filePath = path.resolve(__dirname, "./public/err.ejs")
            return res.render(filePath, {
                errData: "用户名已经被注册"
            })
        };
        //向数据库写入当前用户信息
        const registerData = await userModel.create({
            username,
            password
        });
        console.log(registerData);
        res.send("注册成功");

    })
    //登陆接口
app.get("/login", async(req, res) => {
    //拿到用户的登录信息
    const {
        username,
        password
    } = req.query;

    //查看用户的账号和密码是否为空
    if (!username || !password) {
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "账号或者密码不能为空"
        })
    }
    //根据username去数据库查询是否存在该用户
    const isHasUser = await userModel.findOne({
        username
    });

    //如果有没有用户名则返回用户名不存在
    // console.log(isHasUser) //如果不存在则返回null
    if (!isHasUser) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "用户名不存在"
        })
    }

    //如果用户名存在，则判断密码是否正确
    if (isHasUser.password != password) {
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "密码错误"
        })
    }
    const filePath = path.resolve(__dirname, "./public/center.html")
    res.sendFile(filePath);
})

//图片接口
app.get("/static/:src", (req, res) => {
    const {
        src
    } = req.params;
    const filePath = path.resolve(__dirname, "./static", src);
    res.sendFile(filePath);
})

app.get("/", (req, res) => {
    // console.log("/被请求了");
    res.redirect("/index.html")
})
app.get("/index.html", (req, res) => {
    // console.log("/被请求了");
    const filePath = path.resolve(__dirname, "./public/index.html");
    res.sendFile(filePath);
})
app.get("/login.html", (req, res) => {
    // console.log("/被请求了");
    const filePath = path.resolve(__dirname, "./public/login.html");
    res.sendFile(filePath);
})
app.get("/register.html", (req, res) => {
    // console.log("/被请求了");
    const filePath = path.resolve(__dirname, "./public/register.html");
    res.sendFile(filePath);
})

//监听端口号和服务器状态
let port = "3000";
app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器启动，请访问" + ` http://127.0.0.1:${port}`);
})