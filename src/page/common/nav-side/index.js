/*
* @Author: wittyfans
* @Date:   2017-08-10 23:00:44
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-13 22:08:03
*/

'use strict';
require('./index.css')
var ws = require('util/ws.js')
var templateIndex = require('./index.string')


var navSide = {

	option : {
		name : '',
		navList : [
			{name : 'user-center', desc:'个人中心',    href:'./user-center.html'},
			{name : 'order-list' , desc:'我的订单',    href:'./order-list.html'},
			{name : 'reset-pwd'  , desc:'修改密码',    href:'./reset-pwd.html'},
			{name : 'about'      , desc:'关于witty',  href:'./about.html'},
		]
	},

	init : function (option) {
		$.extend(this.option,option)
		this.renderNav()
		console.log(option)
	},
	//渲染导航菜单
	renderNav : function () {
		for (var i = 0 ,iLength = this.option.navList.length; i<iLength; i++) {	
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true
			}
		}
		//渲染数据
		var navHtml = ws.renderHtml(templateIndex,{
			navList : this.option.navList
		})

		//渲染html
		$('.nav-side').html(navHtml)
	}
}

module.exports = navSide;