// 导入express模块
const express = require("express")
// 导入验证用户信息
const yanzheng = require("./router.js")
const app = express()
// 导入path模块
const path = require("path")
app.use(express.static("../webapps"))
// 登录
app.get("/",(req,res)=>{
    // 设置响应头 设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*');
    res.sendFile(path.join(__dirname,"../webapps/HTML/login.html"))
})


// 获取用户信息

app.use(yanzheng)

// 
app.listen(80,()=>{
    console.log("服务启动成功 ~ ~");
})
