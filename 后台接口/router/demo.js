//处理分类的接口
//1、引入插件
var formidable=require('formidable')
var path=require('path')
var query =require('../mysql/promise')

//新建新增分类的接口
var addDemo =function(req,res){
    //新增分类的信息  分类的图片  分类的名称  分类状态
    //上传图片是用formidable

    //2、生成表单解析的对象
    var form =new formidable.IncomingForm()

    //3、设置图片上传的文件地址
    form.uploadDir=path.resolve(__dirname,'../upload')

    //4、设置上传图片是否保存后缀名
    form.keepExtensions=true;

    //5、解释上传的信息
    //fields 表单区域除文件外的其他数据
    //files  上传的图片
    form.parse(req,function(error,fields,files){
        var filePath=files.img.path;
        var fileObj=path.parse(filePath)
        var className=fields.name;
        var classStatus=Number(fields.status);
        var imgPath=fileObj.base
        var data=[className,classStatus,imgPath]
        //将获取的数据存入数据库 操作数据库
        query('INSERT INTO stul(class_name,class_status,img) VALUES(?)',[data])
        .then(function(result){
            res.json({
                status:200,
                message:'新增分类成功'
            })
        }).catch(function(err){
            res.json({
                status:500,
                message:'当前网络不好请重试'
            })
        })
    })
}

//获取所有分类列表
var getAllClass=function(req,res){
    query('SELECT * FROM stul').then(function(result){
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

//获取分类列表
var getClassList=function(req,res){
    //获取分类表中的数据并返回给接口
    // 再次编辑  做一个分页效果
    // 当钱页数多少current   每一页显示的数据  pageSize
    var current = req.query.current || 1;
    var pageSize =req.query.pageSize || 2;
    // var sql ='SELECT * FROM stul LIMIT'+(current-1)*pageSize+','+pageSize
    var data=[(current-1)*pageSize,Number(pageSize)]
    var sql='SELECT * FROM stul LIMIT ?,?'
    query(sql,data).then(function(result){
        query('SELECT * FROM stul').then(function(total){
            res.json({
                status:200,
                list:result,
                total:total.length
            })
        })
        
    }).catch(function(err){
        res.json({
            status:500,
            message:'服务器错误'
        })
    })
}

// 编辑分类信息
var editClass=function(req,res){
//获取上传的数据 并修改数据库操作
var form =new formidable.IncomingForm()
form.uploadDir=path.resolve(__dirname,'../upload')
form.keepExtensions=true;
form.parse(req,function(err,filed,files){
    console.log(err)
    if(!err){
        console.log(filed)
        console.log(files)
        var imgPath = files.img ? files.img.path : '';
        var img =imgPath ? path.parse(imgPath).base : '';
        var sql='';
        var data=[]
        if(img){
            sql='update stul set class_name =?, class_status=?,img=? where id=?'
            data=[filed.name,Number(filed.status),img,Number(filed.id)]
        }else{
            sql='update stul set class_name =?, class_status=? where id=?'
            data=[filed.name,Number(filed.status),Number(filed.id)]
        }
        console.log(sql)
        console.log(data)
        //操作数据库
        query(sql,data).then(function(result){
            res.json({
                status:200,
                message:'编辑成功'
            })
        }).catch(function(err){
            console.log(err)
            res.json({
                status:501,
                message:'编辑失败'
            })
        })

    }
})

}

//改变分类状态
var changeClassStatus=function(req,res){
    //从前端获取到  分类要更改的状态
    var status=req.query.status
    var id=req.query.id

    //改变数据库中的分类状态值
    var sql='update stul set class_status=? where id=?'
    data=[status,id]
    query(sql,data).then(function(result){
        res.json({
            status:200,
            message:'更改状态成功'
        })
    }).catch(function(err){
        console.log(err)
        res.json({
            status:501,
            message:'网络不好'
        })
    })

}

//删除分类
var deletaClass=function(req,res){
    //获取id  并且将数据从后台删除
    var id=req.body.id||req.query.id
    query('delete from stul where id =?',id).then(function(result){
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
    addDemo,
    getClassList,
    editClass,
    changeClassStatus,
    deletaClass,
    getAllClass
}