const { appDirectory, resolve, resolveOwn } = require('./paths');
const webpack = require('webpack');
const { NamedModulesPlugin, HotModuleReplacementPlugin, DllReferencePlugin, DllPlugin } = webpack;
const merge = require('webpack-merge');
const baseConfig = require('./base');

// HTML
const HtmlPlugin = require('html-webpack-plugin');

const devConfig = merge(baseConfig, {
  mode: 'development',
  
  plugins: [
    new HtmlPlugin({
      title: 'React App',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      cache: true,
    }),

    new NamedModulesPlugin(),

    // 热替换
    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    // 打开浏览器
    open: true,
    
    // 不跳转
    historyApiFallback: true,

    // 热更新
    hot: true,

    // 自动刷新
    inline: true,

    // 统计
    stats: {
      colors: true,
    },

    // 信息显示
    noInfo: false,
    
    // 端口
    port: process.env.PORT || 8000,

    // 主机
    host: '0.0.0.0',
  },

  module: {
    rules: [
    
      // PostCSS and CSS
      {
        test: /\.(css|postcss)$/,
        use: [
          {loader: 'vue-style-loader', options: {sourceMap: true,},},
          {loader: 'css-loader', options: {sourceMap: true,},},
          {loader: 'postcss-loader', options: {sourceMap: true,},},
        ]
      },
    
      // Sass
      {
        test: /\.(sass|scss)$/,
        use: [
          {loader: 'vue-style-loader', options: {sourceMap: true,},},
          {loader: 'css-loader', options: {sourceMap: true,},},
          {loader: 'postcss-loader', options: {sourceMap: true,},},
          {loader: 'sass-loader', options: {sourceMap: true,},},
        ],
      },

      // Less
      {
        test: /\.(less)$/,
        use: [
          {loader: 'vue-style-loader', options: {sourceMap: true,},},
          {loader: 'css-loader', options: {sourceMap: true,},},
          {loader: 'postcss-loader', options: {sourceMap: true,},},
          {loader: 'less-loader', options: {sourceMap: true,},},
        ],
      },

      // Stylus
      {
        test: /\.(stylus|styl)$/,
        use: [
          {loader: 'vue-style-loader', options: {sourceMap: true,},},
          {loader: 'css-loader', options: {sourceMap: true,},},
          {loader: 'postcss-loader', options: {sourceMap: true,},},
          {loader: 'stylus-loader', options: {sourceMap: true,},},
        ],
      },
    ],
  },
});

module.exports = devConfig;
