/*
 * @Author: wittyfans
 * @Date:   2017-08-02 14:26:01
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-08-04 20:31:20
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//设置环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || ''


//获取html-webpack-login参数的方法
var getHtmlConfig = function(name) {

    return {

        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },

    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },

    externals: {
        'jquery': "window.jQuery"
    },

    module: {
        loaders: [

        {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        {test: /\.(gif|jpg|png|svg|woff|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},

        ] 
    },

    plugins: [
        //独立通用模块大包到js/base.js模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //CSS单独打包
        new ExtractTextPlugin("css/[name].css"),
        //HTML模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index')), 
        new HtmlWebpackPlugin(getHtmlConfig('login')), 

            ]

};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config