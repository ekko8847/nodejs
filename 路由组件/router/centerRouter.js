const express = require("express");
const router = new express.Router();
const path = require("path");
const userModel = require("../model/userModel");
const cookieParser = require("cookie-parser");
//获取cookie并把cookie以对象的形式呈现
router.use(cookieParser());
//权限控制
router.use("/center.html", async(req, res, next) => {
    if (req, cookies.userID) {
        try {
            const re = await userModel.findOne({
                _id: req.cookies.userID
            })
            if (re) {
                next();
            } else {
                const filePath = path.resolve(__dirname, "../views/err.ejs");
                return res.render(filePath, {
                    errData: "权限不足，请重新登录再访问个人中心页"
                })
            }
        } catch (error) {
            const filePath = path.resolve(__dirname, "../views/err.ejs");
            return res.render(filePath, {
                errData: "权限不足，请重新登录再访问个人中心页"
            })
        }
    } else {
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "权限不足，请重新登录再访问个人中心页"
        })
    }

})


router.get("/center.html", (req, res) => {
    //响应页面
    const filePath = path.resolve(__dirname, "../views/center.html")
    res.sendFile(filePath);
})

module.exports = router;