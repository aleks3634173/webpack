const webpack =  require('webpack')
const { merge } = require('webpack-merge')
const MiniCssPlugin = require('mini-css-extract-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const MediaQueryPlugin = require('media-query-plugin');
const SpritesmithPlugin = require('webpack-spritesmith')
const PATHS = require('../utils/PATHS')

// DEV config
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: `assets/js/[name].js`,
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
          },
          MediaQueryPlugin.loader,
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
          'cache-loader',
          {
            loader: 'css-loader',
          },
        ]
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',  
  plugins: [
     new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new MiniCssPlugin({
      filename: 'assets/css/[name].css',
    }),
    new SpritesmithPlugin({
        src: {
            cwd: PATHS.src.assets.image.ico,
            glob: '*.png'
        },
        target: {
            image: `${PATHS.src.assets.image.content}/sprite.png`,
            css: `${PATHS.src.assets.sass}/_sprite.sass`,
        },
        apiOptions: {
            cssImageRef: "~_images/content/sprite.png"
        }
    }),
  ],
  devServer: {
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false,
    },
    hot: true,
    host: '192.168.1.5', // your local ip
    open: 'Chrome',
    contentBase: PATHS.dist.path,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    clientLogLevel: 'error',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
