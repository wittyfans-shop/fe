/*
* @Author: wittyfans
* @Date:   2017-08-07 14:06:52
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-21 09:40:06
*/

'use strict';
var conf = {
	serverHost : ''
}

var Hogan = require('hogan.js');

var _ws = {
	request : function (param) { //PARAM是一个对象
		var _this = this
		
		$.ajax({
			type 		: param.method || 'get',
			url  		: param.url	|| '',
			dataType	: param.type || 'json',
			data 		: param.data 	 || '',
			
			success 	: function (res) {
				if (0 === res.status) {
					//请求成功
					typeof param.success === 'function' && param.success(res.data,res.msg);
					//只有param.success是function，后面的代码才会执行
				}
				else if (10 === res.status){
					//没有登陆状态，需要强制登陆
					_this.doLogin()
				}
				else if (1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}

			},
			error 		: function (err) {
					typeof param.error === 'function' && param.error(err.statusText);
			}
				})
	},

	doLogin	: function () {
		window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href)
		//？redirect=指定登陆后回来的地址，window.location.href是当前的地址，需要打包处理一些格式才不会出错
	},

	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path
	},

	//获取url的参数
	getUrlParam : function (name) {
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)')
		var result = window.location.search.substr(1).match(reg)
		console.log(result)
		return result ? decodeURIComponent(result[2]) : null

	},

	//处理模版和html，把两者结合
	renderHtml : function (htmlTemplate,data) {
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
		return result
	},
	//提示方法-成功提示
	successTips :function(msg) {
		alert(msg || "操作成功")
	},

	//提示方法错误提示
	errorTips : function(msg){
		alert (msg || "出错了")
	},

	//字段的验证，支持邮箱、手机
	validate : function (value,type) {
		var value = $.trim(value) //去掉空格、变成字符串
		//非空验证
		if ('require' === type ) {
			return !!value
		}
		//手机验证
		if ('phone' === type) {
			return /^1[3|4|5|7|8][0-9]{9}$/.test(value)
		}
		//邮箱验证
		if ('email' === type) {
			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
		}
	},

	//跳回主页
	goHome : function () {
		window.location.href = './index.html'
	}

	
}

 module.exports = _ws
 
