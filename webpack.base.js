/*eslint-env node */
module.exports = {
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel' }
    ]
  },
  vue: {
    autoprefixer: {
        browsers: ['last 2 versions', '> 5%', 'Firefox > 20', 'ie > 9']
    },
    loaders: {
      js: 'babel!eslint'
    }
  }
};
