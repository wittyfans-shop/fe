/*
* @Author: wittyfans
* @Date:   2017-08-10 14:45:40
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-29 14:37:04
*/


'use strict';

var ws = require('util/ws.js')

var cart = {
	checkCartCount : function (resolve,reject) {
		ws.request({
			url : ws.getServerUrl('./cart.do'),
			method : 'POST'
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
	}
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
