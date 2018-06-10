const { appDirectory, resolve, resolveOwn } = require('./paths');
const merge = require('webpack-merge');
const baseConfig = require('./base');

// 应用
const { VueLoaderPlugin } = require('vue-loader');

// 优化
const UglifyJS = require('uglifyjs-webpack-plugin');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');

// 配置
module.exports = {
  // 入口
  entry: {
    app: [resolve('src/index.js')],
  },

  // 出口
  output: {
    path: resolve('dist'),
    filename: 'assets/scripts/[name].[hash:4].js',
    chunkFilename: 'assets/scripts/[name].[chunkhash:5].js',
  },

  // 资源
  resolve: {
    // 导入忽略后缀
    extensions: ['.js', '.mjs', '.vue', '.json'],

    // 别名
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },

    // 模块目录
    modules: ['node_modules'],
  },

  // 优化
  optimization: {
    minimizer: [
      // JavaScript 压缩
      new UglifyJS({uglifyOptions: {output: {comments: false,},},}),

      // CSS 压缩
      new OptimizeCSS({cssProcessorOptions: {autoprefixer: false, sourcemap: true, discardComments: true, safe: true,},}),
    ],
  },

  // 模块
  module: {
    // 规则
    rules: [
      // ESLint
      {
        test: /\.(js|mjs|jsx|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: resolve('src'),
        exclude: /^(node_modules|bower_components)$/,
      },

      // Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {},
      },

      // Babel
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {cacheDirectory: true, compact: true,},
        exclude: /^(node_modules|bower_components)$/,
      },

      // 字体处理
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader',
        options: {limit: 10000, name: 'assets/fonts/[name].[hash:7].[ext]',},
      },

      // 图片处理
      {
        test: /\.(png|jpe|jpeg|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {limit: 10000, name: 'assets/images/[name].[hash:7].[ext]',},
      },

      // 媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {limit: 10000, name: 'assets/media/[name].[hash:7].[ext]',},
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
  ]
};
