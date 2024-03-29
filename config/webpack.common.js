/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-05-24 09:18:19
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-28 10:54:00
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

const paths = {
    appSrc: resolve(__dirname, '../src'),
    appDist: resolve(__dirname, '../build'),
};

module.exports = {
    // 1 入口
    entry: './src/main.ts',
    // 1 出口
    output: {
        path: paths.appDist,
        clean: true,
        pathinfo: false,
    },
    // // 指定webpack需要解析的目录范围
    // modules: [
    //   'node_modules',
    //   paths.appSrc
    // ],
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.d.ts'], // 为了之后引入不添加后缀
        alias: {
            '@': paths.appSrc,
        },
        modules: ['node_modules', paths.appSrc],
        symlinks: false, // 如果不使用symlinks
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(jpg|png|gif)$/,
                        include: paths.appSrc,
                        type: 'asset/resource',
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
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                include: paths.appSrc,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    // 从public中复制文件
                    from: resolve(__dirname, '../public/resource'),
                    // 把复制的文件存放到dis里面
                    to: resolve(__dirname, '../build/resource'),
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
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
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
        }),
    ],
    devServer: {
        static: {
            directory: paths.appDist,
        },
        compress: true,
        port: 8888,
        open: true,
        hot: true,
    },
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    target: 'web',
};
