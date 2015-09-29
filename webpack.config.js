/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack'),
    path = require("path");

module.exports = {

    output: {
        filename: 'main.js',
        publicPath: '/assets/'
    },

    cache: true,
    debug: true,
    devtool: false,
    entry: [
        'webpack/hot/only-dev-server',
        './src/components/App.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },

    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
                loader: 'react-hot!babel-loader'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }

};
