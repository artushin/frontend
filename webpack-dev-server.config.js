var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
	devtool: 'cheap-module-eval-source-map',

	//Entry points to the project
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/src/app/app.jsx')
	],

	//Config options on how to interpret requires imports
	resolve: {
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

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},

	plugins: [
		new webpack.ProvidePlugin({
			_: "lodash"
		}),
		//Enables Hot Modules Replacement
		new webpack.HotModuleReplacementPlugin(),
		//Allows error warnings but does not stop compiling. Will remove when eslint is added
		new webpack.NoErrorsPlugin(),
		//Moves files
		new TransferWebpackPlugin([
			{from: 'www'}
		], path.resolve(__dirname, "src"))
	],

	module: {
		//Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
		preLoaders: [
			{
				//Eslint loader
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				include: [path.resolve(__dirname, "src/app")],
				exclude: [nodeModulesPath]
			},
		],

		loaders: [
			{
				test: /\.(js|jsx)$/,  //All .js and .jsx files
				loaders: ['babel-loader'],
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
			}
		]
	},

	//eslint config options. Part of the eslint-loader package
	eslint: {
		configFile: '.eslintrc'
	},
};

module.exports = config;
