var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server',
    './lib/index.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: 9000,
    hot: true
  },

  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          'presets': ['es2015', 'stage-2', 'react', 'flow'],
          'plugins': ['react-hot-loader/babel-loader']
        },
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=20000'
      }
    ]
  },
  plugins: [
    'react',
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  node: {
    fs: 'empty'
  }
}
