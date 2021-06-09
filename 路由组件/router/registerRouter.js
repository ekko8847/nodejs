const express = require("express");
const router = new express.Router();
const path = require("path");

const userModel = require("../model/userModel");
router.get("/register", async(req, res) => {
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
module.exports = router;