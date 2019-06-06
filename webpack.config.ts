import _ from "lodash"
import webpack from "webpack"
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CleanWebpackPlugin from "clean-webpack-plugin"
import MiniCSSExtractWebpackPlugin = require("mini-css-extract-plugin")
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import toCdn from "./toCdn"

const DynamicCdnWebpackPlugin = require("dynamic-cdn-webpack-plugin")

const IS_DEV_SERVER = process.argv[1].indexOf("webpack-dev-server") >= 0

const config: webpack.Configuration = {
  mode: "development",
  stats: {
    warningsFilter: /node_modules.*peerjs\.min\.js/,
    errors: true,
    warnings: true,
    all: false,
    builtAt: true,
    colors: true,
    modules: true,
    maxModules: 400,
    excludeModules: /main.scss/,
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new DynamicCdnWebpackPlugin({
    //   resolver: toCdn,
    // }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: "https:/brianzinn.github.io/create-react-app-babylonjs",
      // NODE_ENV: "production",
    }),
    new CleanWebpackPlugin(),
    new MiniCSSExtractWebpackPlugin(),
  ],
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    devtoolModuleFilenameTemplate: "webpack://[namespace]/[resource-path]",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(svg|glb|gltf)$/,
        loader: "file-loader",
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCSSExtractWebpackPlugin.loader },
          {
            loader: "css-loader",
            options: {
              // sourceMap: true,
              modules: false,
            },
          }, // translates CSS into CommonJS
          {
            loader: "sass-loader",
            // options: {
            //   sourceMap: true,
            //   importer: function (...args) {
            //     args[0] = args[0].replace(/\\/g, '/')
            //     args[1] = args[1].replace(/\\/g, '/')
            //     return sassGlobImporter.apply(this, args)
            //   },
            // },
          }, // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
  devtool: "cheap-eval-source-map",
  resolve: { extensions: [".js", ".jsx", ".tsx", ".ts", ".json", ".svg", "*"] },
  devServer: {
    port: 4141,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
    host: "0.0.0.0",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: /node_modules/,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
}

export default config
