/*
* @Author: wittyfans
* @Date:   2017-08-13 22:34:23
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-17 11:07:52
*/

'use strict';
require('./index.css')
require('../common/nav-simple/index.js')
require('../common/layout.css')
var ws = require('util/ws.js')

$(function (){
	var type = ws.getUrlParam('type') || 'default'
	var	$element = $('.'+type+'-success')
	$element.show()
	console.log('result')
})