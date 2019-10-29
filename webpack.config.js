const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  let isDevelopment = false;

  if (argv && argv.mode === 'development') {
    isDevelopment = true;
  }

  const outputPath = path.resolve(__dirname, isDevelopment ? 'dev' : 'dist');

  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: outputPath
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    stats: { children: false },
    devtool: isDevelopment ? 'eval-source-map' : 'none',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: configureCSSLoaders({ isDevelopment, cssModules: true }),
          include: /\.module\.scss$/
        },
        {
          test: /\.scss$/,
          use: configureCSSLoaders({ isDevelopment, cssModules: false }),
          exclude: /\.module\.scss$/
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader'
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: isDevelopment,
                mozjpeg: {
                  progressive: false,
                  quality: 65
                },
                optipng: {
                  enabled: true,
                  optimizationLevel: 4
                },
                pngquant: {
                  quality: '65-90',
                  speed: 5
                },
                svgo: {
                  removeViewBox: false
                }
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/template/layout/index.html',
        filename: 'index.html'
      })
      // new CopyWebpackPlugin([
      //   {
      //     from: 'src/fonts/',
      //     to: 'fonts/'
      //   }
      // ])
    ]
  };
};

function configureCSSLoaders({ isDevelopment, cssModules }) {
  let postcssPlugins = [require('autoprefixer')];

  if (!isDevelopment) {
    postcssPlugins.push(require('cssnano'));
  }

  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: isDevelopment }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: cssModules
          ? {
              // context: path.resolve(__dirname, 'src'),
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          : false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: postcssPlugins
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: ['./src/style/_resources.scss']
      }
    }
  ];
}
