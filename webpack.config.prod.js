var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
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
        test: /\.js$|\.jsx$/,
        exclude: path.join(__dirname, 'node_modules'),
        loaders: [
          'babel-loader?' + JSON.stringify({ presets: ['stage-2', 'es2015', 'react', 'flow'] })
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=20000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  node: {
    fs: 'empty'
  }
}
