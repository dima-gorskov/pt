const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        cart: './src/cart/main.js',
        form: './src/form/main.js',
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/dist/',
        filename: '[name].[hash:20].bunle.js',
    },
    target: 'node',
    devtool: 'source-map',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false, // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: [/node_modules/, path.resolve(__dirname, 'server.js'), path.resolve(__dirname, 'getRates.js')],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [{ loader: 'html-loader' }],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html', //relative to root of the application
            excludeChunks: ['cart', 'form'],
        }),
        new HtmlWebPackPlugin({
            template: './src/cart/index.html',
            chunks: ['cart'],
            filename: './cart.html',
        }),
        new HtmlWebPackPlugin({
            template: './src/form/index.html',
            chunks: ['form'],
            filename: './form.html',
            excludeChunks: ['server'],
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};
