const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'youtube-classroom.bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //       plugins: [
      //         [
      //           '@babel/plugin-transform-runtime',
      //           {
      //             corejs: 3,
      //             proposals: true,
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    port: 'auto',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
};
