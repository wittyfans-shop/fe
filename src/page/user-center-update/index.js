/*
* @Author: wittyfans
* @Date:   2017-08-19 17:09:36
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-21 00:18:53
*/

'use strict';
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var navSide = require('../common/nav-side/index.js')
var templateIndex = require('./index.string')
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
			name : 'user-center'
		})
    },
    bindEvent : function () {
        var _this = this
        // 设置监听事件，用户点击修改个人信息之后，收集用户更改后的信息到userInfo
      $(document).on('click','.btn-submit',function () {
          var userInfo = {
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val()),
          }
        // 验证用户提交的信息，是否符合validateResult的要求，如果成功调用function(res)，并跳转到user-center.html
        // 失败就调用function(errMsg)
          var validateResult = _this.validateForm(userInfo)
        // 如果validateResult.status通过，那么就使用user中的更新用户信息的方法updateUserInfo
          if (validateResult.status) {
            console.log(userInfo)
            _user.updateUserInfo(userInfo,function (res,msg) {
                // 修改成功后的操作
                ws.successTips(msg)
                window.location.href = './user-center.html'
            },function (errMsg) {
                // 修改失败后的操作
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
            userHtml = ws.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml)
        },function (errMsg) {
            ws.errorTips(errMsg)
        })
	},
    validateForm : function(formData){
        
        var result = {
            status : false,
            msg : ''
        }

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



