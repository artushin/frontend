var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
	devtool: 'source-map',

	entry: [path.join(__dirname, '/src/app/app.jsx')],

	resolve: {
		//When require, do not have to add these extensions to file's name
		extensions: ["", ".js", ".jsx"],
		alias: {
			'styles': __dirname + '/src/app/styles',
			'modules': __dirname + '/src/app/modules',
			'components': __dirname + '/src/app/components/',
			'stores': __dirname + '/src/app/stores/',
			'actions': __dirname + '/src/app/actions/'
		}
		//node_modules: ["web_modules", "node_modules"]  (Default Settings)
	},

	//output config
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},

	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		//Minify the bundle
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				//supresses warnings, usually from module minification
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		//Allows error warnings but does not stop compiling. Will remove when eslint is added
		new webpack.NoErrorsPlugin(),
		//Transfer Files
		new TransferWebpackPlugin([
			{from: 'www'}
		], path.resolve(__dirname, "src"))
	],

	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				include: [path.resolve(__dirname, "src/app")],
				exclude: [nodeModulesPath]
			},
		],

		loaders: [
			{
				test: /\.(js|jsx)$/, //All .js and .jsx files
				loader: 'babel-loader',
				exclude: [nodeModulesPath]
			}, {
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			},
		]
	},

	//Eslint config
	eslint: {
		configFile: '.eslintrc' //Rules for eslint
	},
};

module.exports = config;
