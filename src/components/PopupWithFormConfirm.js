import Popup from './Popup.js';

export default class PopupWithFormConfirm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitForm = callbackSubmitForm;
    this._cardId = null;
    this._cardElement = null;
  }

  getCarId(cardId, cardelement) {
    this._cardId = cardId;
    this._cardElement = cardelement;
  }

  setCardElement() {
    return this._cardElement;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._cardId);
    });
  }
}