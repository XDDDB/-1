var express=require('express')
var app=express();
var bodyParser=require('body-parser')
var path=require('path')
var multer=require('multer')
// 导入router的目录  默认导入的index文件
// 导入router的目录  希望导入的router.js
var router=require('./router')
// console.log(router)
app.use(express.static('./static'))
app.use(express.static('./upload'))


//app接口服务使用body-parser中的方法解析参数
// app.use(parserJson)
// app.use(parserUrlencoded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//将所有访问当前请求的 不管任何域名都允许
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    next()
})


//新建新增分类的接口
app.post('/addDemo',router.addDemo)

// 编辑分类信息
app.post('/editClass',router.editClass)

//获取分类列表
app.get('/getClassList',router.getClassList).post('/getClassList',router.getClassList)

//改变分类状态
app.get('/changeClassStatus',router.changeClassStatus).post('/changeClassStatus',router.changeClassStatus)


//删除分类
app.get('/deletaClass',router.deletaClass).post('/deletaClass',router.deletaClass)

//获取所有的分类
app.get('/getAllClass',router.getAllClass).post('/getAllClass',router.getAllClass)

// 个图片添加后缀名
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload')
    },
    filename:function(req,file,cb){
        //给文件后缀名
        
        var extname=path.extname(file.originalname)
        var filename=file.fieldname+'_'+new Date().getTime()+extname
        cb(null,filename)
    }
})

var uploadGoods=multer({
    storage
}).fields([{name:'goodsImg',maxCount:10},{name:'attr',maxCount:5}])





//删除商品
app.get('/deletaGoods',router.deletaGoods).post('/deletaGoods',router.deletaGoods)

//新增商品
app.post('/addGoods',uploadGoods,router.addGoods)

//监听便能及图片接口
app.post('/goodsEdit',uploadGoods,router.editGoods)

var query=require('./mysql/promise')
app.get('/promise',function(req,res){

    //{then 下一步 catch 捕捉错误}
    query().then(function(result){
        console.log(result)
    }).catch(function(error){
        console.log(error)
    })
})

//获取商品列表
app.get('/goodsList',router.goodsList).post('/goodsList',router.goodsList)

//前端商品列表
app.get('/goodsList1',router.goodsList1).post('/goodsList1',router.goodsList1)

//最热卖商品列表
app.get('/getClassList',router.getClassList).post('/getClassList',router.getClassList)

//预约商品列表
app.get('/goodsList2',router.goodsList2).post('/goodsList2',router.goodsList2)

// 商品详情
app.get('/getDetail',router.getDetailRs).post('/getDetail',router.getDetailRs)


//新增新闻
app.post('/addJournalism',router.addJournalism)

//获取新闻列表
app.get('/getJournalism',router.getJournalism).post('/getJournalism',router.getJournalism)

//删除新闻
app.get('/deletaJournalism',router.deletaJournalism).post('/deletaJournalism',router.deletaJournalism)


// //编辑新闻接口
app.post('/EditJournalism',router.EditJournalism)

// // 新闻详情
app.get('/getDetailJournalism',router.getDetailJournalism).post('/getDetailJournalism',router.getDetailJournalism)


//获取会员列表
app.get('/getUser',router.getUser).post('/getUser',router.getUser)

//删除会员
app.get('/deletaUser',router.deletaUser).post('/deletaUser',router.deletaUser)


//新增购物车
app.post('/addshopping_cart',router.addCart)

//获取购物车列表
app.get('/getshopping_cart',router.getCart).post('/getshopping_cart',router.getCart)

// //编辑新闻接口
app.post('/Editshopping_cart',router.EditCart)

//删除购物车
app.get('/deletashopping_cart',router.deletaCart).post('/deletashopping_cart',router.deletaCart)


//新增订单
app.post('/addOrder_management',router.addOrder_management)

//获取订单
app.get('/getOrder_management',router.getOrder_management).post('/getOrder_management',router.getOrder_management)

//删除订单
app.get('/deletaOrder_management',router.deletaOrder_management).post('/deletaOrder_management',router.deletaOrder_management)

app.listen(3000)