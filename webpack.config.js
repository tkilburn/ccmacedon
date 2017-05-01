const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src', 'public', 'js', 'nav-toggle.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'src', 'public', 'js'),
	},
};
