/*eslint-env node */
var options = require('./webpack.base.js');
options.entry = './example';
options.output = {
  filename: './example/dist/build.js',
  publicPath: '/'
};
options.devServer = {
  port: 4000
}
module.exports = options;
