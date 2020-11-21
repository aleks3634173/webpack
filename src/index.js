// import JS file
import '_js/index.js'

// import SASS file
import '_sass/index.sass'

// import svg
requireAll(require.context('./assets/img/svg/', true, /\.svg$/));
// import image
requireAll(require.context('./assets/img/content/', true, /\.(jpe?g|png|gif|svg)$/));
requireAll(require.context('./assets/img/general/', true, /\.(jpe?g|png|gif|svg)$/));

function requireAll (r) {
  r.keys().forEach(r);
}