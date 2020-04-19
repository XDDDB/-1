var express=require('express')
//1. 导入mysql
var mysql=require('mysql')
//2.创建连接池 并传入数据库配置信息
var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456789',
    database:'yuanzu',//数控库名称
    connectionLimit:10  //连接吃最大莲姐姐数 
})

function query(sql,callback){
    // 3、连接池中去获取连接并讲连接返回
    pool.getConnection(function(err,connection){ 
        if(err){
            callback(err) 
        }else{
            //4.操作数据库，返回需要的信息
            connection.query(sql,function(error,result){
                if(error){
                    callback(error)
                }else{
                    callback(null,result)
                    // res.json({
                    //     status:200,
                    //     list:result
                    // })
                }
                // 释放连接
                connection.release()
            })
        }
    })
}

// 导出方法
module.exports=query

