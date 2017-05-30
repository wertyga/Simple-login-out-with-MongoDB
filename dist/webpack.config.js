'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

    entry: [path.join(__dirname, 'client/index.js')],

    output: {
        path: path.join(__dirname, 'public/'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }, {
            test: /\.sass$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /(.woff2|.woff|.eot|.ttf|.otf)$/,
            loader: 'url-loader',
            query: {
                limit: 10000
            }
        }, {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'client'),
            exclude: [path.resolve(__dirname, "node_modules")],
            loader: 'babel-loader'
        }, {
            test: /\.(gif|png|jpeg|jpg|svg)$/i,
            loaders: [{
                loader: 'url-loader',
                query: {
                    limit: 10000
                }
            }, {
                loader: 'image-webpack-loader',
                query: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false
                }
            }]
        }]
    },

    plugins: [new webpack.optimize.OccurrenceOrderPlugin(), new webpack.ProvidePlugin({
        'React': 'react',
        "createReactClass": "create-react-class",
        "PropTypes": "prop-types"
    }), new webpack.NoEmitOnErrorsPlugin(), new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })],

    resolve: {
        extensions: ['.js', '.jsx']
    }
};
//# sourceMappingURL=webpack.config.js.map