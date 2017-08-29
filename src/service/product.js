/*
* @Author: wittyfans
* @Date:   2017-08-26 22:22:27
* @Last Modified by:   wittyfans
* @Last Modified time: 2017-08-29 10:55:28
*/

'use strict';
var ws = require('util/ws.js')

var product = {
    // 获取商品列表
    getProductList : function(listParam,resolve, reject) {
        ws.request({
            url: ws.getServerUrl('/product/list.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
    })
    },
    // 获取商品详细信息
    getProductDetail : function (productId,resolve,reject) {
        ws.request({
            url: ws.getServerUrl('/product/detail.do'),
            data: {
                productId : productId
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

module.exports = product