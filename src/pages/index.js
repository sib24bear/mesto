import './index.css'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, configValidation} from '../utils/constants.js'

const page = document.querySelector('.page');
const editProfileBtn = page.querySelector('.button_type_edit-profile');
const addPlaceCardBtn = page.querySelector('.button_type_add-card');
const formValidators = {};

const imgPopup = new PopupWithImage('.image-popup');

imgPopup.setEventListeners();

function handleCardClick(title, link) {
  imgPopup.open(title, link);
}

const cardsList = new Section({
    items: initialCards,
    renderer: (card) => {
      const newCard = new Card(card, '#gallery__item_template', handleCardClick);
      const cardElement = newCard.generateCard();
      return cardElement;
    }
  },
  '.gallery__list'
);

cardsList.renderItems();

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

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__description'
})

const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  (item) => {
    userInfo.setUserInfo({name: item.userName, about: item.userAbout});
    popupEditProfileForm.close();
  }
);

const popupAddedNewCardForm = new PopupWithForm(
  '.popup_add-place',
  (item) => {
    cardsList.prependItem(item);
    popupAddedNewCardForm.close();
  }
);

popupEditProfileForm.setEventListeners();
popupAddedNewCardForm.setEventListeners();

function handleOpenPopupEditProfile() {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  formValidators['editProfileForm'].setInitialState();
  popupEditProfileForm.open();
}

function handleOpenPopupAddedNewCard() {
  formValidators['addPlaceForm'].setInitialState();
  popupAddedNewCardForm.open();
}

editProfileBtn.addEventListener('click', handleOpenPopupEditProfile);
addPlaceCardBtn.addEventListener('click', handleOpenPopupAddedNewCard);