/*
 * @Author: wittyfans
 * @Date:   2017-08-02 14:36:30
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-08-17 14:25:14
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
    },
    submit: function() {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
            }
            // 验证成功
        var validateResult = this.formValidate(formData)
        if (validateResult.status) {
            // 提交
            _user.login(formData, function() {
                    window.location.href = ws.getUrlParam('redirect') || './index.html'
                },
                function(errMsg) {
                	formError.show(errMsg)
                })

        } else {
            formError.show(validateResult.errMsg)
        }
    },
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
    }

}

$(function() {
    page.init()
})