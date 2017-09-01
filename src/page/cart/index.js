/*
 * @Author: wittyfans
 * @Date:   2017-08-29 15:36:28
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-09-01 16:32:08
 */


require('./index.css')
require('../common/header/index.js')
var nav = require('../common/nav/index.js')
var ws = require('util/ws.js')
var cart = require('service/cart.js')
var templateIndex = require('./index.string')
var product = require('service/product.js')


var page = {
        data: {
            cartInfo: {}
        },

        init: function() {
            this.onload()
            this.bindEvent()
        },

        onload: function() {
            this.loadCart()
        },
        // 绑定事件
        bindEvent: function() {
            var _this = this

            // 商品的选择和取消选择
            $(document).on('click', '.cart-select', function() {

                    var $this = $(this)
                    var productId = $this.parents('.cart-table').data('product-id')

                    //选中
                    if ($this.is(':checked')) {
                        cart.selectProduct(productId, function(res) {
                            _this.renderCartList(res)
                        }, function(errMsg) {
                            _this.showCartError()
                        })
                    } else {
                        //取消选中
                        cart.unselectProduct(productId, function(res) {
                            _this.renderCartList(res)
                        }, function(errMsg) {
                            _this.showCartError()
                        })

                    }
                })

            $(document).on('click', '.cart-select-all', function() {

                        var $this = $(this)

                        //选中全部
                        if ($this.is(':checked')) {
                            cart.selectAllProduct(function(res) {
                                _this.renderCartList(res)
                            }, function(errMsg) {
                                _this.showCartError()
                            })

                        } else {
                            //取消选中全部
                            cart.unselectAllProduct(function(res) {
                                _this.renderCartList(res)

                            }, function(errMsg) {

                                _this.showCartError()
                            })
                        }
                })
            // 商品数量的绑定
            $(document).on('click', '.btn-num', function(){
                var $this = $(this),
                    productId = $this.parents('.cart-table').data('product-id'),
                    $pCount = $this.siblings('.count-input'),
                    minCount = 1,
                    maxCount = parseInt($pCount.data('max')),
                    type = $this.hasClass('plus') ? 'plus' : 'minus',
                    currentCount = parseInt($pCount.val()), //得到的是字符串,需要用parseInt处理
                    newCount = 0; 
                    
                    if (type === 'plus') {
                        if (currentCount >= maxCount) {
                            ws.errorTips("超过库存数量")
                            return
                        } 
                        newCount = currentCount + 1

                    }else if(type === 'minus'){
                        if ($pCount.val() <= minCount) {
                            
                            return
                        } 
                        newCount = currentCount - 1
                    }
                // 更新购物车产品数量
                cart.updateProduct({
                    productId : productId,
                    count     : newCount
                },function (res) {
                    _this.renderCartList(res)
                },function (errMsg) {
                    _this.showCartError(errMsg)
                })
            })

            // 删除单个商品
            $(document).on('click', '.cart-delete', function(){
                if (window.confirm('确认要删除该商品吗？')) {
                
                var $this = $(this),
                    productId = $this.parents('.cart-table').data('product-id');
                    _this.deleteCartProduct(productId)
                }
            })

            // 删除选中商品
            $(document).on('click', '.delete-selected', function(){
                if (window.confirm('确认要删除选中的商品吗？')) {
                var arrProductIds = [],
                    $seletedItem = $('.cart-select:checked');

                    for (var i = 0,iLength = $seletedItem.length; i < iLength; i++) {
                        arrProductIds.push($($seletedItem[i]).parents('.cart-table').data('product-id'))
                    }
                    
                    if (arrProductIds.length) {
                       _this.deleteCartProduct(arrProductIds.join(',')) 
                    }else{
                        ws.errorTips("您还没有选中要删除的商品！")
                    }
                }
            })

            // 购物车的提交
            $(document).on('click', '.btn-submit', function(){
                if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                    window.location.href = "./confirm.html"
                }else{
                    ws.errorTips("您还没有选中商品！")
                }
            })
        },

        // 加载购物车信息
        loadCart: function() {
            var cartHtml = ''
            var $cart = $('.page-wrape')
            $cart.html('<div class = "loading"></div>')
            var _this = this
            cart.getCartList(function(res) {

                _this.renderCartList(res)

            }, function(errMsg) {

            })
        },

        // 删除指定商品
        deleteCartProduct : function (productId) {
            var _this = this
            cart.deleteProduct(productId,function (res) {
                _this.renderCartList(res)
            },function (errMsg) {
                ws.errorTips(errMsg)
            })    
        },
        // 渲染页面
        renderCartList: function(data) {
            this.filter(data)
            this.data.cartInfo = data
            // 生成html
            var cartHtml = ws.renderHtml(templateIndex, data)
            $('.page-wrape').html(cartHtml)
            nav.loadCartCount()

        },
        // 数据匹配
        filter: function(data) {
            data.notEmpty = !!data.cartProductVoList.length
        },

        // 显示错误信息
        showCartError: function() {
            $('.page-wrape').html('<p class = "err-msg">哪里不对了，刷新一下试试</p>')
        }

    }

    $(function() {
        page.init()
    })