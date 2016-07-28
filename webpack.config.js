/*eslint-env node */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var options = require('./webpack.base.js');
options.entry = './src';
options.output = {
    path: './dist',
    filename: 'vue-msgbox.js',
    libraryTarget: 'commonjs'
};
options.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
};
options.devtool = '#source-map'
module.exports = options;
