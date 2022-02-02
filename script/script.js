const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page');
const editBtn = page.querySelector('.button_type_edit-profile');
const addCardBtn = page.querySelector('.button_type_add-card');
const galleryList = page.querySelector('.gallery__list');
const editProfilePopup = page.querySelector('.popup_edit-profile');
const addPlaceCardPopup = page.querySelector('.popup_add-place');
const openImagePopup = page.querySelector('.image-popup');

function createCard(placeTitle, placeURL) {
  const galleryItemTemplate = document.querySelector('#gallery__item_template').content;
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.place-card__title').textContent = placeTitle;
  galleryItem.querySelector('.place-card__img').setAttribute('src', placeURL);
  galleryItem.querySelector('.place-card__img').setAttribute('aria-label', placeTitle);

  addPlaceCardListeners(galleryItem);

  return galleryItem;
}

function addLikePlaceCardHandler(evt) {
  evt.target.classList.toggle('place-card__button_active');
}

function deletePlaceCardHandler(evt) {
  evt.target.closest('.gallery__item').remove();
}

function openImagePlaceCardHandler(evt) {
  const placeName = evt.target.closest('.gallery__item').querySelector('.place-card__title').textContent;
  const placeLink = evt.target.closest('.gallery__item').querySelector('.place-card__img').getAttribute('src');
  openImage(placeName, placeLink);
}

function addPlaceCardListeners(el) {
  el.querySelector('.button_type_add-like').addEventListener('click', addLikePlaceCardHandler);
  el.querySelector('.place-card__img').addEventListener('click', openImagePlaceCardHandler);
  el.querySelector('.button_type_delete').addEventListener('click', deletePlaceCardHandler);
}

function openPopap(popup) {
  popup.classList.add('popup_opened');
}

function closePopap(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function openImage(placeName, placeLink) {
  openPopap(openImagePopup);
  
  openImagePopup.querySelector('.image-popup__title').textContent = placeName;
  openImagePopup.querySelector('.image-popup__img').setAttribute('src', placeLink);
  openImagePopup.querySelector('.image-popup__img').setAttribute('aria-label', placeName);
  openImagePopup.querySelector('.button_type_close-popup').addEventListener('click', closePopap);
}

function submitEditForm(evt) {
  evt.preventDefault();

  page.querySelector('.profile__name').textContent = editProfilePopup.querySelector('.form__input_name').value;
  page.querySelector('.profile__description').textContent = editProfilePopup.querySelector('.form__input_about').value;

  evt.target.closest('.popup').classList.remove('popup_opened');
}

function editProfile() {
  openPopap(editProfilePopup);

  editProfilePopup.querySelector('.form__input_name').value = page.querySelector('.profile__name').textContent;
  editProfilePopup.querySelector('.form__input_about').value = page.querySelector('.profile__description').textContent;

  editProfilePopup.querySelector('.form').addEventListener('submit', submitEditForm);
  editProfilePopup.querySelector('.button_type_close-popup').addEventListener('click', closePopap);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();

  const placeTitle = addPlaceCardPopup.querySelector('.form__input_place-name').value;
  const placeLink = addPlaceCardPopup.querySelector('.form__input_place-link').value;

  galleryList.prepend(createCard(placeTitle, placeLink));
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function addPlaceCard() {
  openPopap(addPlaceCardPopup);
  addPlaceCardPopup.querySelector('.form__input_place-name').value = '';
  addPlaceCardPopup.querySelector('.form__input_place-link').value = '';
  addPlaceCardPopup.querySelector('.form').addEventListener('submit', submitAddPlaceForm);
  addPlaceCardPopup.querySelector('.button_type_close-popup').addEventListener('click', closePopap);
}

initialCards.forEach(el => galleryList.append(createCard(el.name, el.link)));

editBtn.addEventListener('click', editProfile);
addCardBtn.addEventListener('click', addPlaceCard);