//路由回调函数放入router.js中
var login =require('./login')
var goods =require('./goods')
var demo=require('./demo')
var journalism=require('./journalism')
var user=require('./user')
//导出一个方法
// extend合并对象
// Object.assign

var router = Object.assign({},login,goods,demo,journalism,user)
module.exports=router