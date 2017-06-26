const path = require('path');

module.exports = {
  entry: './Scripts/index.jsx',
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    contentBase: 'wwwroot/',
  },
};
