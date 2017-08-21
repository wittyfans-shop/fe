/*
* @Author: wittyfans
* @Date:   2017-08-10 11:17:22
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-21 09:47:37
*/

'use strict';
require('./index.css')
var ws = require('util/ws.js')
var User = require('service/user.js')
var Cart = require('service/cart.js')

var nav = {
	init : function () {
		this.bindEvent()
		this.loadUserInfo()
		this.loadCartCount()
		return this
	},

	bindEvent : function () {
		//登陆点击事件
		$('.js-login').click(function () {
			ws.doLogin()
		})
		//注册事件
		$('.js-register').click(function () {
			window.location.href = './user-register.html'
		})
		//退出点击事件
		$('.js-logout').click(function () {
			User.logout(
			function(res){
				window.location.reload()
			},
			function(errMsg){
				ws.errorTips(errMsg)
			})
		})
	},

	loadUserInfo : function () {
		User.checkLogin(
			function(res){
			$('.user.not-login').hide().siblings('.user.login').show()
				.find('.username').text(res.username)
		},function(errMsg){
			//do nothing
		}
		)
	},

	loadCartCount : function () {
		Cart.checkCartCount(
			function(res){
			$('.nav .cart-count').text(res||0)
		},function(errMsg){
			$('.nav .cart-count').text(0)
		}
		)
	}
}

module.exports = nav.init()