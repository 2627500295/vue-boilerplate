const fs = require('fs');
const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',

  module: {
    rules: [
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
};
