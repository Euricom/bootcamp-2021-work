/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotEnv = require('dotenv');

/**
 * @param {*} env
 * @return {webpack.Configuration}
 */
module.exports = function buildConfig(env, args) {
  const isDevelopment = args.mode !== 'production';

  if (isDevelopment) {
    const { error, parsed } = dotEnv.config();
    if (error) {
      // @ts-ignore
      if (error.code === 'ENOENT') {
        throw new Error('Missing .env file, please copy .env.example');
      } else throw error;
    }

    const runtimeConfig = Object.keys(parsed).reduce((acc, key) => {
      acc[key] = process.env[key];
      return acc;
    }, {});

    // eslint-disable-next-line no-console
    console.log('✅ DotEnv: \n', runtimeConfig);
  }

  /** @type {webpack.Configuration}} */
  const config = {
    mode: isDevelopment ? 'development' : 'production',
    target: 'web',
    entry: './src/index.tsx',
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
    bail: !isDevelopment,
    output: {
      path: path.resolve(__dirname, 'dist'),
      pathinfo: true,
      publicPath: '/',
      filename: isDevelopment ? 'static/js/[name].bundle.js' : 'static/js/[name].[contenthash:8].js',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
                // ... other babel plugins
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|svg|ttf|ico|pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: 'src/favicon.png',
      }),
      // @ts-ignore
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
      }),
      new webpack.DefinePlugin({
        process: {
          env: JSON.stringify(
            Object.keys(process.env)
              .filter((key) => key.startsWith('REACT_APP__'))
              .reduce((map, key) => {
                // eslint-disable-next-line no-param-reassign
                map[key] = process.env[key];
                return map;
              }, {}),
          ),
        },
      }),
    ],
  };

  if (isDevelopment) {
    /** @type {devServer.Configuration}} */
    const devServerConfig = {
      contentBase: './src',
      historyApiFallback: true, // support for html5 mode
      compress: true, // enable compression
      hot: true, // enable hot module replacement
      hotOnly: true,
    };

    // @ts-ignore
    config.devServer = devServerConfig;

    config.plugins.push(new HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
  } else {
    config.plugins.push(
      // @ts-ignore
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    );
  }

  return config;
};
