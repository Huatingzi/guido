/**
 * 默认webpack配置
 */
"use strict";

const path = require('path');

module.exports = function (options = {}) {
    const cwd = options.cwd ? options.cwd : process.cwd();

    return {
        watchOptions: {
            ignored: new RegExp(`(?:node_modules|${options.tmpCacheDir})`)
        },

        context: cwd,

        profile: true,

        output: {
            libraryTarget: 'var',

            publicPath: '',

            path: 'dist',

            templateDir: 'html',
            jsDir: 'js',
            cssDir: 'css',
            imageDir: 'images',
            fontDir: 'fonts'
        },

        module: {
            rules: []
        },

        externals: [{
            'react': {
                root: 'window.React',
                var: 'window.React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
                umd: 'react'
            },

            'react-dom': {
                root: 'window.ReactDOM',
                var: 'window.ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
                umd: 'react-dom'
            },

            'jquery': {
                root: 'window.jQuery',
                var: 'window.jQuery',
                commonjs2: 'jquery',
                commonjs: 'jquery',
                amd: 'jquery',
                umd: 'jquery'
            }
        }],

        resolve: {
            // tree-shaking优化, http://imweb.io/topic/5868e1abb3ce6d8e3f9f99bb
            // https://github.com/webpack/webpack-dev-server/issues/727
            mainFields: ['jsnext:main', 'browser', 'module', 'main'],
            modules: [
                path.join(__dirname, '..', 'node_modules'),
                path.join(cwd, 'node_modules')
            ],
            // 配置别名，在项目中可缩减引用路径
            alias: {
                // handlebars-loader默认所使用的runtime，每次都会重新构建
                // 此方法不用重新构建，加快整体构建速度
                'handlebars/runtime': require.resolve('handlebars/dist/handlebars.runtime')
            },
            extensions: ['.js', '.jsx', '.json']
        },
        resolveLoader: {
            modules: [
                path.join(__dirname, '..', 'node_modules'),
                path.join(cwd, 'node_modules')
            ]
        },
        plugins: [],

        stats: {
            colors: true, // `webpack --colors` 等同于
            hash: true, // 增加编译的哈希值
            version: false, // webpack版本信息
            timings: true, // 增加时间信息
            assets: true, // 增加资源信息
            chunks: true, // 增加包信息（设置为 `false` 能允许较少的冗长输出）
            modules: true, // 增加内置的模块信息
            errorDetails: true, // 增加错误的详细信息（就像解析日志一样）
            warnings: true, // 增加提示
            publicPath: true // 增加 publicPath 的信息
        }
    }
};
