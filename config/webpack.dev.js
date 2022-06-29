/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-25 15:56:31
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-29 16:53:16
 */
const { merge } = require('webpack-merge')
const Common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devWebpackConfig = merge(Common, {
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(c|sc|sa)ss$/i,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env'],
                  },
                },
              },
              'sass-loader',
            ],
          },
        ]
      }
    ]
  },
  plugins: [
    // 打包体积分析
    new BundleAnalyzerPlugin()
  ],
})

module.exports = devWebpackConfig