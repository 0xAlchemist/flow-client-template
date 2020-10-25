const paths = require("./paths");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  // Inline source maps for dev mode
  devtool: "inline-source-map",

  // Use a dev server with live reloading
  // to increase dev speed
  // - opens new tab in default browser
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    // More efficient hot reloading plugin
    // - only update what has changed
    new webpack.HotModuleReplacementPlugin(),
  ],
});
