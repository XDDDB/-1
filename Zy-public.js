// 设置页面字体
function setRootFontSize(){
	var width = document.documentElement.clientWidth;
	if(width > 750) width = 750;
	var fontSize = width / 7.5;
	document.getElementsByTagName("html")[0].style['font-size'] = fontSize + 'px';
}
window.addEventListener('resize', function(){
	setRootFontSize();
}, false);

setRootFontSize();



// 返回顶部
    $(function() {
     $('.backtop').on("click", function() {
      $('body,html').animate({
       scrollTop: 0
      }, 10);
      return false;
     });
    });
   
   // 客服移入显示
   
   $(function(){
	   $('.kefu-mian').mouseenter(function(){
	       $('.kefu-none').css("display","block");
	   });
	   $('.kefu-none').mouseleave(function(){
	       $('.kefu-none').css("display","none");
	   });
   })
   
  