var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./public/MezzoForte.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "index_bundle.js"
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: [ 'style-loader' , 'css-loader']  
      },
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
      },
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
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