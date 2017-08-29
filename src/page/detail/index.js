/*
* @Author: wittyfans
* @Date:   2017-08-29 00:06:48
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-29 14:27:16
*/
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var ws 		= require('util/ws.js')
var cart = require('service/cart.js')
var templateIndex = require('./index.string')
var product = require('service/product.js')


var page = {
    data : {
        productId : ws.getUrlParam('productId') || '',
    },

    init: function() {
    	this.onload()  
        this.bindEvent()
    },

    onload : function(){
    	if (!this.data.productId) {
    		// 如果没有productId，跳回首页
    		ws.goHome()
    	}
    	this.loadDetail()
    },
    // 绑定事件
    bindEvent : function () {
        var _this = this
		// 预览事件
		$(document).on('mouseenter','.p-img-item',function (){
			var imgUrl = $(this).find('.p-img').attr('src')
			$('.main-img').attr('src',imgUrl)
		})

		// count的操作
		$(document).on('click','.p-count-btn',function () {
			var type 			= $(this).hasClass('plus') ? type = 'plus' : 'minus'
			var	$pCount 		= $('.p-count')
			var	currentCount 	= parseInt($pCount.val())
			minCount 			= 1
			maxCount 			= _this.data.detailInfo.stock || 1
			if (type === 'plus') {
				console.log('plus')
				$pCount.val(currentCount < maxCount ? currentCount+1 : maxCount)
			}else if (type === 'minus') {
				$pCount.val(currentCount > minCount ? currentCount-1 : minCount)
			}
		})

		// 加入购物车
		$(document).on('click','.cart-add',function () {
			cart.addToCart({
				productId : _this.data.productId,
			 	count     : $('.p-count').val()
			}, function (res) {
				window.location.href = './result.html?type=cart-add'
		}, function (errMsg) {
				ws.errorTips(errMsg)
		})
    })
},
    // 加载详细信息
    loadDetail : function () {
    	var html = ''
    	var _this = this
    	var $pageWrape = $('.page-wrape')
    	$pageWrape.html('<div class = loading></div>')
    	// 1.id，成功，失败回调
    	product.getProductDetail(this.data.productId,function (res) {
    		_this.data.detailInfo = res
    		_this.filter(res)
    		html = ws.renderHtml(templateIndex,res)
    		$('.page-wrape').html(html)
    	},function (errMsg) {
    		$('.page-wrape').html('<p class = "err-tips">找不到你要的商品</p>')
    	})
    },
    // 数据处理
    filter : function (data) {
    	data.subImages = data.subImages.split(',')
    }
}   

$(function() {
    page.init()
})



