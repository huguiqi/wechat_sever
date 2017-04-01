/*
	单独打包css
	http://webpack.github.io/docs/stylesheets.html#separate-css-bundle
*/
var path = require("path");
var debug = process.env.NODE_ENV !== 'pro';
var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.join(__dirname, "js"),
    entry: {
        lib: "./lib.js",
        app: "./app.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash:8].js"
    },
    // 表示这个依赖项是外部lib，遇到require它不需要编译，且在浏览器端对应window.jQuery
    // externals: {
    // 	'angular': 'window.angular',
    //     'jquery': 'window.jQuery'
    // },
    devServer: {
      inline: true,
      port: 7777
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, 
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!!autoprefixer-loader!less-loader")
            },
            {
                test: /\.(jpg|png)$/, 
                loader: "url-loader?limit=8192"
            },
            /* bootstrap fonts 
             * https://www.npmjs.com/package/bootstrap-webpack 标明的loader用不了
             * https://www.npmjs.com/package/font-awesome-webpack 居然可以用
            */
            // {
            //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     loader: "url-loader?limit=100000&minetype=application/font-woff"
            // }, 
            {
                test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ],
        devtool: 'source-map'
    },
    plugins: [
        new ExtractTextPlugin("[name].[chunkhash:8].css", {
            allChunks: true
        }),
        new HtmlWebpackPlugin({                        
             // favicon:'./src/img/favicon.ico', //favicon路径
             filename:'../index.html',    //生成的html存放路径，相对于 path
             template:'tpl/index.html',    //html模板路径
             inject:true,    //允许插件修改哪些内容，包括head与body
             hash:false,    //为静态资源生成hash值
             minify:{    //压缩HTML文件
                 removeComments:false,    //移除HTML中的注释
                 collapseWhitespace:false    //删除空白符与换行符
             }
        })
    ]
}