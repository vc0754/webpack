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
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use:{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: '[hash:10].[ext]',
            esModule: false,
            output: 'img',
            // outputPath:'img',//设置打包成功后图片的文件夹名字
            // name:'img/[name]_[hash:6].[ext]',//[name]:站位 [hash:6]:hash意思是阿西值站6为  ,[ext]: 匹配图片的扩展名字 列入 .png或者其他 等
          }
        }
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: '5173'
  }
}