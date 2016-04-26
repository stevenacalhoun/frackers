var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var bourbon = require('node-bourbon').includePaths;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  styles: path.join(__dirname, 'app/styles'),
  scripts: path.join(__dirname, 'app/scripts'),
  assets: path.join(__dirname, 'app/assets'),
  data: path.join(__dirname, 'app/data'),
}

module.exports = {
    entry: [
      path.resolve(PATHS.scripts, 'main.js'),
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
    ],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: "style!css!sass?includePaths[]=" + bourbon,
          include: PATHS.styles
        },
        {
          test: /\.css$/,
          loader: "style!css",
          include: path.join(PATHS.styles, "genericons")
        },
        {
          test: /\.json$/,
          loaders: ["json"],
          include: [PATHS.assets, PATHS.data]
        },
        {
          test: /\.(png|eot|svg|ttf|woff|gif)$/,
          loader: "url-loader",
          exclude: "node_modules"
        }
      ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Frackers"
      })
    ]
};
