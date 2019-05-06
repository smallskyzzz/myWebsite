require('./index.css')
// canvas鼠标滑过效果
require('./canvas.js')

var util = require('../../util/util.js')

var page = {
	init: function(){
		this.navClick()
		this.refresh()
	},
	// 监听url事件
	refresh: function() {
		// 监听pushstate事件
		// var _wr = function(type) {
		// var orig = history[type];
		// return function() {
		// 	var rv = orig.apply(this, arguments);
		// 	var e = new Event(type);
		// 	e.arguments = arguments;
		// 	window.dispatchEvent(e);
		// 	return rv;
		// }
		// }
		//  history.pushState = _wr('pushState');
		//  window.addEventListener('pushState', function(e) {
		//
		//  })
		var _this = this
		window.addEventListener('load', function () {
			_this.pageLoad(util.getUrlParam('page'))
			if(util.getUrlParam('page') === 'note'){
				console.log($('.nav-item')[1])
				$($('.nav-item')[1]).siblings().removeClass('active')
				$($('.nav-item')[1]).addClass('active')
			}
        })
	},
	// nav点击事件
	navClick: function () {
		var _this = this
		$('.nav .nav-item').click(function () {
			$(this).siblings().removeClass('active')
			$(this).addClass('active')
			if($(this).text() === '主页') {
				window.history.pushState('', '', '?page=main')
				_this.pageLoad('main')
			}
			if($(this).text() === '学习笔记') {
				window.history.pushState('/more', '', '?page=note')
				_this.pageLoad('note')
			}
        })
    },
	// 页面加载
	pageLoad: function (page) {
		$('.content').text(page)
		if(page === 'note'){
			util.request({
				url: '/api/getContent',
				success: function (res) {
					if(res.state){
						for(var i=0;i<res.results.length;i++){
							var noteItem = $('<div class="note-item"></div>')
							var title = $('<div class="title"></div>')
							title.text(res.results[i].title)
							var noteContent = $('<div class="note-content"></div>')
							noteContent.text(res.results[i].content)
							noteItem.append(title)
							noteItem.append(noteContent)
							$('.content').append(noteItem)
						}
					}
                }
			})
		}
    }
}

page.init()

// 使用hash方法实现前端路由
// 需要url中包含#，location.hash获取到的是#后面的内容
// function Router() {
// 	this.curUrl = ''
// 	this.routes = {}
// 	this.refresh = function () {
// 		this.curUrl = location.hash.slice(1) || '/'
// 		this.routes[this.curUrl]()
//     }
//     this.init = function () {
// 		window.addEventListener('hashchange', this.refresh.bind(this))
// 		window.addEventListener('load', this.refresh.bind(this))
//     }
//     this.route = function (path, callback) {
// 		this.routes[path] = callback || function () {}
//     }
// }
//
// var div = document.querySelector('.content')
// var r = new Router()
// r.init()
// r.route('/', function () {
// 	window.location.href = 'http://localhost:8080/dist/view/index.html#/main'
// 	div.textContent = '1'
// })
// r.route('/note', function () {
// 	div.textContent = '2'
// })
