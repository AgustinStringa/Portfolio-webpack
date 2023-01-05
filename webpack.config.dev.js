const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'images/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            Utilities: path.resolve(__dirname, 'src/utils/'),
            Templates: path.resolve(__dirname, 'src/templates/'),
            Images: path.resolve(__dirname, 'src/assets/images/'),
            Styles: path.resolve(__dirname, 'src/styles/'),
        },
    },
    optimization: {
        chunkIds: 'named',
        minimize: true,
        minimizer: [
            new TerserPlugin({
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.png/,
                type: 'asset/resource',
                generator: {
                    filename: "assets/images/[hash][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext]",
                },
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'Webpack Project',
                filename: 'index.html',
                meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
                minify: true,
                template: './public/index.html',
                inject: true,

            }
        ),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            insert: '',
            runtime: true,
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, "src", "assets/images"), to: "assets/images" },],
        // }),
        new Dotenv(),
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
}
