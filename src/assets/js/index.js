import Modal from '_module/modal/modal'
import ProfileWidget from '_module/users/users'


document.addEventListener("DOMContentLoaded", function(event) {
  const modal = new Modal
  new ProfileWidget(modal)
});




// require module
// require('./module/example.js');