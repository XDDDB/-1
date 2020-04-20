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


// 上传新闻参数，新增新闻
var addJournalism=function(req,res){
   
    var body=req.body
   
    //将数据填充到数据库
    var data=[body.title,body.content,getTime(body.createTime),body.author]
    console.log(data)
    var sql='INSERT INTO journalism(title,content,createTime,author) values(?)'
    //操作数据库
    query(sql,[data]).then(function(result){
        res.json({
            status:200,
            message:'添加商品成功'
        })
    }).catch(function(err){
        console.log(err)
        console.log(123)
    })
}


//获取新闻列表
var getJournalism=function(req,res){
    //多表查询  分页limit   排序order by
    var title =req.query.title||req.body.title
    var author =req.query.author||req.body.author
    //需要前端传入的数据 currentPage 当前在多少页 pageSize 每一个页面放的数据长度
    var currentPage=req.query.current || req.body.current || 1
    var pageSize=req.query.pageSize || req.body.pageSize || 10

    //limit 从第几条数据开始 ，长度  limit (currentPage-1)*pageSize,pageSize
    var sql=`SELECT
             id, title,author,createTime
             FROM journalism  
             `
             if(title ){
                 sql+='where  title like"%'+title+'%"'
            }
                 sql+=
             `
             order by createTime desc limit ?,?`
    var data=[(currentPage-1)*pageSize,Number(pageSize)]
    console.log(data)
    query(sql,data).then(function(result){
        var sql1=`SELECT
        id, title,author,createTime
        FROM journalism  
        `
        if(title){
            sql1+='where title like"%'+title+'%"'
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


//删除新闻
var deletaJournalism=function(req,res){
    //获取id  并且将数据从后台删除
    var id=req.body.id||req.query.id
    console.log(id)
    query('delete from journalism where id =?',id).then(function(result){
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


//获取新闻详情
var getDetailJournalism=function(req,res){
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
     id,title, content,createTime,author
    FROM journalism
    WHERE id=?`
    query(sql,Number(id)).then(function(result){
        res.json({
            status:200,
            journalism:result[0]
        })
    })
}


//编辑新闻
var EditJournalism=function(req,res){
    console.log(req.body)
    console.log(req.files)
    var body=req.body

    //操作数据库
    var data=[body.title,body.content,body.author,body.id]
    var sql='update journalism set title=?, content=?, author=? where id=?'
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


module.exports={
    addJournalism,
    getJournalism,
    getDetailJournalism,
    deletaJournalism,
    EditJournalism
}