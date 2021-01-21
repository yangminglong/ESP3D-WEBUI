const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const publicUrl = '/dist';
const publicUrl = '';
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: publicUrl + '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('./public/index.html'),
        })
    ],
}
