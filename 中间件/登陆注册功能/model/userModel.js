const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
        username: {
            type: String,
            //唯一性
            unique: true,
            //是否必需
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })
    //创建一个model
    //var XxxModel = mongoose.model(集合名,xxxSchema); 
const userModel = mongoose.model("userInfo", userSchema);
//暴露接口
module.exports = userModel;