const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const paths = require("./paths");

module.exports = {
  // Entry point where webpack looks to build the bundle
  entry: [paths.src + "/index.js"],

  // Output directory for the bundle and assets
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  plugins: [
    // Clean up build folders between builds
    new CleanWebpackPlugin(),

    // Copy assets to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),

    // Generates an HTML file from the provided template
    new HTMLWebpackPlugin({
      title: "0xAlchemist's Webpack Boilerplate",
      favicon: paths.src + "/images/favicon.png",
      template: paths.public + "/template.html",
      filename: "index.html", // output file
    }),
  ],

  module: {
    rules: [
      {
        // JS: Use Babel to transpile JSX and Modern ECMA Script
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // Styles: Inject CSS into the head with source maps
        test: /\.(s[ac]ss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        // Images: Copy image files to build folder
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        // Fonts and SVGs: Inline files
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
};
