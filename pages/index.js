import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, configValidation} from '../utils/constants.js'

const page = document.querySelector('.page');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const editBtn = page.querySelector('.button_type_edit-profile');
const addCardBtn = page.querySelector('.button_type_add-card');
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
export const openImagePopup = page.querySelector('.image-popup');
export const imagePopupTitle = openImagePopup.querySelector('.image-popup__title');
export const imagePopupImg = openImagePopup.querySelector('.image-popup__img');
const closeImagePopupBtn = openImagePopup.querySelector('.button_type_close-popup');

export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function closePopupHandler(evt) {
  closePopup(evt.target.closest('.popup'));
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(page.querySelector('.popup_opened'));
  }
}

function overlayhandler(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopupHandler(evt);
  }
}

function editProfile() {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileDescription.textContent;

  const validate = new FormValidator(configValidation, '.edit-form');

  validate.setInitialState();
  validate.enableValidation();
  
  openPopup(editProfilePopup);
}

function submitEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = formInputName.value;
  profileDescription.textContent = formInputAbout.value;

  closePopup(editProfilePopup);
}

function handleOpenPopupAddedNewCard() {
  addPlaceCardPopupForm.reset();
  
  const validate = new FormValidator(configValidation, '.addplace-form');

  validate.setInitialState();
  validate.enableValidation();
  
  openPopup(addPlaceCardPopup);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();

  const newCardData = {
    name: formInputPlaceName.value,
    link: formInputPlaceLink.value
  };

  const newCard = new Card(newCardData, '#gallery__item_template');
  const cardElement = newCard.generateCard();

  galleryList.prepend(cardElement);
  
  closePopup(addPlaceCardPopup);
}

editBtn.addEventListener('click', editProfile);
editProfileClosePopupBtn.addEventListener('click', closePopupHandler);
editProfilePopupForm.addEventListener('submit', submitEditForm);
addCardBtn.addEventListener('click', handleOpenPopupAddedNewCard);
addPlaceCardClosePopupBtn.addEventListener('click', closePopupHandler);
addPlaceCardPopupForm.addEventListener('submit', submitAddPlaceForm);
closeImagePopupBtn.addEventListener('click', closePopupHandler);
document.addEventListener('click', overlayhandler);

initialCards.forEach(el => {
  const card = new Card(el, '#gallery__item_template');
  const cardElement = card.generateCard();

  galleryList.append(cardElement);
});