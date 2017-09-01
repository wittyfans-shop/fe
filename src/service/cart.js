/*
* @Author: wittyfans
* @Date:   2017-08-10 14:45:40
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-09-01 16:20:42
*/


'use strict';

var ws = require('util/ws.js')

var cart = {
	checkCartCount : function (resolve,reject) {
		ws.request({
			url : ws.getServerUrl('./cart/get_cart_product_count.do'),
			method : 'POST',
			success : resolve,
			error : reject,
		})
	},
	// 添加到购物车
	addToCart : function (productInfo,resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/add.do'),
			data : productInfo,
			success : resolve,
			error : reject,
		})
	},
	getCartList : function (resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/list.do'),
			success : resolve,
			error : reject,
		})
	},

	selectProduct : function (productId,resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/select.do'),
			data : {
				productId : productId
			},
			success : resolve,
			error : reject,
		})
	},

	unselectProduct : function (productId,resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/un_select.do'),
			data : {
				productId : productId
			},
			success : resolve,
			error : reject,
		})
	},

	unselectAllProduct : function (resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/un_select_all.do'),
			success : resolve,
			error : reject,
		})
	},

	selectAllProduct : function (resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/select_all.do'),
			success : resolve,
			error : reject,
		})
	},

	// 更改购物车产品数量
	updateProduct : function (productInfo,resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/update.do'),
			data : productInfo,
			success : resolve,
			error : reject,
		})
	},
	// 删除单个商品
	deleteProduct : function (productIds,resolve,reject) {
		ws.request({
			url : ws.getServerUrl('/cart/delete_product.do'),
			data : {
				productIds : productIds
			},
			success : resolve,
			error : reject,
		})
	},

}

module.exports = cart
/*
# Todo List

- User:
	Handle login and logout
	Check login and logout

- Cart
	Change of NO of Cart
	Load the Cart NO


# How
- 

# What I need
- A Object to store two function
- one for check cart NO
- two for load data

# what this file need
- URL for get data 

# what this file  need to do
- To load data
	- if Success,then How?
	- if Error , then How?
- To update cart NO
	- from api 
	- handle in success function 

# what this file do not need to do
- Define a rules to handle data

# what data do I already have 

- Date are from request,So I need ws tools for request
- request need a Object which need prepare URL,Type
- URL is a API

# How to handle the Date I get from api
- Depends on the function your send in 

*/ 
