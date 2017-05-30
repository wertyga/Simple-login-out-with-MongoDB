'use strict';

const webpack = require('webpack');
const path = require('path');
var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
let CompressionPlugin = require('compression-webpack-plugin');


module.exports = {

    entry: [
        path.join(__dirname, 'client/index.js')
    ],

    output: {
        path: path.join(__dirname, 'public/'),
        publicPath:  '/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
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
                loader: 'url-loader',
                query: {
                    limit: 10000
                }
            },

            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'client'),
                exclude:[path.resolve(__dirname, "node_modules")],
                loader: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg)$/i,
                loaders: [ {
                    loader: 'url-loader',
                    query: {
                        limit: 10000
                    }
                     },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
            "createReactClass": "create-react-class",
            "PropTypes": "prop-types"
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     sourceMap: false,
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //         side_effects: false,
        //         properties: true,
        //         sequences: true,
        //         dead_code: true,
        //         conditionals: true,
        //         comparisons: true,
        //         evaluate: true,
        //         booleans: true,
        //         unused: true,
        //         loops: true,
        //         hoist_funs: true,
        //         cascade: true,
        //         if_return: true,
        //         join_vars: true,
        //         drop_debugger: true,
        //         unsafe: true,
        //         hoist_vars: true,
        //         negate_iife: true,
        //         unsafe_comps: true,
        //         screw_ie8: true,
        //         pure_getters: true
        //     },
        //     mangle: {
        //         sort: true,
        //         eval: true,
        //         toplevel: true,
        //         properties: true
        //     },
        //     output: {
        //         comments: false,
        //         beautify: false,
        //         space_colon: false
        //     },
        //     exclude: [/\.min\.js$/gi]
        // })
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    }
}