// function checkPhone(){
//    var num = $('.phone').value()

//     var temp = /^[1][3,4,5,7,8][0-9]{9}$/
//     if(!temp.test($(this.value()))){
//         $(this).value( "手机号码有误！")
//     }
// }

//个人信息 切换
$('.a_5,.a_6,.a_7').click(function(){
    $('.dindan-module').addClass('none')
    $('.grxx-module').removeClass('none')
})

$('.a_5').click(function(){
    $('.grxx-tit .a1').removeClass('a-97')
    $('.grxx-tit .a1').addClass('a-95')
    $('.grxx-tit .a2,.a3').addClass('a-97')
    $('.ul-1').removeClass('none')
    $('.ul-2,.ul-3,.tshu').addClass('none')
})

$('.a_6').click(function(){
    $('.grxx-tit .a2').removeClass('a-97')
    $('.grxx-tit .a2').addClass('a-95')
    $('.grxx-tit .a1,.a3').addClass('a-97')
    $('.ul-2,.tshu').removeClass('none')
    $('.ul-1,.ul-3').addClass('none')
})

$('.a_7').click(function(){
    $('.grxx-tit .a3').removeClass('a-97')
    $('.grxx-tit .a3').addClass('a-95')
    $('.grxx-tit .a1,.a2').addClass('a-97')
    $('.ul-3').removeClass('none')
    $('.ul-2,.ul-1,.tshu').addClass('none')
})

//订单管理
$('.a_1,.a_2,.a_3,.a_4').click(function(){
    $('.grxx-module').addClass('none')
    $('.dindan-module').removeClass('none')
    $('.detail').addClass('none')
    $('.ul-4').removeClass('none')
})
$('.cakan-1').click(function(){
    $('.ul-4').addClass('none')
    $('.detail').removeClass('none')
})
$('.a_1').click(function(){
    $('.a4').removeClass('a-97')
    $('.a4').addClass('a-95')
    $('.a5,.a6,.a7').addClass('a-97')
})
$('.a_2').click(function(){  
    $('.a5').removeClass('a-97')
    $('.a5').addClass('a-95')
    $('.a4,.a6,.a7').addClass('a-97')
    $('.ord-status').html('未支付')
    $('.cakan-1').click(function(){
        $('.ord-det-status').html('未支付')
        $('.pay-2').removeClass('none')
    })
})
$('.a_3,.a_4').click(function(){
    $('.cakan-1').click(function(){
        $('.pay-2').addClass('none')
    })
})
$('.a_3').click(function(){
    $('.a6').removeClass('a-97')
    $('.a6').addClass('a-95')
    $('.a5,.a4,.a7').addClass('a-97')
    $('.ord-status').html('已支付')
    $('.cakan-1').click(function(){
        $('.ord-det-status').html('已支付')
    })
})
$('.a_4').click(function(){
    $('.a7').removeClass('a-97')
    $('.a7').addClass('a-95')
    $('.a5,.a6,.a4').addClass('a-97')
    $('.ord-status').html('已发货')
    $('.cakan-1').click(function(){
        $('.ord-det-status').html('已发货')
    })
})
