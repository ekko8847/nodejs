const express = require("express");
const path = require("path");
// const ejs = require("ejs");
const mongoose = require("mongoose");
//连接数据库
require("./db");

//创建express的application对象
const app = express();
//引入的mongoose的当前用户信息集合
const userModel = require("./model/userModel");

//通知express使用ejs模板引擎
app.set("view engine", "ejs");
app.set("views", "views");
//官方的静态资源中间件
app.use(express.static("./public"));
app.use(express.static("./static"));
//处理req请求携带的数据的中间件，把req的数据放在了req.body的属性上了
app.use(express.urlencoded({
    extended: true
}))

//处理账号和密码是否为空的中间件
app.use((req, res, next) => {
        const {
            username,
            password
        } = req.query;
        if (!username || !password) {
            const filePath = path.resolve(__dirname, "./public/err.ejs");
            return res.render(filePath, {
                errData: "账号和密码不能为空"
            })
        }
        //当处理完成的时候继续往下走 (next方法)
        next();
    })
    //处理账号和密码的正则
app.use((req, res, next) => {
    //查看用户输入内容 拿到用户名和密码
    const {
        username,
        password
    } = req.query;

    const userReg = /^[A-Z]{1}[0-9a-zA-Z_]{6,10}$/;
    const passReg = /^[0-9]{6}$/;
    if (!userReg.test(username) || !passReg.test(password)) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "账号和密码格式不对"
        })
    }

    next();

})

//1.注册接口
app.get("/register", async(req, res) => {
    //通过req.query拿到用户名和密码
    const {
        username,
        password
    } = req.query;
    // console.log(req.query) //查看用户输入内容 
    // //判断用户的账号和密码是否为空
    // if (!username || !password) //有一个为空的话非空就为真 或运算符有真则真
    // {
    //     //拼接err.ejs的路径
    //     const filePath = path.resolve(__dirname, "./public/err.ejs");
    //     return res.render(filePath, {
    //         errData: "账号或密码不能为空!"
    //     })
    // }
    //判断用户名是否已经被注册(去数据库查询当前的用户名)
    const isHasUser = await userModel.findOne({
            username
        })
        //如果isHasUser存在(不为null)
    if (isHasUser) {
        const filePath = path.resolve(__dirname, "./public/err.ejs") //当前目录下的用. err.ejs是错误页面(满足条件就跳转)
        return res.render(filePath, {
            errData: "用户名已被注册"
        })
    };
    //向数据库写入用户信息
    const registerData = await userModel.create({
        username,
        password
    });
    console.log(registerData);
    //注册成功直接重定向到登陆界面
    res.redirect("/login.html");
})


//2.登陆接口
app.get("/login", async(req, res) => {
    //拿到输入的信息
    const {
        username,
        password
    } = req.query;
    // //判断信息是否为空
    // if (!username || !password) {
    //     const filePath = path.resolve(__dirname, "./public/err.ejs");
    //     return res.render(filePath, {
    //         errData: "账号或密码不能为空"
    //     })
    // };
    //根据username去数据库查询是否存在该用户
    const isHasUser = await userModel.findOne({
        username
    });
    //如果不存在则跳转至错误页面
    if (!isHasUser) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "用户名不存在"
        })
    }
    //如果存在,判断密码是否正确
    if (isHasUser.password != password) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "密码错误"
        })
    }
    //登陆成功跳转至个人中心
    const filePath = path.resolve(__dirname, "./public/center.html");
    res.sendFile(filePath);
})

// //3.图片接口
// app.get("/static/:src", (req, res) => {
//     // console.log(req.params);
//     const {
//         src
//     } = req.params;
//     const filePath = path.resolve(__dirname, "./static", src)
//     res.sendFile(filePath)
// })

// //默认路径是index.html
// app.get("/", (req, res) => {
//         //当访问根目录则默认重定向到index.html
//         res.redirect("/index.html")
//     })
//     //index.html的路径
// app.get("/index.html", (req, res) => {
//         //获取index.html的路径
//         const filePath = path.resolve(__dirname, "./public/index.html");
//         res.sendFile(filePath);
//     })
//     //login.html的路径
// app.get("/login.html", (req, res) => {
//         //获取index.html的路径
//         const filePath = path.resolve(__dirname, "./public/login.html");
//         res.sendFile(filePath);
//     })
//     //register.html的路径
// app.get("/register.html", (req, res) => {
//     //获取index.html的路径
//     const filePath = path.resolve(__dirname, "./public/register.html");
//     res.sendFile(filePath);
// })


//监听端口号和服务器状态
let port = "3002";
app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("服务器启动，请访问" + ` http://127.0.0.1:${port}`);
})