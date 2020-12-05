const webpack =  require('webpack')
const { merge } = require('webpack-merge')
const MiniCssPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const baseWebpackConfig = require('./webpack.base.conf')
const PATHS = require('../utils/PATHS')

// Prod config
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: `assets/js/[name].min.js`,
    path: PATHS.dist.path
  },

  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: [
          MiniCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: 'webpack/utils/postcss.config.js'
              }
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.css/i,
        use: [
          MiniCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: 'webpack/utils/postcss.config.js'
              }
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new MiniCssPlugin({
      filename: 'assets/css/[name].css',
    }),
    new ImageminPlugin({ 
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: 70
      },
      mozjpeg: {
        quality: 50,
        progressive: true
      },
      gifsicle: {
        interlaced: true,
        optimizationLevel: 3
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false
          }
        ]
      }
    }),
    new CleanWebpackPlugin(),
  ]
});
