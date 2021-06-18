const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "./js/build.js"
    },
    mode: 'development',
    module: {
        rules: [{
                test: /\.less$/i, //检测文件是否是less文件 
                use: [{ //执行顺序 从上向下 从右向左依次同步执行 
                        loader: 'style-loader', //将js中的css模块以style标签的方式插入到页面中
                    }, //如果loader不需要配置信息可以直接这样书写 
                    'css-loader', //将css文件以commonjs模块方案整合到到js中 
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
                        name: './imags/[hash:10].[ext]'
                    },
                }, ],
            },
            { test: /\.html$/i, loader: 'html-loader' },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    }), ],
    devServer: {
        port: 8888,
        host: "127.0.0.1",
        open: true,
        compress: true, //启动gzip压缩
        quiet: true, //启动静默模式
    },
}