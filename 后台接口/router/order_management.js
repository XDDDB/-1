var query =require('../mysql/promise1')

function getTime(time){
    var datetime=new Date(Number(time));
    var year =datetime.getFullYear();
    var month=datetime.getMonth()+1;
    var day=datetime.getDate();
    var hours=datetime.getHours();
    var monutes=datetime.getMinutes();
    var seconds=datetime.getSeconds();
    return year +'-'+month+'-'+day+' '+hours+':'+monutes+':'+seconds
}

function getTime1(time){
    var datetime=new Date(Number(time));
    var year =datetime.getFullYear();
    var month=datetime.getMonth()+1;
    var day=datetime.getDate();
    var hours=datetime.getHours();
    var monutes=datetime.getMinutes();
    var seconds=datetime.getSeconds();
    return seconds+monutes+hours+day+month+year+''
}
// 上传订单参数
var addOrder_management=function(req,res){
    var body=req.body
    var time = getTime(body.createTime)

    //订单号
    var order_id= body.account+time+body.id+body.quantity

    //将数据填充到数据库 status=0未付款，1付款
    var data=[body.account,body.id,body.quantity,time,body.status,order_id]
    console.log(data)
    var sql='INSERT INTO order_management(account,id,quantity,time,status,order_id) values(?)'
    //操作数据库
    query(sql,[data]).then(function(result){
        res.json({
            status:200,
            message:'订单添加成功'
        })
        var id=body.id
        var sql1='update commodity_details set heat=heat+1 where id=?'
        query(sql1,id).then(function(result){
        res.json({
            status:200,
            message:'热度添加成功'
            })
        }).catch(function(err){
            console.log(err)
            console.log(456)
        })
    }).catch(function(err){
        console.log(err)
        console.log(123)
    })
}

//获取订单列表
var getOrder_management=function(req,res){
    //多表查询  分页limit   排序order by
    var account =req.query.account||req.body.account
    var id =req.query.id||req.body.id
    var quantity =req.query.password||req.body.quantity
    var status =req.query.status||req.body.status

    //需要前端传入的数据 currentPage 当前在多少页 pageSize 每一个页面放的数据长度
    var currentPage=req.query.current || req.body.current || 1
    var pageSize=req.query.pageSize || req.body.pageSize || 10

    //limit 从第几条数据开始 ，长度  limit (currentPage-1)*pageSize,pageSize
    var sql=`SELECT g.id id,g.name NAME, g.price price, g.goodsImg goodsImg,s.quantity quantity, s.status status ,s.account account,s.order_id order_id
    FROM commodity_details g RIGHT JOIN order_management s ON g.id = s.id   
             `
             if(account){
                 sql+='where account like"%'+account+'%"'
            }
                 sql+=
             `
             order by id desc limit ?,?`
    var data=[(currentPage-1)*pageSize,Number(pageSize)]
     
    query(sql,data).then(function(result){
        var sql1=`SELECT g.id id,g.name NAME, g.price price, g.goodsImg goodsImg,s.quantity quantity, s.status status ,s.account account,s.order_id order_id
        FROM commodity_details g RIGHT JOIN order_management s ON g.id = s.id 
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

//删除订单
var deletaOrder_management=function(req,res){
    //获取用户名和商品id  并且将数据从后台删除
    var id=req.body.id||req.query.id
    var account=req.body.account||req.query.account
    data=[id,account]
    console.log(id)
    query('delete from order_management where id =? and account=?',data).then(function(result){
        res.json({
            status:200,
            message:'删除成功'
        })
    }).catch(function(err){
        console.log(err)
        res.json({
            status:500,
            message:'删除失败'
        })
    })
}

module.exports={
    addOrder_management,
    getOrder_management,
    deletaOrder_management,

}


