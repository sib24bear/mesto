import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(title, link) {
    super.open();
    this._popup.querySelector('.image-popup__img').setAttribute(`src`, link);
    this._popup.querySelector('.image-popup__img').setAttribute(`alt`, title);
    this._popup.querySelector('.image-popup__title').textContent = title;
  }
}