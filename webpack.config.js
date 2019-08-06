const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackAutoInject = require('webpack-auto-inject-version')

module.exports = {
    entry: { main: './src/aura.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
    },
    devtool:'eval-source-map', // remove me in prod
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
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new ExtractTextPlugin({filename: 'style.css'}),
        new WebpackAutoInject()
    ]
}
