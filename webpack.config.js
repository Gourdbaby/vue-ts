var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier')
const chalk = require('chalk');

const isProduction = process.env.NODE_ENV === 'production';

const CssExtract = new MiniCssExtractPlugin({
  filename: 'assets/css/[name].css'
})

var config = {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\.js$/g,
          chunks: 'all',
          name: 'common',
          minChunks: 1
        }
      }
    }
  },
  entry: {
    url: path.join(__dirname, '/vendors/url.min.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js',
    publicPath: '/mobile/'
  },
  module: {
    rules: [{
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: [{
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }],
            less:[{
              loader: MiniCssExtractPlugin.loader
            },{
              loader: 'css-loader'
            },{
              loader: 'less-loader'
            }]
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/font/'
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images/[name].[ext]?[hash]'
          }
        }]
      }
    ]
  },
  plugins: [
    CssExtract,
    new webpack.ProvidePlugin({
      'Vue': ['vue/dist/vue.esm.js', 'default'],
      '$': 'jquery'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', ".vue", ".json"],
    alias: {
      'vendors': path.join(__dirname, 'vendors')
    }
  },
  devServer: {
    host: 'localhost',
    port: 8100,
    publicPath: '/mobile/',
    stats: {
      colors: true
    },
    disableHostCheck: true,
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin ^_^
  },
  devtool: 'cheap-module-source-map'
}

var entryDir = path.join(__dirname, 'pages/');
var entries = glob.sync(entryDir + '*').map(function (entry) {
  return {
    name: path.basename(entry),
    path: entry
  }
});
entries.forEach(function (entry) {
  //添加entry
  config.entry[entry.name] = [entry.path] + '/index.ts';

  //生成html
  config.plugins.push(new htmlWebpackPlugin({
    filename: entry.name + '.html',
    template: entry.path + '/index.html',
    chunks: ['url', 'common', entry.name],
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }));
});

config.plugins.push(new FriendlyErrorsWebpackPlugin({
  compilationSuccessInfo: {
    messages: [`Your application is running here: ${chalk.yellow(`http://${config.devServer.host}:${config.devServer.port}`)}.`],
  },
  onErrors: function (severity, errors) {

    return (severity, errors) => {
      if (severity !== 'error') return

      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()

      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  },
  clearConsole: true,
}))

module.exports = config;