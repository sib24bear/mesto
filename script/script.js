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
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const editBtn = page.querySelector('.button_type_edit-profile');
const addCardBtn = page.querySelector('.button_type_add-card');
const galleryItemTemplate = page.querySelector('#gallery__item_template').content;
const galleryList = page.querySelector('.gallery__list');
const editProfilePopup = page.querySelector('.popup_edit-profile');
const editProfileClosePopupBtn = editProfilePopup.querySelector('.button_type_close-popup');
const editProfilePopupForm = editProfilePopup.querySelector('.edit-form');
const formInputName = editProfilePopupForm.querySelector('.form__input_name');
const formInputAbout = editProfilePopupForm.querySelector('.form__input_about');
const addPlaceCardPopup = page.querySelector('.popup_add-place');
const addPlaceCardClosePopupBtn = addPlaceCardPopup.querySelector('.button_type_close-popup');
const addPlaceCardPopupForm = addPlaceCardPopup.querySelector('.addplace-form');
const formInputPlaceName = addPlaceCardPopup.querySelector('.form__input_place-name');
const formInputPlaceLink = addPlaceCardPopup.querySelector('.form__input_place-link');
const openImagePopup = page.querySelector('.image-popup');
const closeImagePopupBtn = openImagePopup.querySelector('.button_type_close-popup');
const imagePopupTitle = openImagePopup.querySelector('.image-popup__title');
const imagePopupImg = openImagePopup.querySelector('.image-popup__img');

function createCard(placeTitle, placeURL) {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.place-card__title').textContent = placeTitle;
  galleryItem.querySelector('.place-card__img').setAttribute('src', placeURL);
  galleryItem.querySelector('.place-card__img').setAttribute('alt', placeTitle);

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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupHandler(evt) {
  closePopup(evt.target.closest('.popup'));
}

function openImage(placeName, placeLink) {
  openPopap(openImagePopup);
  
  imagePopupTitle.textContent = placeName;
  imagePopupImg.setAttribute('src', placeLink);
  imagePopupImg.setAttribute('alt', placeName);
}

function submitEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = formInputName.value;
  profileDescription.textContent = formInputAbout.value;

  closePopup(editProfilePopup);
}

function editProfile() {
  openPopap(editProfilePopup);

  formInputName.value = profileName.textContent;
  formInputAbout.value = profileDescription.textContent;
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();

  galleryList.prepend(createCard(formInputPlaceName.value, formInputPlaceLink.value));
  
  closePopup(addPlaceCardPopup);
}

function addPlaceCard() {
  openPopap(addPlaceCardPopup);
  formInputPlaceName.value = '';
  formInputPlaceLink.value = '';
}

initialCards.forEach(el => galleryList.append(createCard(el.name, el.link)));

editBtn.addEventListener('click', editProfile);
editProfileClosePopupBtn.addEventListener('click', closePopupHandler);
editProfilePopupForm.addEventListener('submit', submitEditForm);
addCardBtn.addEventListener('click', addPlaceCard);
addPlaceCardClosePopupBtn.addEventListener('click', closePopupHandler);
addPlaceCardPopupForm.addEventListener('submit', submitAddPlaceForm);
closeImagePopupBtn.addEventListener('click', closePopupHandler);