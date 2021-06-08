const crypto = require("crypto");
//得到一个明文
let str = "12356";
let salt = "hahah";
//加密多层可防止撞库;
str += salt;
//确定使用哪一种消息摘要加密算法 MD5 sha1 sha256 sha512
let md5 = crypto.createHash("sha512");
//使用updata方法得到对应的hash对象:参数是明文和明文的字符编码
const secretHash = md5.update(str, "utf-8");
//通过hash对象的digest("hex")方法 可以得到对应的密文
const secret = secretHash.digest("hex");
console.log(secret);