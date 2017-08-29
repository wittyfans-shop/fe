/*
* @Author: wittyfans
* @Date:   2017-08-02 14:16:29
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-26 22:00:34
*/


'use strict';
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
require('util/slider/index.js')
var navSide 		= require('../common/nav-side/index.js')
var ws 				= require('util/ws.js')
var templateBanner 	= require('./banner.string')

navSide.init({
	name : 'user-center'
})

$(function() {
	// 渲染banner的html
	var bannerHtml = ws.renderHtml(templateBanner)
	$('.banner-con').html(bannerHtml)
    var $slider = $('.banner').unslider({
    	dots:true,
    })
    $('.banner-con .banner .banner-arrow').click(function () {
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next'
    	$slider.data('unslider')[forward]();//[forward的意思是]将forward作为参数传进去
    })
})