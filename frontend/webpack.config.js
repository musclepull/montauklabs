const HtmlWebpackPlugin = require("html-webpack-plugin")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const path = require("path")
const dotenv = require('dotenv')
const webpack = require("webpack")

const staticDir = path.resolve(__dirname, "static")
const buildDir = path.resolve(__dirname, "dist")
const buildTemplate = path.resolve(staticDir, "index-template.html")
const srcDir = path.resolve(__dirname, "src")
const entryPoint = path.resolve(__dirname, "src", "index.js")

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: entryPoint
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".json"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  output: {
    path: buildDir,
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: [srcDir],
        loader: require.resolve("esbuild-loader"),
        options: {
          loader: "jsx",
          target: "es2018",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env','@babel/preset-react'] },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://localhost:4000/",
        changeOrigin: true,
      },
    }
  },


  /*
      devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: {
        "/api/**": {
          target: "http://localhost:4000/",
          changeOrigin: true,
        },
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },


    devServer: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    filename: "[name].bundle.js",
    proxy: {
      '/api': {
        target: {
          host: "backend",
          protocol: 'http:',
          port: 4000
        },
        ignorePath: true,
        changeOrigin: true,
        secure: false
      },
    }
  },
  */
  plugins: [
    new HtmlWebpackPlugin({
      title: "Montauk Labs Test",
      template: buildTemplate,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(JSON.parse('true')),
      'process.env': JSON.stringify(dotenv.config().parsed),
  }),
  ],
}
