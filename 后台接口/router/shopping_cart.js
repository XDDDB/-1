var query =require('../mysql/promise1')


// 上传购物信息参数
var addshopping_cart=function(req,res){
   
    var body=req.body
   
    //将数据填充到数据库
    var data=[body.account,body.id,body.quantity]
    console.log(data)
    var sql='INSERT INTO shopping_cart(account,id,quantity) values(?)'
    //操作数据库
    query(sql,[data]).then(function(result){
        res.json({
            status:200,
            message:'购物车添加成功'
        })
    }).catch(function(err){
        console.log(err)
        console.log(123)
    })
}


//获取购物车列表
var getshopping_cart=function(req,res){
    // 接收前端传入的商品id，跟据商品id从数据获取当前商品信息，返回给前端
    var account=req.query.account || req.body.account
    //当前id没有值的时候   前端没有传入id  个签到报错
    if(!account){
        res.json({
            status:501,
            message:'用户名不能为空'
        })
        return false;
    }
    //当用户传入id的时候，从数据库中查询商品信息
    var sql=`SELECT g.id id,g.name NAME, g.price price, g.goodsImg goodsImg，g.limitation limitation,s.quantity quantity, s.account account 
    FROM commodity_details g RIGHT JOIN shopping_cart s ON g.id = s.id WHERE account=?
    `
    query(sql,account).then(function(result){
        res.json({
            status:200,
            shopping_cart:result
        })
    })
}

//删除购物车
var deletashopping_cart=function(req,res){
    //获取用户名和商品id  并且将数据从后台删除
    var id=req.body.id||req.query.id
    var account=req.body.account||req.query.account
    data=[id,account]
    console.log(id)
    query('delete from shopping_cart where id =? and account=?',data).then(function(result){
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

//修改购物车
var Editshopping_cart=function(req,res){
    var body=req.body
    //操作数据库
    var data=[body.quantity,body.account]
    var sql='update shopping_cart set quantity=? where account=? and id=?'
    //操作数据库
    query(sql,quantity).then(function(result){
        res.json({
            status:200,
            message:'修改购物车成功'
        })
    }).catch(function(err){
        console.log(err)
    })

}
module.exports={
    addshopping_cart,
    getshopping_cart,
    deletashopping_cart,
    Editshopping_cart
}



