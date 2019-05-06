var util = {
    // 获取url参数方法
	getUrlParam: function(paraName) {
		var url = document.location.toString()
		var arrObj = url.split('?')
	　　if (arrObj.length > 1) {
			var arrPara = arrObj[1].split('&')
	　　　　var arr
	　　　　for (var i = 0; i < arrPara.length; i++) {
	　　　　　　arr = arrPara[i].split('=')
	　　　　    if (arr != null && arr[0] == paraName) {
					return arr[1]
				}
	　　　　}
	　　　　return ''
	　　} else {
	　　　　return ''
	　　}
	},
    // 请求数据方法
	request: function (param) {
        $.ajax({
            type: param.type || 'get',
            url: param.url || '',
            dataType: param.dataType || 'json',
            data: param.data || '',
            success: function (res) {
                param.success(res)
            },
            error: function (err) {
                alert(err)
            }
        })
    }
}

module.exports = util