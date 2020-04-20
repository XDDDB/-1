var query =require('../mysql/promise1')


// 上传信息
var addInformation=function(req,res){
   
    var body=req.body
   
    //将数据填充到数据库
    var data=[body.consignee,body.account,body.region,body.detailed_address,body.phone,body.tel,body.leave_word,body.freight]
    console.log(data)
    var sql='INSERT INTO information_sheet(consignee,account,region,detailed_address,phone,tel,leave_word,freight) values(?)'
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

//获取信息详情
var getDetailInformation=function(req,res){
    // 接收前端传入的用户名，跟据用户名从数据获取当前商品信息，返回给前端
    var id=req.query.account || req.body.account
    //当前id没有值的时候   前端没有传入id  个签到报错
    if(!account){
        res.json({
            status:501,
            message:'id不能为空'
        })
        return false;
    }

    //当用户传入id的时候，从数据库中查询商品信息
    var sql=`SELECT
    account,consignee, region,detailed_address,phone,tel,leave_word,freight
    FROM information_sheet
    WHERE account=?`
    query(sql,Number(id)).then(function(result){
        res.json({
            status:200,
            information_sheet:result[0]
        })
    })
}

module.exports={
    addInformation,
    getDetailInformation
}