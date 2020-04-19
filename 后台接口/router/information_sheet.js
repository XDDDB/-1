var query =require('../mysql/promise1')


// 上传信息
var addInformation_sheet=function(req,res){
   
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


module.exports={
    addInformation_sheet,

}