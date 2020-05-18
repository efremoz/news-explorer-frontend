const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { 
      main: './src/index.js',
      articles: './src/articles/index.js',
     },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].[chunkhash].js',
    },
    module: {
        rules: [
          {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
              test: /\.css$/i,
              use: [
                isDev
                  ? { loader: 'style-loader' }
                  : {
                      loader: MiniCssExtractPlugin.loader,
                      options: { publicPath: './' },
                    },
                'css-loader',
                'postcss-loader',
              ],
            },
            {
              test: /\.(eot|ttf|woff|woff2)$/,
              loader: 'file-loader?name=./vendor/fonts/[name].[ext]&publicPath=../',
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      esModule: false,
                      name: '../images/[name].[ext]',
                    },
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65,
                      },
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: [0.85, 0.9],
                        speed: 4,
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      webp: {
                        quality: 75,
                      },
                    },
                  },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/articles/index.html',
            filename: './articles/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].[contenthash].css',
        }),
        new CopyPlugin([
            { from: `${__dirname}/images`, to: 'images' }
        ]),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]

}