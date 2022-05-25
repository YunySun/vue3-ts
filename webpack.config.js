const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 4.2 配置VueLoaderPlugin
const { VueLoaderPlugin } = require('vue-loader');
// 1 package.json运行打包  npm i -D webpack webpack-cli
// 3 babel转换成es5 npm i -D @babel/core @babel/preset-env babel-loader
// 4 安装vue 3.x npm i -S vue@next npm i -D vue-loader@next @vue/compiler-sfc
// 5 npm i -D style-loader css-loader sass-loader sass
// 6 分离css npm i -D mini-css-extract-plugin
// 8 css3兼容处理 npm i -D postcss-loader postcss postcss-preset-env
// 9 响应式单位处理
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';
const prodPlugins = []

// 判断开发环境还是生产环境 添加插件
if (isProd) {
  prodPlugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
  }))
}
console.log(process.env.NODE_ENV, isProd);

module.exports = {
  // 1 入口
  entry: './src/main.js',
  // 1 出口
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    publicPath: isProd ? './' : '/',
    clean: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env']
                  }
                }
              },
              'sass-loader'
            ]
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
    new VueLoaderPlugin(),
    ...prodPlugins
  ],
  mode: 'development',
  // 7 固定模块单独打包
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    usedExports: true, // 标记未使用的到处模块 便于移除
    sideEffects: true, // 移除无用的模块
    // splitChunks: { // 将调用的依赖分离出来
    //   chunks: "all"
    // }
  },
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