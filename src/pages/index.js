import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithFormConfirm from '../components/PopupWithFormConfirm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {configValidation} from '../utils/constants.js';

const page = document.querySelector('.page');
const editProfileBtn = page.querySelector('.button_type_edit-profile');
const editAvatar = page.querySelector('.profile__avatar');
const addPlaceCardBtn = page.querySelector('.button_type_add-card');
const formValidators = {};

const imgPopup = new PopupWithImage('.image-popup');

imgPopup.setEventListeners();

function handleCardClick(title, link) {
  imgPopup.open(title, link);
}

function handleDeleteCardClick(cardId, cardElement) {
  popupDeleteCardConfirmForm.getCarId(cardId, cardElement);
  popupDeleteCardConfirmForm.open();
}

function handleLikeCardClick(cardId, LikeCounter, checkCardsIsLiked) {
  if (checkCardsIsLiked) {
    api.deleteLikeCard(cardId)
    .then((data) => {
      cardsList.setLike(data, LikeCounter);
    })
  } else {
    api.putLikeCard(cardId)
    .then((data) => {
      cardsList.setLike(data, LikeCounter);
    })
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-39', 'aa08a5c7-e07f-468e-8cd4-6dfa046b35da');

api.getInitialCards()
  .then((data) => {
    cardsList.renderItems(data);
  });

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({name: data.name, about: data.about, imageLink: data.avatar});
    userInfo.setUserId(data._id);
  });

const cardsList = new Section({
    renderer: (card) => {
      const newCard = new Card(card, userInfo.getUserId(), '#gallery__item_template', handleCardClick, handleDeleteCardClick, handleLikeCardClick);
      const cardElement = newCard.generateCard();
      return cardElement;
    }
  },
  '.gallery__list'
);

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
  userAboutSelector: '.profile__description',
  userProfileImageSelector: '.profile__avatar-img'
})

const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  (item) => {
    userInfo.setUserInfo({name: item.userName, about: item.userAbout});
    api.setUserInfo(item.userName, item.userAbout)
      .then((data) => {
        userInfo.setUserInfo({name: data.name, about: data.about, imageLink: data.avatar})
      })
      .finally(() => {
        popupEditProfileForm.save('Сохранить...');
        popupEditProfileForm.close();
      });
  }
);

popupEditProfileForm.setEventListeners();

const popupAddedNewCardForm = new PopupWithForm(
  '.popup_add-place',
  (item) => {
    api.setNewUserCard(item.name, item.link)
      .then((data) => {
        cardsList.prependItem(data);
      })
      .finally(() => {
        popupAddedNewCardForm.save('Сохранить...');
        popupAddedNewCardForm.close();
      });
  }
);

popupAddedNewCardForm.setEventListeners();

const popupDeleteCardConfirmForm = new PopupWithFormConfirm(
  '.confirm-popup',
  (item) => {
    api.deleteUserCard(item)
    .finally(() => {
      cardsList.deleteItem(popupDeleteCardConfirmForm.setCardElement());
      popupDeleteCardConfirmForm.close();
    });
  }
);

popupDeleteCardConfirmForm.setEventListeners();

const popupEditAvatarForm = new PopupWithForm(
  '.popup_profile-photo',
  (item) => {
    api.setUserAvatar(item.link)
      .then((data) => {
        userInfo.setUserInfo({name: data.name, about: data.about, imageLink: data.avatar});
      })
      .finally(() => {
        popupEditAvatarForm.save('Сохранить...');
        popupEditAvatarForm.close();
      });
  }
);

popupEditAvatarForm.setEventListeners();

function handleOpenPopupEditProfile() {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  formValidators['editProfileForm'].setInitialState();
  popupEditProfileForm.save('Сохранить');
  popupEditProfileForm.open();
}

function handleOpenPopupAddedNewCard() {
  formValidators['addPlaceForm'].setInitialState();
  popupAddedNewCardForm.save('Создать');
  popupAddedNewCardForm.open();
}

function handleOpenPopupEditAvatar() {
  formValidators['editAvatar'].setInitialState();
  popupEditAvatarForm.save('Обновить');
  popupEditAvatarForm.open();
}

editProfileBtn.addEventListener('click', handleOpenPopupEditProfile);
addPlaceCardBtn.addEventListener('click', handleOpenPopupAddedNewCard);
editAvatar.addEventListener('click', handleOpenPopupEditAvatar);