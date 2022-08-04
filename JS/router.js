// 导入express模块
const express = require("express")
// 导入fs模块
const fs = require("fs");
// 导入MySQL模块
const mysql = require("mysql")
// 导入path模块
const path = require("path")
const yanzheng = express.Router()
yanzheng.get("/index.html",(req,res)=>{
    // 设置响应头 设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*');
    // 建立与数据库的连接
    const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"123456",
        database:"nodejs"
    })
    let data = {
        id : req.query.type
    }
    let data1 = JSON.stringify(data)
    // 查询数据,验证身份
    db.query("select * from users",(err,result)=>{
        res.setHeader("Content-Type","text/html;charset=UTF-8")
        let stu_job_id = Number(req.query.stu_job_id)
        let password = req.query.password
        let type = Number(req.query.type)
        if(err) return console.log(err.message)
        // 判断账户信息且判断用户类型
        for(let i = 0;i < result.length;i++){
            var a = 0
            console.log(stu_job_id,password,type,result[1].stu_job_id,result[1].password,result[1].users_id,result);
            if((stu_job_id === result[i].stu_job_id) && (password === result[i].password) && (type === result[i].users_id)){
               
                if( type === 100){
                   
                    res.send(data1)
                    
                    break
                }
                else if( type === 200){
                  
                    res.send(data1)
                    break
                }
                else{
                  
                    res.send(data1)
                    break
                }
            }
            else a = 1
        }
        if(a === 1 ){
           
                let data = {
                    id : "0"
                }
                let data1 = JSON.stringify(data)
                res.send(data1)
            }
    })   
})


// index首页渲染
yanzheng.get("/index-xuanran",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=UTF-8")
    // 建立与数据库的连接
    const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"123456",
        database:"nodejs"
    })
    let user = {
        stu_job_id : Number(req.query.stu_job_id)
    }
    let sqlStr = "select username,(select password from users where stu_job_id = ?) as password from stu_te where stu_job_id = ?"
    db.query(sqlStr,[user.stu_job_id,user.stu_job_id],(err,result)=>{
        if(err) return console.log(err.message);
        let data = result[0]
        let data1 = JSON.stringify(data)
        res.send(data1)
    })
})




// 成绩信息
yanzheng.get("/index-result",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=UTF-8")
    // 建立与数据库的连接
    const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"123456",
        database:"nodejs"
    })
    let user = {
        stu_job_id : Number(req.query.stu_job_id)
    }
    let sqlStr = "select * from result where stu_job_id=?"
    db.query(sqlStr,[user.stu_job_id],(err,result)=>{
        if(err) return console.log(err.message);
        let data = result[0]
        let data1 = JSON.stringify(data)
        res.send(data1)
    })
})

// 修改密码

yanzheng.get("/index-password",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=UTF-8")
    // 建立与数据库的连接
    const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"123456",
        database:"nodejs"
    })
    let user = {
        newPassword:String(req.query.newPassword),
        stu_job_id:Number(req.query.stu_job_id)
    }
    console.log(user.newPassword,user.stu_job_id);
    let sqlStr = "update users set password = ? where stu_job_id = ?"
    db.query(sqlStr,[user.newPassword,user.stu_job_id],(err,result)=>{
        if(err) return console.log(err.message);
        res.send("密码修改成功")
    })
})


// 成绩信息教师端
yanzheng.get("/index-result-t",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=UTF-8")
    // 建立与数据库的连接
    const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"123456",
        database:"nodejs"
    })
    let user = {
        stu_job_id : Number(req.query.stu_job_id),
        e:String(req.query.e),
        c:String(req.query.c),
        m:String(req.query.m)
    }
    console.log(user.c,user.m,user.e);
    let sqlStr = "update result set 语文 = ?,数学 = ?,英语 = ? where stu_job_id =?"
    db.query(sqlStr,[user.c,user.m,user.e,user.stu_job_id],(err,result)=>{
        if(err) return console.log(err.message);
        res.send("成绩录入成功")
    })
})






// 导出路由模块
module.exports = yanzheng