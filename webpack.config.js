const webpack = require('webpack');
const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {

    devtool: 'false',

    entry: [
        path.join(__dirname, 'client/index.js')
    ],

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },

            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /(.woff2|.woff|.eot|.ttf|.otf)$/,
                loader: 'url-loader'
            },

            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'client'),
                loader:[{
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                }]
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg)$/i,
                loaders: [
                    'url-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            },

            // {
            //     test: /\.sass$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         //resolve-url-loader may be chained before sass-loader if necessary
            //         use: ['css-loader', 'sass-loader']
            //     })
            // }
        ]
    },

    plugins: [
        //new UglifyJSPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new ExtractTextPlugin('style.css'),
        new webpack.ProvidePlugin({
            'React': 'react',
            "createReactClass": "create-react-class",
            "PropTypes": "prop-types",
            '$': 'jquery'
        })
    ],

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    }
}