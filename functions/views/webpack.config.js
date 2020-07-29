const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');

module.exports = (env) => {
  const mode = env.production ? 'production' : 'development';
  const devtool = env.production ? false : 'source-map';
  const enforce = !env.production;
  return {
    mode,
    stats: 'errors-only',
    devtool,
    target: 'web',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce,
          },
        },
      },
      minimize: true,
      minimizer: [new TerserJSPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({})],
    },
    entry: './src/js/init',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      allowedHosts: [
        'localhost:8080',
        'localhost:5000',
      ],
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
      new HtmlWebpackPlugin({
        filename: './components/statistics.html',
        template: './src/components/statistics.html',
      }),
      new HtmlWebpackPlugin({
        filename: './components/tableRanking.html',
        template: './src/components/tableRanking.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        ignoreOrder: true,
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env'],
        //     },
        //   },
        // },
        // {
        //   test: /\.(jpg?g|png|gif|svg)$/i,
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name].[ext]',
        //     outputPath: 'images/',
        //   },
        // },
        // {
        //   test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: '[name].[ext]',
        //         outputPath: 'fonts/',
        //       },
        //     },
        //   ],
        // },
      ],
    },
  };
};
