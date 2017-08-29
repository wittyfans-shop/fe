/*
* @Author: wittyfans
* @Date:   2017-08-19 17:03:02
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-20 18:11:10
*/

'use strict';
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var navSide = require('../common/nav-side/index.js')
var templateIndex = require('./index.string')
var ws = require('util/ws.js')
var _user = require('service/user.js')



var page = {

    init: function() {
    	this.onload()    
    },
    onload : function(){
    	this.loadUerInfo()
    	// 初始化左侧菜单
    	navSide.init({
			name : 'user-center'
		})
    },
    // 加载用户信息
    loadUerInfo: function() {
        var userHtml = ''
        _user.getUserInfo(function (res) {
            userHtml = ws.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml)
        },function (errMsg) {
            ws.errorTips(errMsg)
        })
	}
}

$(function() {
    page.init()
})



