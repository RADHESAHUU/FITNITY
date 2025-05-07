const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      publicPath: '/',
      clean: true
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 8080,
      host: 'localhost', // Force localhost instead of IPv6
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          pathRewrite: {'^/api': ''},
          changeOrigin: true,
        },
      },
      client: {
        overlay: true,
        webSocketURL: 'ws://localhost:8080/ws', // Force WebSocket URL to use localhost
      },
    },
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
      chunkIds: 'named',
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: isProduction,
              drop_debugger: isProduction,
              pure_funcs: isProduction ? ['console.log'] : [],
              passes: 3,
              toplevel: true,
              unused: true,
              dead_code: true
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 20,
        minSize: 20000,
        maxAsyncRequests: 30,
        cacheGroups: {
          defaultVendors: false,
          default: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
            priority: 40,
            chunks: 'all',
            enforce: true,
          },
          core: {
            name: 'core',
            test: /[\\/]node_modules[\\/](redux|react-redux|@reduxjs|redux-thunk)[\\/]/,
            priority: 35,
            chunks: 'all',
          },
          threejs: {
            name: 'threejs',
            test: /[\\/]node_modules[\\/](three)[\\/]/,
            priority: 33,
            chunks: 'async',
          },
          reactThree: {
            name: 'react-three',
            test: /[\\/]node_modules[\\/](@react-three)[\\/]/,
            priority: 32,
            chunks: 'async',
          },
          media: {
            name: 'media',
            test: /[\\/]node_modules[\\/](hls\.js|video\.js)[\\/]/,
            priority: 30,
            chunks: 'async',
          },
          libs: {
            name: 'libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            chunks: 'async',
            minChunks: 2,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', { 
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions', 'not dead']
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: [
                ['@babel/plugin-transform-runtime', {
                  regenerator: true,
                  corejs: 3
                }]
              ]
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/,
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
      isProduction && new webpack.ids.HashedModuleIdsPlugin(),
    ].filter(Boolean),
  };
};