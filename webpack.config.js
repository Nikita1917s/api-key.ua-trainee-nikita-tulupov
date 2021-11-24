const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.js', 'json'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    target: 'web',
    optimization: {
        runtimeChunk: 'single'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|PNG|svg|SVG|gif|GIF|jpg|JPG|jpeg|JPEG)$/i,
                include: path.join(__dirname, 'assets/images'),
                use: ["file-loader"],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: ["file-loader"],
            },
            {
                test: /\.xml$/i,
                use: ["xml-loader"],
            },
            {
                test: /\.csv$/i,
                use: ["xml-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
}

// include: path.resolve(__dirname, 'assets/images'),

// {
//     test: /\.css$/i,
//     use: ["style-loader", "css-loader"],
// },

// {
//     test: /\.css$/i,
//     use: [MiniCssExtractPlugin.loader, "css-loader"],
//   },

// filename: '[name].[contenthash].css',