/*
* @Author: wittyfans
* @Date:   2017-08-17 14:40:28
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-19 16:51:47
*/


'use strict';
require('./index.css')
require('../common/nav-simple/index.js')
require('../common/layout.css')
var _user = require('service/user.js')
var ws = require('util/ws.js')

var formError = {
	// 表单里的错误提示
	show : function (errMsg) {
		$('.error-item').show().find('.error-msg').text(errMsg)
	},

	hide : function () {
		$('.error-item').hide().find('.error-msg').text('')
	}
}

var page = {

	data : {
		username : '',
		question : '',
		answer   : '',
		password : '',
		token    : ''
	},

    init: function() {
    	this.onload()
        this.BindEvent()

    },

    onload : function(){
    	this.loadStepUserName()
    },

    BindEvent: function() {
        var _this = this
        // 提交用户名后的点击事件、之后会显示密码提示问题
        $('#submit-username').click(function() {

            var username = $.trim($('#username').val())

            if (username) {
			_this.data.username = username,
            	_user.getQuestion(_this.data,function(res){	
            // 成功
            		_this.data.question = res,
            		_this.loadStepQuestion()

            	},function(errMsg){
            // 失败	
            		formError.show(errMsg)
            	})
            }else{
            	formError.show('请输入用户名')
            	
            }
        })
        // 提交密码提示问题后的点击事件，进入新密码设置界面
        $('#submit-question').click(function(){
        	var answer = $.trim($('#answer').val())
        	// 如果密码提示问题答案存在
        	
            if (answer) {
			_this.data.answer = answer
            	_user.getAnswer({
            		username : _this.data.username,
            		question : _this.data.question,
            		answer : answer
            	},function(res){	
            	// 成功
            		_this.data.answer = answer,
            		_this.data.token = res

            		_this.loadStepUserPWD()

            	},function(errMsg){
            	// 失败	
            		formError.show(errMsg)
            	})
            }else{
            	formError.show('请输入密码提示问题的答案')
            	
            }
        	
        })


        $('#submit-password').click(function(){
        	var password = $.trim($('#password').val())
        	// 如果密码提示问题答案存在
        	
            if (password && password.length>6) {
			_this.data.password = password
            	_user.resetPwd({
            		username 	: _this.data.username,
            		passwordNew : _this.data.password,
            		forgetToken : _this.data.token
            	},function(res){	
            	// 成功
            		window.location.href = './result.html?type=pass-reset'
            	},function(errMsg){
            	// 失败	
            		formError.show(errMsg)
            	})
            }else{
            	formError.show('请输入不少于6位的新密码')
            	
            }
        	
        })

        // 修改密码界面的点击事件，提交新密码，密码修改成功
        $('#submit-password').click(function(){
        	console.log('new pwd seted')
        })

        // 键盘事件
        // $('.user-content').keyup(function(e) {
        //     if (e.KeyCode === 13) {
        //         _this.submit()
        //     }
        // })

        
    },

    // submit: function() {
    //     var formData = {
    //             username: $.trim($('#username').val()),
    //             password: $.trim($('#password').val()),
    //         }
    //         // 验证成功
    //     var validateResult = this.formValidate(formData)
    //     if (validateResult.status) {
    //         // 提交
    //         _user.login(formData, function() {
    //                 window.location.href = ws.getUrlParam('redirect') || './index.html'
    //             },
    //             function(errMsg) {
    //             	formError.show(errMsg)
    //             })

    //     } else {
    //         formError.show(validateResult.errMsg)
    //     }
    // },
    // 表单的验证
    formValidate: function(formData) {
        var result = {
            status : false,
            msg : ''
        }

        if (!ws.validate(formData.username,'require')) {
        	result.msg = '用户名不能为空'
        	return result
        }

        if (!ws.validate(formData.password,'require')) {
        	result.msg = '密码不能为空'
        	return result
        }
        // 通过验证，返回正确提示
        result.status = true
        return result
    },
    // 加载找回密码的第一步
    loadStepUserName : function () {
    	$('.step-username').show()
    },
    // 加载找回密码的第二步
    loadStepQuestion : function () {
    	// 清除错误提示
    	formError.hide();
    	$('.step-username').hide().siblings('.step-question').show().find('.answer').text(this.data.question)
    	
    },
    // 加载找回密码的第三步
    loadStepUserPWD : function () {
    	$('.step-question').hide().siblings('.step-password').show()
    	console.log('hide2 in 3')
    }

}

$(function() {
    page.init()
})