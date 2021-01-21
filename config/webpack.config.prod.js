const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
    optimization: {
        minimize: true
    },
    mode: "production",
    module: {},
    devtool: "none",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ]
            },
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     template: path.resolve('public/index.html'),
        // }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/./]),
        new BundleAnalyzerPlugin({
            analyzerMode: "static"
        })
    ],
})
