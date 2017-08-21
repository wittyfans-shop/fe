/*
* @Author: wittyfans
* @Date:   2017-08-21 00:21:53
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-21 09:32:57
*/

'use strict';


'use strict';
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var navSide = require('../common/nav-side/index.js')
var ws = require('util/ws.js')
var _user = require('service/user.js')



var page = {

    init: function() {
    	this.onload()    
    },
    onload : function(){
        this.bindEvent()
    	this.loadUerInfo()
    	// 初始化左侧菜单
    	navSide.init({
			name : 'pass-update'
		})
    },
    bindEvent : function () {
        var _this = this
        // 设置监听事件，用户点击修改个人信息之后，收集用户更改后的信息到userInfo
      $(document).on('click','.btn-submit',function () {

          var userInfo = {
            password : $.trim($('#password').val()),
            passwordNew : $.trim($('#password-new').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
          }
        // 
          var validateResult = _this.validateForm(userInfo)
        
          if (validateResult.status) {
            _user.updatePWD({
            	passwordOld : userInfo.password,
            	passwordNew : userInfo.passwordNew
            },function (res,msg) {
                // 修改成功后的操作
                ws.successTips(msg)
            },function (errMsg) {
                // 修改失败后的操作
            	ws.errorTips(errMsg)    
            })

          }else{
            ws.errorTips(validateResult.msg)
          }
      })  
    },
    // 加载用户信息
    loadUerInfo: function() {
        var userHtml = ''
        _user.getUserInfo(function (res) {
        },function (errMsg) {

        })
	},
    validateForm : function(formData){
        

        var result = {
            status : false,
            msg : ''
        }
        // 验证原密码
        if (!ws.validate(formData.password,'require')) {
        	result.msg = '原密码不能为空'
        	return result
        }
        // 验证新密码
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
        	
        	result.msg = '密码长度不得少于6位'
        	return result
        }
        // 验证两次新密码密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {

        	result.msg = '两次密码输入不一致'
        	return result
        }
        
        // 通过验证，返回正确提示
        result.status = true
        result.msg = "验证通过"
        return result
    }
}

$(function() {
    page.init()
})



