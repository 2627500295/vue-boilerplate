const { VueLoaderPlugin } = require('vue-loader');

const { appDirectory, resolve, resolveOwn } = require('./paths');

module.exports = {
  resolve: {
    extensions: ['.js', '.mjs', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
