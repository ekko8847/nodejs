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
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "用户名不存在"
        })
    }
    //如果存在,判断密码是否正确
    if (isHasUser.password != password) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "密码错误"
        })
    }

    //登陆成功要设置cookie响应给客户端(把ID设置给cookie)
    //第一个参数为cookie的ID(直接用),第二个为数据库的id,第三为设置的值
    /*  res.cookie("userID", isHasUser._id, {
         maxAge: 1000 * 60 * 60 * 24, //http1.1提供,以毫秒为单位 过期时间
         httpOnly: true //设置为不可通过document.cookie来修改
     }); */
    //登录成功设置session
    req.session.username = username;
    //登陆成功跳转至个人中心
    const filePath = path.resolve(__dirname, "../views/center.html");
    res.sendFile(filePath);
})
module.exports = router;