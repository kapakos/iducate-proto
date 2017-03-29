const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const values = require('postcss-modules-values');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const getEnv = function () {
  return process.env.NODE_ENV;
};

const isDev = function () {
  return getEnv() === 'development';
};

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]', 'postcss-loader'),
      }, {
        test: /\.(png|jpg|gif|svg|woff|svg|ttf|eot)$/,
        loader: 'url?limit=30000&name=[name]-[hash].[ext]',
      }],
  },
  resolve: {
    alias: {
      components: path.resolve(SRC_PATH, 'components'),
      colors: path.resolve(SRC_PATH, 'styles', 'config', 'colors.css'),
      images: path.resolve(SRC_PATH, 'images'),
    },
  },
  postcss(webpack) {
    return [
      precss,
      values,
      autoprefixer,
    ];
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};

if (!isDev()) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
}
