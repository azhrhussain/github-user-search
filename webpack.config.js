const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const path = require('path');

var mode = process.env.NODE_ENV || 'development';
module.exports = {

  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 240000,
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify")
    }
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico'
    }),
    new DotenvPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },

      {
        test: /\.(png|jpg|svg|gif|ico)$/,
        use: ['file-loader']
      },
    ]
  },
  devtool: (mode === 'development') ? 'inline-source-map' : false,
  mode: mode,
}