const path = require('path');

module.exports = {
	entry: './index.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'aframe-stl-exporter-component.js'
	}
};