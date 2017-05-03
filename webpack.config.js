const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// require('file-loader');

module.exports = [
	// Server Pack Config
	// {
	// 	entry: path.join(__dirname, 'src', 'public', 'js', 'nav-toggle.js'),
	// 	output: {
	// 		filename: 'bundle.js',
	// 		path: path.join(__dirname, 'src', 'public', 'js'),
	// 	},
	// },
	// Client Pack Config
	{
		context: path.join(__dirname, 'your-app'),
		entry: path.join(__dirname, 'src', 'client', 'js', 'nav-toggle.js'),
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, 'dist', 'client'),
		},
		plugins: [
			new CopyWebpackPlugin([
				{ from: path.join(__dirname, 'src', 'client', 'images') },
			]),
		],
	},
];
