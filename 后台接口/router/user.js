var query =require('../mysql/promise1')


//获取会员列表
var getUser=function(req,res){
    //多表查询  分页limit   排序order by
    var account =req.query.account||req.body.account
    var phone =req.query.phone||req.body.phone
    var password =req.query.password||req.body.password
    var status =req.query.status||req.body.status
    var Email =req.query.Email||req.body.Email
    //需要前端传入的数据 currentPage 当前在多少页 pageSize 每一个页面放的数据长度
    var currentPage=req.query.current || req.body.current || 1
    var pageSize=req.query.pageSize || req.body.pageSize || 10

    //limit 从第几条数据开始 ，长度  limit (currentPage-1)*pageSize,pageSize
    var sql=`SELECT
             phone,password,account,status,Email,id
             FROM user  
             `
             if(account){
                 sql+='where account like"%'+account+'%"'
            }
                 sql+=
             `
             order by id desc limit ?,?`
    var data=[(currentPage-1)*pageSize,Number(pageSize)]
     
    query(sql,data).then(function(result){
        var sql1=`SELECT
        phone,password,account,status,Email,id
        FROM user  
        `
        if(account){
            sql1+='where account like"%'+account+'%"'
       }
    
        query(sql1).then(function(resl){
            res.json({
                status:200,
                list:result,
                total:resl.length
            })
    }).catch(function(err){
        console.log(err)
        console.log(222)
    })
}).catch(function(err){
        console.log(err)
        console.log(333)
})
}

//注销会员
var deletaUser=function(req,res){
    //获取用户名  并且将数据从后台删除
    var account=req.body.account||req.query.account
    // account='"'+account+'"'
    console.log(account)
    var sql='delete from user where account = ?'
    query(sql,account).then(function(result){
        res.json({
            status:200,
            message:'删除成功'
        })
        console.log(111)
    }).catch(function(err){
        console.log(err)
        res.json({
            status:500,
            message:'删除失败'
        })
    })
}


// // 注册，上传注册信息
// var addUser=function(req,res){
   
//     var body=req.body
   
//     //将数据填充到数据库
//     var data=[body.title,body.content,getTime(body.createTime),body.author]
//     console.log(data)
//     var sql='INSERT INTO journalism(title,content,createTime,author) values(?)'
//     //操作数据库
//     query(sql,[data]).then(function(result){
//         res.json({
//             status:200,
//             message:'添加商品成功'
//         })
//     }).catch(function(err){
//         console.log(err)
//         console.log(123)
//     })
// }



module.exports={
    getUser,
    deletaUser,
    // addUser
}