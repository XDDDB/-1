resize()
window.onresize = function() {
	resize()
}

function resize() {
	var width = window.innerWidth
	width = width > 750 ? 750 : width
	var fontsize = width*2  / 750 * 100
	$('html').css('fontSize', fontsize)
}
