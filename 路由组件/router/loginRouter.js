const express = require("express");
const router = new express.Router();
const path = require("path");

const userModel = require("../model/userModel");
//2.登陆接口
router.get("/login", async(req, res) => {
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
module.exports = router;