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
      { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
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