const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    mainApp: "./src/js/app.js",
    bootstrapStyling: "./src/js/bootstrapStyling.js",
  },

  output: {
    path: path.resolve(__dirname, "prod"),
    filename: "[name].js",
  },

  devServer: {
    port: 2021,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, //Extracts css into files
          "css-loader", //Tuns css into common js
        ],
      },

      {
        //transpiles SCSS to js
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, //Extract css into files
          "css-loader", //Turns css into common js
          "sass-loader", //Turns scss into css
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new HtmlWebpackPlugin({
      title: "My Gentle Webpack App",
      template: "./src/myApp.html",
    }),
  ],
};
