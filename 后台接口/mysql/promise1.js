//1. 导入数据库插件
var mysql = require('mysql');

//2. 创建连接池 并传入数据库配置信息
var pool = mysql.createPool({
    user: 'root',
    password: '123456789',
    database: 'xiangmu',
    timezone:'08:00'
});

/*
*  封装数据库访问  query
*  通过函数的形式进行封装
*  nodejs  单线程  非阻塞I/O  只能通过异步的形式达到非阻塞  事件驱动   回调函数
*  通过回调的方式返回
* @param  sql  {String}  操作数据库的语句
* @param callback {function}  调用操作数据库成功后需要执行的操作
*
* */

function query(sql,data) {
    //resolve保存成功信息
    //reject 失败调用的方法并保存失败信息
    return  new Promise(function(resolve, reject ){
        //3. 连接池中去获取连接并将连接返回
        pool.getConnection(function(err, connection){
            if(err) {
                reject(err)
            } else {
                // 4. 操作数据库， 返回需要的信息
                connection.query(sql,data, function(error, result) {
                    if(error) {
                         reject(err)
                    }else {
                        resolve(result)
                    }
                    // 释放连接
                    connection.release()
                })
            }

        })
    })

}

// 导出方法
module.exports = query;