var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./public/MezzoForte.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader' , 'css-loader'] },
      {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime']
        }
      }
    }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  devServer: { contentBase: './public' }
}