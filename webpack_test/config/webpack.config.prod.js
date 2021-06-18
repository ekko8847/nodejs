const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "./js/build.js",
        publicPath: "/",
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.less$/i, //检测文件是否是less文件 
                use: [ //执行顺序 从上向下 从右向左依次同步执行 
                    MiniCssExtractPlugin.loader,

                    { //如果loader不需要配置信息可以直接这样书写 
                        loader: 'css-loader',
                    }, //将css文件以commonjs模块方案整合到到js中 
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['postcss-preset-env',
                                        {
                                            // 其他选项 
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'less-loader', //将less文件编译成css文件
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 256,
                        name: 'imags/[hash:10].[ext]'
                    },
                }, ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },

            {
                test: /\.js$/, //排除node_modules不处理 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            }

        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: { //去除空格 
            collapseWhitespace: true, //去除注释 
            removeComments: true, //移除默认属性 
            removeRedundantAttributes: true, //移除script的type属性
            removeScriptTypeAttributes: true, //移除link的type属性 
            removeStyleLinkTypeAttributes: true, //使用doctype 
            useShortDoctype: true
        },
    }), new MiniCssExtractPlugin({
        filename: "css/[name].css",

    })],
    devServer: {
        port: 8888,
        host: "127.0.0.1",
        open: true,
        compress: true, //启动gzip压缩
        quiet: true, //启动静默模式
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

}