/*
 * @Author: wittyfans
 * @Date:   2017-08-10 12:09:57
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-08-10 15:54:51
 */

'use strict';
var ws = require('util/ws.js')

var user = {
	//用户退出登录，需要处理的事情，从外面传函数进来，函数被保存在request方法的属性中，
    
    logout : function(resolve, reject) {
        ws.request({
            url: ws.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查登陆状态
    
    checkLogin : function(resolve, reject) {
        ws.request({
            url: ws.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
    })
    }
}

module.exports = user