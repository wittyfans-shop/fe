/*
* @Author: wittyfans
* @Date:   2017-08-26 22:09:38
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-31 17:15:53
*/

// list 页面
'use strict';
require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var ws 		= require('util/ws.js')
var product = require('service/product.js')
var Pagination = require('util/pagination/index.js')
var templateIndex = require('./index.string')

var page = {
    data : {
        listParam : {
            keyword : ws.getUrlParam('keyword') || '',
            categoryId : ws.getUrlParam('categoryId') || '',
            oderBy: ws.getUrlParam('oderBy') || 'default',
            pageNum: ws.getUrlParam('pageNum') || 1,
            pageSize: ws.getUrlParam('pageSize') || 2,
        }
    },

    init: function() {
    	this.onload()  
        
    },

    onload : function(){
        this.bindEvent()
    	this.loadList()
    },

    bindEvent : function () {
        var _this = this
        
        $('.sort-item').click(function(){
            var $this = $(this)
            _this.data.listParam.pageNum = 1

            // 点击默认排序
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return
                }
                else{              
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
                    _this.data.listParam.oderBy = 'default'
                }

            }else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')

                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.oderBy = "price_asc"

                } else {
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.oderBy = "price_desc"
                }
            }
        _this.loadList()   
        })
          
    },
    // 加载列表
    loadList : function () {
        var listParam = this.data.listParam
        var listHtml = ''
        var _this = this
        var $plistCon = $('.p-list-con')
        $plistCon.html('<div class="loading"></div>')

        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
        
    // 请求数据
        product.getProductList(listParam,function(res){
            
            listHtml = ws.renderHtml(templateIndex,{
                list : res.list
            })
            // 渲染html
            $('.p-list-con').html(listHtml)

            // 渲染分页列表
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
            })
        },function(errMsg){
            ws.errorTips(errMsg)
        })
    },
    // 加载分页列表
    loadPagination : function(pageInfo){
       var _this = this
        this.Pagination ? '' : (this.pagination= new Pagination())

        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            // 回调函数，在上一页和下一页中回调
            onSelectPage : function (pageNum) {
               _this.data.listParam.pageNum = pageNum
               _this.loadList()  
            }
        }))
    }
}   
$(function() {
    page.init()
})



