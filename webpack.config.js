/* eslint-disable import/no-commonjs*/

const path = require("path")

const publicPath = path.join(__dirname, "public")

module.exports = {
  entry: "./src/main.js",
  output: {
    path: publicPath,
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "css-loader",
      },
    ],
  },
  devServer: {
    contentBase: publicPath,
    port: 5000
  }
}
