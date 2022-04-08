export default class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleDeleteCardClick, handleLikeCardClick) {
    this._placeTitle = data.name;
    this._placeLink = data.link;
    this._placeLike = data.likes.length;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardsLikes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeCardClick = handleLikeCardClick;
    this._element = this._getTemplate();
    this._placeCardTitle = this._element.querySelector('.place-card__title');
    this._placeCardImg = this._element.querySelector('.place-card__img');
    this._placeCardLikeBtn = this._element.querySelector('.button_type_add-like');
    this._placeCardLikeCounter = this._element.querySelector('.place-card__like-counter');
    this._placeCardDeleteBtn = this._element.querySelector('.button_type_delete');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeBtn() {
    this._placeCardLikeBtn.classList.toggle('place-card__button_active');
  }

  _checkCardIsLiked() {
    this._cardsLikes.forEach(item => {
      if (item._id === this._userId){
        this._toggleLikeBtn();
      }
    });
  }

  generateCard() {
    this._setEventListeners();

    this._placeCardTitle.textContent = this._placeTitle;
    this._placeCardImg.src = this._placeLink;
    this._placeCardImg.alt = this._placeTitle;
    
    if (!(this._userId === this._ownerId)) {
      this._placeCardDeleteBtn.remove();
    }

    if (this._placeLike) {
      this._checkCardIsLiked();
      this._placeCardLikeCounter.textContent = this._placeLike;
    }

    return this._element;
  }

  _setEventListeners() {
    this._placeCardLikeBtn.addEventListener('click', () => {
      this._handleLikeCardClick(
        this._cardId, 
        this._placeCardLikeCounter, 
        this._placeCardLikeBtn.classList.contains('place-card__button_active'));
      this._toggleLikeBtn();
    });

    this._placeCardDeleteBtn.addEventListener('click', () => {
      this._handleDeleteCardClick(this._cardId, this._element);
    });

    this._placeCardImg.addEventListener('click', () => {
      this._handleCardClick(this._placeTitle, this._placeLink);
    });
  }
}