/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-05-24 09:18:08
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-30 22:52:52
 */
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const Common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const paths = {
  appSrc: resolve(__dirname, '../src'),
  appDist: resolve(__dirname, '../build'),
}

module.exports = merge(Common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    publicPath: './'
  },
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(c|sc|sa)ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    // 打包体积分析
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    runtimeChunk: true, // 最小化entry chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendor',
          chunks: 'all',
          priority: 10, // 优先级
        },
      },
    },
    usedExports: true, // 标记未使用的到处模块 便于移除
    sideEffects: true, // 移除无用的模块 在package.json设置sideEffects: false 会导致import的css过滤
    minimize: true, // 压缩后删除不被使用的代码
    splitChunks: { // 将调用的依赖分离出来
      chunks: "all"
    },
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4,
      }),// 加入后导致js文件不压缩 所以加TerserPlugin
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
})