// //1. 导入mysql
// var mysql=require('mysql')
// //2.创建连接池 并传入数据库配置信息
// var pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'123456789',
//     database:'yuanzu',//数控库名称
//     connectionLimit:10  //连接吃最大莲姐姐数 
// })

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
// 上传商品参数，新增商品
var addGoods=function(req,res){
    //获取上传的图片以及参数
    console.log(req.files)
    var body=req.body
    var fileLists =req.files.goodsImg, goodsImg=''
    var fileLists1 =req.files.attr, attr=''
    
    for(var i=0;i<fileLists.length;i++){
        goodsImg+=fileLists[i].filename+(i<fileLists.length-1 ? ',' : '')
        console.log(123)
    }
    for(var i=0;i<fileLists1.length;i++){
        attr+=fileLists1[i].filename+(i<fileLists1.length-1 ? ',' : '')
        console.log(456)

    }
    
    console.log(fileLists.length)
    console.log(fileLists1.length)
    //将数据填充到数据库
    var data=[body.name,body.price,body.brand,body.type,body.derive,body.date,body.prototype,body.category,body.ratio,body.age,goodsImg,Number(body.limitation),attr,Number(body.status),getTime(body.createTime)]
    console.log(data)
    var sql='INSERT INTO commodity_details(name,price,brand,type,derive,date,prototype,category,ratio,age,goodsImg,limitation,attr,status,createTime) values(?)'
    //操作数据库
    query(sql,[data]).then(function(result){
        res.json({
            status:200,
            message:'添加商品成功'
        })
    }).catch(function(err){
        console.log(err)
    })
}

//获取查询商品
var goodsList=function(req,res){
    //多表查询  分页limit   排序order by
    var name =req.query.name||req.body.name
    var status =req.query.status||req.body.status
    var start =req.query.name||req.body.start
    var end =req.query.name||req.body.end
    //需要前端传入的数据 currentPage 当前在多少页 pageSize 每一个页面放的数据长度
    var currentPage=req.query.current || req.body.current || 1
    var pageSize=req.query.pageSize || req.body.pageSize || 10
    
    //limit 从第几条数据开始 ，长度  limit (currentPage-1)*pageSize,pageSize
    var sql=`SELECT
            id, name, status, goodsImg, attr,createTime
            FROM commodity_details 
            `
        if(name || status || start || end){
             sql+='where name like"%'+name+'%" and status like"%'+status+'%"'
        }   
        sql+=`ORDER BY createTime DESC LIMIT ?,?`  
    var data=[(currentPage-1)*pageSize,Number(pageSize)]
    console.log(data)
    query(sql,data).then(function(result){
        var sql1=`SELECT
                id, name, status, goodsImg, attr,createTime
                FROM commodity_details 
                `
            if(name || status || start || end){
            sql1+='where name like"%'+name+'%" and status like"%'+status+'%"'
            }
        query(sql1).then(function(resl){
            res.json({
                status:200,
                list:result,
                total:resl.length
            })
            console.log(result.length)
    }).catch(function(err){
        console.log(err)
        console.log(222)
    })
}).catch(function(err){
        console.log(err)
        console.log(333)
})
}


//获取商品信息返回前端以上线的商品以及搜索功能
var goodsList1=function(req,res){
    //多表查询  分页limit   排序order by
    var name =req.query.name||req.body.name
    var status =req.query.status||req.body.status
    //需要前端传入的数据 currentPage 当前在多少页 pageSize 每一个页面放的数据长度
    var currentPage=req.query.current || req.body.current || 1
    var pageSize=req.query.pageSize || req.body.pageSize || 10
    
    //limit 从第几条数据开始 ，长度  limit (currentPage-1)*pageSize,pageSize
    var sql=`SELECT
            id, name, status, goodsImg, attr,createTime
            FROM commodity_details 
            `
        if(name){
             sql+='where status = 1 and name like "%'+name+'%"'
        }   
        sql+=`ORDER BY createTime DESC LIMIT ?,?`  
    var data=[(currentPage-1)*pageSize,Number(pageSize)]
    console.log(sql)
    query(sql,data).then(function(result){
        var sql1=`SELECT
                id, name, status, goodsImg, attr,createTime
                FROM commodity_details 
                `
            if(name){
                sql1+='where status = 1 and name like "%'+name+'%"'
            }
        query(sql1).then(function(resl){
            res.json({
                status:200,
                list:result,
                total:resl.length
            })
    }).catch(function(err){
        console.log(err)
        console.log(1222)
    })
}).catch(function(err){
        console.log(err)
        console.log(1333)
})
}

//最热卖
var getHeatgoods=function(req,res){
    query('SELECT name,price,goodsImg FROM commodity_details ORDER BY heat DESC LIMIT 8').then(function(result){
        res.json({
            status:200,
            list:result
        })
    }).catch(function(err){
        console.log(err)
        res.json({
            status:500,
            message:'111'
        })
    })
}


//预约商品
var goodsList2=function(req,res){
    //多表查询  分页limit   排序order by
    var name =req.query.name||req.body.name
    var createTime=req.body.createTime
    //需要前端传入的数据 currentPage 当前在多少页 pageSize 每一个页面放的数据长度
    var currentPage=req.query.current || req.body.current || 1
    var pageSize=req.query.pageSize || req.body.pageSize || 10
    
    //limit 从第几条数据开始 ，长度  limit (currentPage-1)*pageSize,pageSize
    var sql=`SELECT * FROM commodity_details WHERE  UNIX_TIMESTAMP(DATE) > UNIX_TIMESTAMP(?) 
            `
        if(name){
             sql+='and status = 1 and name like "%'+name+'%"'
        }   
        sql+=`ORDER BY createTime DESC LIMIT ?,?`  
    var data=[getTime(createTime),(currentPage-1)*pageSize,Number(pageSize)]
    console.log(sql)
    query(sql,data).then(function(result){
        var sql1=`SELECT
                id, name, status, goodsImg, attr,createTime
                FROM commodity_details 
                `
            if(name){
                sql1+='and status = 1 and name like "%'+name+'%"'
            }
        query(sql1).then(function(resl){
            res.json({
                status:200,
                list:result,
                total:resl.length
            })
    }).catch(function(err){
        console.log(err)
        console.log(1222)
    })
}).catch(function(err){
        console.log(err)
        console.log(1333)
})
}

//获取商品详情
var getDetailRs=function(req,res){
    // 接收前端传入的商品id，跟据商品id从数据获取当前商品信息，返回给前端
    var id=req.query.id || req.body.id
    //当前id没有值的时候   前端没有传入id  个签到报错
    if(!id){
        res.json({
            status:501,
            message:'id不能为空'
        })
        return false;
    }

    //当用户传入id的时候，从数据库中查询商品信息
    var sql=`SELECT
    name,price,brand,type,derive,date,prototype,category,ratio,age,goodsImg,limitation,attr,status,createTime
    FROM commodity_details WHERE id=?`
    query(sql,Number(id)).then(function(result){
        res.json({
            status:200,
            commodity_details:result[0]
        })
    })
}


//编辑商品
var editGoods=function(req,res){
    // console.log(req.body)
    // console.log(req.files)
    var body=req.body
    var files=req.files
    var goodsImg=body.goodsImg1
    var attr=body.attr1
    console.log(goodsImg)

    if(files.goodsImg){
        files.goodsImg.forEach(function(item,index){
            if(index<=files.goodsImg.length-1){
                if(goodsImg){
                    goodsImg+= ','+item.filename
                }else{
                    goodsImg+= item.filename
                }
            }else {
                goodsImg+=','+item.filename
                }
        //     // if(index<files.length-1){
        //     //     img+=','+item.filename
        //     // }else{
        //     //     img+= ','+item.filename
        //     // }
        })
    }
    if(files.attr){
        files.attr.forEach(function(item,index){
            if(index<files.attr.length-1){
                attr+= item.filename
            }else {
                attr+= item.filename    
                }
        })
    }

    
    //操作数据库
    var data=[body.name,body.price,body.brand,body.type,body.derive,body.date,body.prototype,body.category,body.ratio,body.age,goodsImg,Number(body.limitation),attr,Number(body.status),getTime(body.createTime),body.id]

    var sql='update commodity_details set name=?,price=?,brand=?,type=?,derive=?,date=?,prototype=?,category=?,ratio=?,age=?,goodsImg=?,limitation=?,attr=?,status=?,createTime=? where id=?'
    //操作数据库
    query(sql,data).then(function(result){
        res.json({
            status:200,
            message:'添加商品成功'
        })
    }).catch(function(err){
        console.log(err)
    })
}

//删除商品
var deletaGoods=function(req,res){
    //获取id  并且将数据从后台删除
    var id=req.body.id||req.query.id
    console.log(id)
    query('delete from commodity_details where id =?',id).then(function(result){
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
    addGoods,
    goodsList,
    goodsList1,
    getHeatgoods,
    getDetailRs,
    editGoods,
    deletaGoods,
    goodsList2
}
