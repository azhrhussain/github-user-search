const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
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
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new DotenvPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          // }
        }
      },

      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      // {
      //   test: /\.scss$/,
      //   use:['style-loader','css-loader','sass-loader']
      // }
    ]
  },
  devtool: 'source-map',
}