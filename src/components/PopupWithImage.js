import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.image-popup__img');
    this._cardTitle = this._popup.querySelector('.image-popup__title');
  }

  open(title, link) {
    super.open();
    this._cardImage.setAttribute(`src`, link);
    this._cardImage.setAttribute(`alt`, title);
    this._cardTitle.textContent = title;
  }
}