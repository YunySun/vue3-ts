/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-25 15:56:31
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-30 22:41:58
 */
const { resolve } = require('path');
const { merge } = require('webpack-merge')
const Common = require('./webpack.common')

const paths = {
  appSrc: resolve(__dirname, '../src'),
  appDist: resolve(__dirname, '../build'),
}

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
})

module.exports = devWebpackConfig