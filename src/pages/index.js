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
let userId;

function handleCardClick(title, link) {
  imgPopup.open(title, link);
}

function handleDeleteCardClick(cardId, cardElement) {
  popupDeleteCardConfirmForm.getCarId(cardId, cardElement);
  popupDeleteCardConfirmForm.open();
}

function handleLikeCardClick(cardId, setLike, checkCardsIsLiked) {
  if (checkCardsIsLiked) {
    api.deleteLikeCard(cardId)
    .then((data) => {
      setLike.textContent = data.likes.length;
    })
  } else {
    api.putLikeCard(cardId)
    .then((data) => {
      setLike.textContent = data.likes.length;
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'aa08a5c7-e07f-468e-8cd4-6dfa046b35da',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({name: userData.name, about: userData.about, imageLink: userData.avatar});
    cardsList.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__description',
  userProfileImageSelector: '.profile__avatar-img'
});

const cardsList = new Section({
    renderer: (card) => {
      const newCard = new Card(card, userId, '#gallery__item_template', handleCardClick, handleDeleteCardClick, handleLikeCardClick);
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

const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  (item) => {
    userInfo.setUserInfo({name: item.userName, about: item.userAbout});
    api.setUserInfo(item.userName, item.userAbout)
      .then((data) => {
        userInfo.setUserInfo({name: data.name, about: data.about, imageLink: data.avatar});
        popupEditProfileForm.close();
      })
      .finally(() => {
        popupEditProfileForm.save('Сохранить');
      })
      .catch(err => {
        console.log(err);
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
        popupAddedNewCardForm.close();
      })
      .finally(() => {
        popupAddedNewCardForm.save('Создать');
      })
      .catch(err => {
        console.log(err);
      });
  }
);

popupAddedNewCardForm.setEventListeners();

const imgPopup = new PopupWithImage('.image-popup');

imgPopup.setEventListeners();

const popupDeleteCardConfirmForm = new PopupWithFormConfirm(
  '.confirm-popup',
  (item) => {
    api.deleteUserCard(item)
    .then(() => {
      popupDeleteCardConfirmForm.close();
    })
    .finally(() => {
      cardsList.deleteItem(popupDeleteCardConfirmForm.setCardElement());
    })
    .catch(err => {
      console.log(err);
    });
  }
);

popupDeleteCardConfirmForm.setEventListeners();

const popupEditAvatarForm = new PopupWithForm(
  '.popup_profile-photo',
  (item) => {
    api.setUserAvatar(item.avatar)
      .then((data) => {
        userInfo.setUserInfo({name: data.name, about: data.about, imageLink: data.avatar});
        popupEditAvatarForm.close();
      })
      .finally(() => {
        popupEditAvatarForm.save('Обновить');
      })
      .catch(err => {
        console.log(err);
      });
  }
);

popupEditAvatarForm.setEventListeners();

function handleOpenPopupEditProfile() {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  formValidators['editProfileForm'].setInitialState();
  popupEditProfileForm.open();
}

function handleOpenPopupAddedNewCard() {
  formValidators['addPlaceForm'].setInitialState();
  popupAddedNewCardForm.open();
}

function handleOpenPopupEditAvatar() {
  formValidators['editAvatar'].setInitialState();
  popupEditAvatarForm.open();
}

editProfileBtn.addEventListener('click', handleOpenPopupEditProfile);
addPlaceCardBtn.addEventListener('click', handleOpenPopupAddedNewCard);
editAvatar.addEventListener('click', handleOpenPopupEditAvatar);