#### 基础使用

-查看当前 mongo 中所有的数据库
show databases -使用或者创建一个数据库
use person -查看当前所在的数据库
db

##### 增

-新增一条数据
db.student.insert({name:"小龙女",age:26,sex:"女"}) -新增多条数据
db.student.insert([{name:"杨过",age:23,sex:"男},{name:"金轮法王,age:50,sex:"男"}])

##### 查

-查找当前集合所有的数据
db.student.find() -查找当前集合所有年龄为 23 的数据
db.student.find({age:23}); -查找当前集合年龄小于 30 的数据
db.student.find({age:{$lt:30}})
-查找当前集合年龄大于等于30的数据
db.student.find({age:{$gte:30}}) -查找当前集合年龄小于等于 30 或 性别是男的数据
db.student.find({$or:[{age:{$lgt:30}},{sex:"男"}]}) -查找符合 where 条件的
db.student.find({$where:function(){
return this.age>20||this.age<40
}}) -查找符合条件的数据 并限制显示的字段 只显示 name 和 id
db.student.find({},{name:1}) -查找符合条件的数据 并限制显示的字段 只显示 name 和 age
db.student.find({},{name:1,age:1,\_id:0})

##### 改

-修改某个符合条件的数据修改
db.student.updataOne({sex:"男"},{$set:{age:19}})
-修改所有符合条件的数据
db.student.updataMany({sex:"男"},{$set:{age:22}})

##### 删

db.student.deleteOne({age:36})
