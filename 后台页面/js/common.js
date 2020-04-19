
/*
* getQueryString Function 从浏览器地址中通过正则的形式匹配参数
* @param name string 需要获取的参数名字
* return返回参数值
*/
function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r) return r[2]
		return '';
	}