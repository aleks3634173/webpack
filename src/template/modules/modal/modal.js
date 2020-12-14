export default class Modal {
  constructor() {
    this.ACTIVE = 'active';
    this.elements = document.querySelectorAll('.modal');
    this.buttonName = 'modal-open';
    if (this.elements) {
      this.page = document.querySelector('.page')
      this.elements.forEach(item => {
        this.init(item);
      })
    }
    this.buttons = document.querySelectorAll('.' + this.buttonName)
    if (this.buttons) {
      this.buttons.forEach((item) => {
        item.addEventListener('click', () =>{
          this.openModal(item.dataset.openModal);
        })
      })
    }
  }
  init(item) {
    const close = item.querySelector('.modal__close');
    close.addEventListener('click', ()=>{
      this.closeModal(item)
    })
    item.addEventListener('click', (e) =>{
      const target = e.target;
      if (target.classList.contains('modal') || target.classList.contains('modal__inner')) {
        this.closeModal(item);
      }
    })
  }
  closeModal(item) {
    item.classList.remove(this.ACTIVE)
  }
  openModal(name) {
    let modal = document.querySelector('#modal-' + name);
    if (!modal) return;
    modal.classList.add(this.ACTIVE);
  }
  
  getModal(name) {
    return document.querySelector('#modal-' + name);
  }
}