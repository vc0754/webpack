// WebpackJS

const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateEntry = require('./generateEntry');
const generateTemplate = require('./generateTemplate');

const entry = generateEntry();
const templates = generateTemplate(entry);

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js']
  },
  entry,
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    ...templates,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: '5173',
    open: true
  }
}