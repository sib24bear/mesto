import openPopup from '../pages/index.js';
import {openImagePopup, imagePopupTitle, imagePopupImg} from '../pages/index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._placeTitle = data.name;
    this._placeLink = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place-card__title').textContent = this._placeTitle;
    this._element.querySelector('.place-card__img').src = this._placeLink;
    this._element.querySelector('.place-card__img').alt = this._placeTitle;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.button_type_add-like').addEventListener('click', () => {
      this._handleLikeCardClick();
    });

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
    });

    this._element.querySelector('.place-card__img').addEventListener('click', () => {
      this._handleOpenPlaceImageClick();
    });
  }

  _handleLikeCardClick() {
    this._element.querySelector('.button_type_add-like').classList.toggle('place-card__button_active');
  }

  _handleDeleteCardClick() {
    this._element.closest('.gallery__item').remove();
  }

  _handleOpenPlaceImageClick() {
    openPopup(openImagePopup);

    imagePopupTitle.textContent = this._element.querySelector('.place-card__title').textContent;
    imagePopupImg.src = this._element.querySelector('.place-card__img').src;
    imagePopupImg.alt = this._element.querySelector('.place-card__title').textContent;
  }
}