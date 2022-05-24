const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 4.2 配置VueLoaderPlugin
const { VueLoaderPlugin } = require('vue-loader');
// 1 package.json运行打包  npm i -D webpack webpack-cli
// 3 babel转换成es5 npm i -D @babel/core @babel/preset-env babel-loader
// 4 安装vue 3.x npm i -S vue@next npm i -D vue-loader@next @vue/compiler-sfc
// 5 npm i -D style-loader css-loader sass-loader sass

module.exports = {
  // 1 入口
  entry: './src/main.js',
  // 1 出口
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    publicPath: './',
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          // 图片和iconfont
          {
            test: /\.(jpg|png|gif)$/,
            type: 'asset',
            parser: {
              dataurlCondition: {
                maxSize: 8192
              }
            },
            generator: {
              filename: 'img/[name].[contenthash:10].[ext]'
            }
          },
          {
            test: /\.(ttf|eot|woff2?)$/,
            type: 'asset/resource',
            generator: {
              filename: 'font/[name].[contenthash:10].[ext]'
            }
          },
          // 3-1 babel 主要是兼容js语法 但不完全是转换成es5代码 比如Promise
          // 3-2 npm i -D core-js 
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: 3 // 3.3 修改babel配置 报错 少一个数组中括号
                }]]
              }
            }
          }
        ]
      },
      // 4.1 配置vue-loader 不可以放在oneof里面 VueLoaderPlugin会找不到
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 2 html文件模板
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
  ],
  mode: 'development',
  // 2  npm i -D webpack-dev-server 实现浏览器热更新和运行在浏览器上显示
  devServer: {
    static: {
      directory: resolve(__dirname, 'build')
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true
  },
  target: 'web', // webpack5 开启热更新不添加的话 会热更新没用
}