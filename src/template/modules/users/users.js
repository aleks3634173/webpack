
export default class ProfileWidget {
  constructor(modal) {
    this.modalObj = modal;
    this.LOADER_ACTIVE = 'active';
    this.URL_API = 'https://randomuser.me/api/?results=6';
    this.NAME_MODAL = 'user';
    this.profileList = document.querySelector('.profile__list');
    this.loader = document.querySelector('.profile__loader');
    this.buttonLoad = document.querySelector('.profile__button');
    this.newProfile = [];
    this.profileCash = [];
    this.init();
    
  }

  init() {
    if (!this.profileList) return;
    this.getUsers();
    this.addLoader()
    if (this.buttonLoad)
      this.setEvent()
  }
  
  getUsers() {
    fetch(this.URL_API)
      .then(this.handleErrors)
      .then(this.parseJSON)
      .then((data) => {
        this.updateUser(data);
        this.removeLoader();
      })
      .catch((error) => {
        console.log(error);
        this.removeLoader();
      })
  }
  
  updateUser(data) {
    this.newProfile = data;
    this.addProfileListEl();
  }
  
  addProfileListEl() {
    const list = document.createDocumentFragment();
    this.newProfile.forEach((item, index) =>{
      const block = this.createElement('div', '', ['profile__item', 'profile-block']);
      const imgWrap = this.createElement('div','', ['profile-block__img']);
      const img = document.createElement('img');
      img.src = item.picture.large;
      const name = this.createElement('div', item.name.first, ['profile-block__name']);
      
      imgWrap.appendChild(img);
      block.appendChild(imgWrap);
      block.appendChild(name);
      
      list.appendChild(block);
      block.addEventListener('click', ()=>{
        this.setContentModal(item);
      })
    })
    this.profileList.appendChild(list);
  }
  
  createElement(tag, content, className) {
    const el = document.createElement(tag);
    el.textContent = content;
    el.classList.add(...className);
    return el;
  }
  
  setEvent() {
    this.buttonLoad.addEventListener('click', () => {
      
      this.buttonLoad.classList.add(this.LOADER_ACTIVE);
      this.getUsers()
    })
  }
  
  parseJSON(response) {
    // parse to JSON
    return response.json().then(function(data) {
      return data.results;
    });
  }
  
  handleErrors(response) {
    if(!response.ok) {
      console.log(response.status);
    }
    return response;
  }
  
  removeLoader() {
    this.loader.classList.remove(this.LOADER_ACTIVE);
    this.buttonLoad.classList.remove(this.LOADER_ACTIVE);
  }
  addLoader() {
    this.loader.classList.add(this.LOADER_ACTIVE);
  }
  
  setContentModal(item) {
    this.modalObj.openModal(this.NAME_MODAL);
    const modal = this.modalObj.getModal(this.NAME_MODAL);
    const name = modal.querySelector('.modal-user__fullname');
    name.textContent = item.name.first + ' ' + item.name.last;
    const gender = modal.querySelector('.modal-user__gender');
    gender.textContent = item.gender;
    const email = modal.querySelector('.modal-user__value.email');
    email.textContent = item.email;
    const tel = modal.querySelector('.modal-user__value.tel');
    tel.textContent = item.phone;
    const country = modal.querySelector('.modal-user__value.country');
    country.textContent = item.location.country;
    const city = modal.querySelector('.modal-user__value.city');
    city.textContent = item.location.city;
    const img = modal.querySelector('.modal-user__img img');
    img.src = item.picture.large;
  }
  
}
