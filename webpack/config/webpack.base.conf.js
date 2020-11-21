const webpack =  require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') 
const SpritePlugin = require('svg-sprite-loader/plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const PATHS = require('../utils/PATHS')
const path = require('path')

module.exports = {
  entry: {
    main: PATHS.src.entryPointer,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]|libs/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to <template lang="pug"> in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: [
              {
                loader: 'pug-loader',
                options: {
                  pretty: true
                },
              }
            ]
          }
        ]
      },
        {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          PATHS.src.assets.libs,
        ],
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: [
          /node_modules/,
          PATHS.src.assets.libs,
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: '/assets/fonts/',
              context: 'src/assets/fonts',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          PATHS.src.assets.image.content,
          PATHS.src.assets.image.general,
        ],
        exclude: [
          /node_modules/,
          PATHS.src.assets.libs,
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/img/',
              publicPath: '/assets/img/',
              context: 'src/assets/img',
            }
          },
        ]
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g|mp4|webm)$/i,
        include: [
          PATHS.src.assets.media,
        ],
        exclude: [
          /node_modules/,
          PATHS.src.assets.libs,
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/media/',
              publicPath: '/assets/media/',
              context: 'src/assets/media',
            }
          },
        ]
      },
      {
        test: /\.png$/i,
        include: [
          PATHS.src.assets.image.ico,
        ],
        exclude: [
          /node_modules/,
          PATHS.src.assets.libs,
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.svg$/i,
        include: [
          PATHS.src.assets.image.svg
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: '[name]',
              extract: true,
              spriteFilename: 'assets/img/svg/sprite.svg',
            },
          },
        ],
      },
    ]
  },
  resolve: {
    descriptionFiles: ['package.json'],
    modules: ["node_modules", "libs"],
    symlinks: false,
    alias: {
      '_dir': PATHS.dir,
      '_components': PATHS.src.template.components,
      '_module': PATHS.src.template.module,
      '_layout': PATHS.src.template.layout,
      '_template': PATHS.src.template.path,
      '_libs': PATHS.src.assets.libs,
      '_fonts': PATHS.src.assets.fonts,
      '_js': PATHS.src.assets.js,
      '_sass': PATHS.src.assets.sass,
      '_images': PATHS.src.assets.image.path,
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    ...PATHS.getPages().map(page => new HtmlWebpackPlugin({
      template: `${PATHS.src.template.pages}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      minify: false
    })),
    new FaviconsPlugin({
      logo: `${PATHS.src.assets.image.favicon}/favicon.png`,
      prefix: 'assets/img/favicon/',
      outputPath: 'assets/img/favicon',
      inject: true,
      cache: true,
      favicons: { 
        icons: {
          android: false,              
          appleIcon: false,            
          appleStartup: false,         
          coast: false,               
          favicons: true,            
          firefox: false,             
          windows: false,             
          yandex: false                
        }
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
  	  	{
      	  from: PATHS.src.assets.static,
      	  to: 'assets/static/',
      	},
      ]
    }),
    new SpritePlugin({ plainSprite: true }),
    
  ],
}