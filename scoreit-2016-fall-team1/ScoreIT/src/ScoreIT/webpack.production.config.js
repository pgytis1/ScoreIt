/* eslint no-var: 0 */
var config = require('./webpack.config');
var webpack = require('webpack');

module.exports = Object.assign({}, config, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
    ]
});
