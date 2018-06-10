const { resolve, appDirectory, resolveOwn } = require('./paths');

const merge = require('webpack-merge');
const baseConfig = require('./base');

// 清理
const CleanPlugin = require('clean-webpack-plugin');

// 复制
const CopyPlugin = require('copy-webpack-plugin');

// HTML
const HtmlPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssExtract  = new ExtractTextPlugin("assets/styles/style.[hash:5].css");
const lessExtract = new ExtractTextPlugin("assets/styles/less.[hash:5].css");
const sassExtract = new ExtractTextPlugin("assets/styles/sass.[hash:5].css");
const stylExtract = new ExtractTextPlugin("assets/styles/styl.[hash:5].css");

// prodConfig
const prodConfig = merge(baseConfig, {
  // 模式
  mode: "production",

  // 优化
  optimization: {
    minimize: true,

    // ??? 代码分片 忘记了
    // runtimeChunk: {
    //   name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    // },
    
  },

  plugins: [
    new CleanPlugin(['dist', 'build'], {root: appDirectory}),

    // CSS 抽取
    cssExtract,
    lessExtract,
    sassExtract,
    stylExtract,

    //
    // DLL 才需要下列操作
    //

    // DLL
    // new DllReferencePlugin({
    //   manifest: resolve('dll/manifest.json')
    // }),

    // 复制
    // new CopyPlugin([{from: '', to: '', cache: true}]),

    // 静态文件插入 HTML
    // new AddAssetHtmlPlugin([
    //   {
    //     filepath: resolve('dist/lib*.js'),
    //     // outputPath: utils.assetsPath('js'),
    //     // publicPath: path.posix.join(config.build.assetsPublicPath, 'static/js'),
    //     // hash: true,
    //     includeSourcemap: false
    //   }
    // ]),
  ],

  module: {
    rules: [
      // CSS and PostCSS
      {
        test: /\.(css|postcss)$/,
        loader: cssExtract.extract({
          fallback: 'vue-style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true,},},
            {loader: 'postcss-loader', options: {sourceMap: true,},},
          ],
        }),
      },

      // Sass
      {
        test: /\.(scss|sass)$/,
        loader: sassExtract.extract({
          fallback: 'vue-style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true,},},
            {loader: 'postcss-loader', options: {sourceMap: true,},},
            {loader: 'sass-loader', options: {sourceMap: true,},},
          ],
        })
      },

      // LESS
      {
        test: /\.(less)$/,
        loader: lessExtract.extract({
          fallback: 'vue-style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true,},},
            {loader: 'postcss-loader', options: {sourceMap: true,},},
            {loader: 'less-loader', options: {sourceMap: true,},},
          ],
        })
      },

      // Stylus
      {
        test: /\.(styl|stylus)$/,
        loader: stylExtract.extract({
          fallback: 'vue-style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true,},},
            {loader: 'postcss-loader', options: {sourceMap: true,},},
            {loader: 'stylus-loader', options: {sourceMap: true,},},
          ],
        })
      },
    ],
  },
});

module.exports = prodConfig;
