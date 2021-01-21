const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
module.exports = merge(commonConfig, {
    optimization: {
        minimize: false
    },
    // add entry with preact devtool
    // devtool: "eval-cheap-source-map",
    devtool: "source-map",
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        historyApiFallback: true,
        compress: true,
        port: 8088,
        open: "Google Chrome",
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ]
})

