/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-05-24 09:18:19
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-24 17:22:57
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const paths = {
  appSrc: resolve(__dirname, '../src'),
  appDist: resolve(__dirname, '../build'),
}

module.exports = {
  // 1 入口
  entry: './src/main.ts',
  // 1 出口
  output: {
    path: paths.appDist,
    clean: true,
  },
  // // 指定webpack需要解析的目录范围
  // modules: [
  //   'node_modules',
  //   paths.appSrc
  // ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'], // 为了之后引入不添加后缀
    alias: {
      '@': paths.appSrc,
    },
    symlinks: false, // 如果不使用symlinks
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(jpg|png|gif)$/,
            include: paths.appSrc,
            type: 'asset',
            parser: {
              dataurlCondition: {
                maxSize: 8192,
              },
            },
            generator: {
              filename: 'img/[name].[contenthash:10].[ext]',
            },
          },
          {
            test: /\.(ttf|eot|woff2?)$/,
            type: 'asset/resource',
            include: paths.appSrc,
            generator: {
              filename: 'font/[name].[contenthash:10].[ext]',
            },
          },
          {
            test: /\.(js|mjs|ts|tsx)$/,
            exclude: /node_modules/,
            // include: resolve(__dirname, '../src'),
            use: [
              {
                loader: 'esbuild-loader',
                options: {
                  loader: 'tsx',
                  target: 'es2015',
                },
              },
              {
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                  presets: [['@babel/preset-env', {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  }]],
                },
              },
              {
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] },
              },
            ],
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new VueLoaderPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    })
  ],
  devServer: {
    static: {
      directory: paths.appDist,
    },
    compress: true,
    port: 8081,
    open: true,
    hot: true,
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  target: 'web',
};
