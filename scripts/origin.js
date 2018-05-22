const fs = require('fs');
const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');

const appDirectory = fs.realpathSync(process.cwd());

const resolve = (dir = '') => {
  return path.resolve(appDirectory, dir);
};

const resolveOwn = (dir = '') => {
  return path.resolve(__dirname, '..', dir);
};

module.exports = {
  mode: 'development',

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
        options: {},
      },

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },

      // CSS and PostCSS
      {
        test: /\.(css|postcss)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      // Sass
      {
        test: /\.(sass|scss)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
