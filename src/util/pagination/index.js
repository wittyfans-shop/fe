/*
* @Author: wittyfans
* @Date:   2017-08-27 17:48:23
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-29 00:02:49
*/
require('./index.css')
var templatePagination = require('./index.string')
var ws 		= require('util/ws.js')

var Pagination = function () {
	var _this = this
	this.defaultOption = {
		container : null,
		pageNum : 2,
		pageRange : 3,
		onSelected : null
	}
	$(document).on('click','.pg-item',function(){
		var $this = $(this)
		// 对于active和disable的事件，不做处理
		if ($this.hasClass('active') || $this.hasClass('disabled')) {

			return 
		} 
		typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null
	})
}

// 通过类来初始化所需要的函数的建立方式
Pagination.prototype.render = function(userOption){
	this.option = $.extend({},this.defaultOption,userOption)

	// 判断容器是否是合法的
	if (!(this.option.container instanceof jQuery)) {	
		return
	} 
	// 判断下一页数
	if (this.option.pages <= 1) {
		return
	} 
	this.option.container.html(this.getContainerHtml())
}
// 获取分页的信息
Pagination.prototype.getContainerHtml = function () {
	var html = ''
	var option = this.option
	var pageArray = []
	var start = option.pageNum - option.pageRange > 0 ? option.pageNum-option.pageRange : 1
	var end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages
	// 上一页的处理
	pageArray.push({
		name : '上一页',
		disabled : !this.option.hasPreviousPage,

	})
	// 数字按钮的处理
	for(var i = start ; i <= end ; i++ ){
		pageArray.push({
			name : i,
			value : i,
			active : (i === option.pageNum)
		})
	}

	// 下一页
	pageArray.push({
		name : '下一页',
		disabled : !this.option.hasNextPage,
	})

	html = ws.renderHtml(templatePagination,{
		pageArray : pageArray,
		pageNum   : option.pageNum,
		pages     : option.pages
	})

	return html

}

module.exports = Pagination

