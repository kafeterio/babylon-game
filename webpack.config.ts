import _ from "lodash"
import webpack from "webpack"
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import toCdn from "./toCdn"

const DynamicCdnWebpackPlugin = require("dynamic-cdn-webpack-plugin")

const IS_DEV_SERVER = process.argv[1].indexOf("webpack-dev-server") >= 0

const config: webpack.Configuration = {
  mode: "development",
  stats: {
    warningsFilter: /node_modules.*peerjs\.min\.js/,
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/index.html",
    }),
    // new DynamicCdnWebpackPlugin({
    //   resolver: toCdn,
    // }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: "https:/brianzinn.github.io/create-react-app-babylonjs",
      NODE_ENV: "production",
    }),
  ],
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].bundle.js",
    chunkFilename: "[name].[chunkhash].bundle.js",
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
    ],
  },
  // devtool: "cheap-eval-source-map",
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
