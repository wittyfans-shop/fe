/*
 * @Author: wittyfans
 * @Date:   2017-08-10 20:03:22
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-08-26 22:26:08
 */

'use strict';

require('./index.css')
var ws = require('util/ws.js')
var User = require('service/user.js')
var Cart = require('service/cart.js')

//搜索的提交

//通用页面头部
var header = {
    init: function() {
        this.bindEvent()
        this.onLoad()
    },
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val())
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword
        } else {
            ws.goHome()
        }
    },
    onLoad: function() {
        var keyword = ws.getUrlParam('keyword')
        if (keyword) {
            //选择input里面的值并赋值
            $('#search-input').val(keyword)
        }
    },

    bindEvent: function() {
        var _this = this
        $('#search-btn').click(function() {
                _this.searchSubmit()
            }),
            /*enter to search
            - Not form ,Can't bind enter event
            - How?
            */
            $('#search-input').keyup(function(e) {
                if (e.keyCode === 13) {
                    _this.searchSubmit()
                }
            })
    }
}

header.init()