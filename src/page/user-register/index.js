/*
* @Author: wittyfans
* @Date:   2017-08-15 11:39:39
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-17 14:34:42
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
    init: function() {
        this.BindEvent()
    },
    BindEvent: function() {
        var _this = this
        // 登录按钮的点击
        $('#submit').click(function() {
            _this.submit()
        })
        // 如果按下回车，也提交
        $('.user-content').keyup(function(e) {
            if (e.KeyCode === 13) {
                _this.submit()
            }
        })

        $('#username').blur(function () {

        	var username = $.trim($(this).val())
        	// 如果用户名为空，不做验证
        	if (!username) {
        		return
        	}
        	//验证用户是否存在
        	_user.checkUsername(username,function (res) {
        		formError.hide()
        	},
        	function (errMsg) {
        		
        		formError.show(errMsg)
        	})
        })
    },
    submit: function() {
        var formData = {

                username: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
                passwordConfirm: $.trim($('#passwordConfirm').val()),
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
                
            }
            // 验证成功
        var validateResult = this.formValidate(formData)
        if (validateResult.status) {
            // 提交
            _user.register(formData, function() {
                    window.location.href = './result.html?type=register'
                },
                function(errMsg) {
                	formError.show(errMsg)
                })

        } else {
            formError.show(validateResult.msg)
        }
    },
    // 表单的验证
    formValidate: function(formData) {
        var result = {
            status : false,
            msg : ''
        }
        // 验证用户吗是否为空
        if (!ws.validate(formData.username,'require')) {
        	result.msg = '用户名不能为空'
        	return result
        }
        // 验证密码是否为空
        if (!ws.validate(formData.password,'require')) {
        	result.msg = '密码不能为空'
        	return result
        }
        // 验证密码的长度
        if (formData.password.length < 6) {
        	result.msg = '密码长度不能少于6位'
        	return result
        }
        // 两次密码是否一致
        if (formData.password !== formData.passwordConfirm) {
        	console.log('is:'+formData.passwordConfirm)
        	result.msg = '两次输入的密码不一致'
        	return result
        }

        // 验证手机
        if (!ws.validate(formData.phone,'phone')) {
        	result.msg = '手机号码格式不正确'
        	return result
        }
        // 邮箱
        if (!ws.validate(formData.email,'email')) {
        	result.msg = '邮箱格式不正确'
        	return result
        }
        // 密码提示问题
        if (!ws.validate(formData.question,'require')) {
        	result.msg = '密码提示问题不能为空'
        	return result
        }
        // 密码提示问题答案
        if (!ws.validate(formData.answer,'require')) {
        	result.msg = '密码提示问题答案不能为空'
        	return result
        }
        // 通过验证，返回正确提示
        result.status = true
        return result

    }

}

$(function() {
    page.init()
})