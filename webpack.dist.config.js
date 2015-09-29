/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack'),
    path = require("path");

module.exports = {

    output: {
        publicPath: '/assets/',
        path: 'dist/assets/',
        filename: 'main.js'
    },

    debug: false,
    devtool: false,
    entry: [
        './src/components/App.js'
    ],

    stats: {
        colors: true,
        reasons: false
    },

    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],

    resolve: {
        extensions: ['', '.js'],
        alias: {
            'styles': __dirname + '/src/styles',
            'mixins': __dirname + '/src/mixins',
            'modules': __dirname + '/src/modules',
            'components': __dirname + '/src/components/',
            'stores': __dirname + '/src/stores/',
            'actions': __dirname + '/src/actions/'
        }
    },

    module: {
        preLoaders: [{
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            loader: 'jsxhint'
        }],

        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    }
};
