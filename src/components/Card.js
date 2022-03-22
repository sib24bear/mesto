export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._placeTitle = data.name;
    this._placeLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._placeCardTitle = this._element.querySelector('.place-card__title');
    this._placeCardImg = this._element.querySelector('.place-card__img');
    this._placeCardLikeBtn = this._element.querySelector('.button_type_add-like');
    this._placeCardDeleteBtn = this._element.querySelector('.button_type_delete');

    this._setEventListeners();

    this._placeCardTitle.textContent = this._placeTitle;
    this._placeCardImg.src = this._placeLink;
    this._placeCardImg.alt = this._placeTitle;

    return this._element;
  }

  _setEventListeners() {
    this._placeCardLikeBtn.addEventListener('click', () => {
      this._handleLikeCardClick();
    });

    this._placeCardDeleteBtn.addEventListener('click', () => {
      this._handleDeleteCardClick();
    });

    this._placeCardImg.addEventListener('click', () => {
      this._handleCardClick(this._placeTitle, this._placeLink);
    });
  }

  _handleLikeCardClick() {
    this._placeCardLikeBtn.classList.toggle('place-card__button_active');
  }

  _handleDeleteCardClick() {
    this._element.closest('.gallery__item').remove();
  }
}