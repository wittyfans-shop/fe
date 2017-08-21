/*
 * @Author: wittyfans
 * @Date:   2017-08-02 14:26:01
 * @Last Modified by:   wittyfans
 * @Last Modified time: 2017-08-21 00:22:44
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//设置环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || ''


//获取html-webpack-login参数的方法
var getHtmlConfig = function(name, title) {

    return {

        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}

var config = {
    //指定入口
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'result': ['./src/page/result/index.js'],
        'pass-reset': ['./src/page/pass-reset/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'pass-update' : ['./src/page/pass-update/index.js'],
    },

    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },

    externals: {
        'jquery': "window.jQuery"
    },
    //对css、图片、字体单独打包
    module: {
        loaders: [

            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|jpg|png|svg|woff|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader' },
        ]
    },
    //给路径取别名，简化访问的路径输入
    resolve: {
        alias: {

            page: __dirname + '/src/page',
            util: __dirname + '/src/util',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules'
        }
    },

    plugins: [
        //独立通用模块打包到js/base.js模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //CSS单独打包
        new ExtractTextPlugin("css/[name].css"),
        //HTML模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('pass-update', '修改密码')),

    ]

};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config