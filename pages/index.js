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
const editProfilePopupForm = editProfilePopup.querySelector('.edit-form');
const formInputName = editProfilePopupForm.querySelector('.form__input_name');
const formInputAbout = editProfilePopupForm.querySelector('.form__input_about');
const addPlaceCardPopup = page.querySelector('.popup_add-place');
const addPlaceCardPopupForm = addPlaceCardPopup.querySelector('.addplace-form');
const formInputPlaceName = addPlaceCardPopup.querySelector('.form__input_place-name');
const formInputPlaceLink = addPlaceCardPopup.querySelector('.form__input_place-link');
const openImagePopup = page.querySelector('.image-popup');
const imagePopupTitle = openImagePopup.querySelector('.image-popup__title');
const imagePopupImg = openImagePopup.querySelector('.image-popup__img');
const popups = document.querySelectorAll('.popup');
const formValidators = {};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(page.querySelector('.popup_opened'));
  }
}

function handleCardClick(name, link) {
  imagePopupTitle.textContent = name;
  imagePopupImg.src = link;
  imagePopupImg.alt = name;

  openPopup(openImagePopup);
}

function createCard(card) {
  const newCard = new Card(card, '#gallery__item_template', handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configValidation);

function editProfile() {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileDescription.textContent;

  formValidators['editProfileForm'].setInitialState();
  
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
  
  formValidators['addPlaceForm'].setInitialState();
  
  openPopup(addPlaceCardPopup);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();

  const newCardData = {
    name: formInputPlaceName.value,
    link: formInputPlaceLink.value
  };
  const cardElement = createCard(newCardData);

  galleryList.prepend(cardElement);
  
  closePopup(addPlaceCardPopup);
}

editBtn.addEventListener('click', editProfile);
editProfilePopupForm.addEventListener('submit', submitEditForm);
addCardBtn.addEventListener('click', handleOpenPopupAddedNewCard);
addPlaceCardPopupForm.addEventListener('submit', submitAddPlaceForm);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
      }
  })
})

initialCards.forEach(el => {
  const cardElement = createCard(el);

  galleryList.append(cardElement);
});