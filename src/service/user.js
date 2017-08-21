/*
 * @Author: wittyfans
 * @Date:   2017-08-10 12:09:57
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-08-21 09:27:11
 */

'use strict';
var ws = require('util/ws.js')

var user = {
    // 用户登录
    login : function(userInfo,resolve, reject) {
        ws.request({
            url: ws.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })
    },
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
    },
    // 检查用户名
    checkUsername : function (username,resolve,reject) {
        ws.request({
            url: ws.getServerUrl('/user/check_valid.do'),
            data: {
                type : 'username',
                str : username
            },
            method: 'POST',
            success: resolve,
            error: reject
    })
    },
    // 用户注册
    register : function (userInfo,resolve,reject) {
         ws.request({

            url: ws.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })   
    },
    // 获取用户密码提示问题
    getQuestion : function (userInfo,resolve,reject) {
        ws.request({

            url: ws.getServerUrl('/user/forget_get_question.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })   
    },
    // 检查密码提示问题答案
    getAnswer : function (userInfo,resolve,reject) {
        ws.request({

            url: ws.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })   
    },
    // 重置密码
    resetPwd : function (userInfo,resolve,reject) {
        ws.request({

            url: ws.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })   
    },
    // 获取个人信息
    getUserInfo : function (resolve,reject) {
        ws.request({

            url: ws.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
    }) 
    },
    // 更新个人信息
    updateUserInfo : function (userInfo,resolve,reject) {
       ws.request({

            url: ws.getServerUrl('/user/update_information.do'),
            data : userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })  
    },
    // 登录状态下修改密码
    updatePWD : function (userInfo,resolve,reject) {
        ws.request({

            url: ws.getServerUrl('/user/reset_password.do'),
            data : userInfo,
            method: 'POST',
            success: resolve,
            error: reject
    })
    }
}

module.exports = user