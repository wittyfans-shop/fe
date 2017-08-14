/*
* @Author: wittyfans
* @Date:   2017-08-02 14:16:29
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-13 22:19:52
*/


'use strict';
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var navSide = require('../common/nav-side/index.js')
var ws = require('util/ws.js')

navSide.init({
	name : 'user-center'
})



