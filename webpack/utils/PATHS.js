const path = require('path')
const fs = require('fs')

class PATHS {
  constructor() {
    this.dir = path.resolve(__dirname, '../../');
    this.dist = {
      path: path.resolve(this.dir, 'public/'),
      assets: path.resolve(this.dir, 'public/assets/'),
    };
    this.src = {
      path: path.resolve(this.dir, 'src/'),
      entryPointer: path.resolve(this.dir, 'src/index.js'),
      assets: {
        path: path.resolve(this.dir, 'src/assets/'),
        js: path.resolve(this.dir, 'src/assets/js/'),
        sass: path.resolve(this.dir, 'src/assets/sass/'),
        media: path.resolve(this.dir, 'src/assets/media/'),
        image: {
          path: path.resolve(this.dir, 'src/assets/img/'),
          general: path.resolve(this.dir, 'src/assets/img/general/'),
          content: path.resolve(this.dir, 'src/assets/img/content/'),
          favicon: path.resolve(this.dir, 'src/assets/img/favicon/'),
          ico: path.resolve(this.dir, 'src/assets/img/ico/'),
          svg: path.resolve(this.dir, 'src/assets/img/svg/'),
        },
        static: path.resolve(this.dir, 'src/assets/static/'), 
        libs: path.resolve(this.dir, 'src/assets/libs/'), 
        fonts: path.resolve(this.dir, 'src/assets/fonts/'),
      },
      template: {
        path: path.resolve(this.dir, 'src/template/'),
        pages: path.resolve(this.dir, 'src/template/pages/'),
        components: path.resolve(this.dir, 'src/template/components/'),
        module: path.resolve(this.dir, 'src/template/modules/'),
        layout: path.resolve(this.dir, 'src/template/layout/'),
      },
      vue: path.resolve(this.dir, 'src/vue/'),
    } 
  }
  getPages() {
    return fs.readdirSync(this.src.template.pages).filter(fileName => fileName.endsWith('.pug'));
  }
}

module.exports = new PATHS()

