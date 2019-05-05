require('./index.css')
// canvas鼠标滑过效果
require('./canvas.js')

var page = {
	init: function(){
		this.navClick()
	},
	navClick: function () {
		$('.nav .nav-item').click(function () {
			$(this).siblings().removeClass('active')
			$(this).addClass('active')
			if($(this).text() === '学习笔记') {

			}
        })
    }
}

page.init()
