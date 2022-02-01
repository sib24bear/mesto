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
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const galleryList = page.querySelector('.gallery__list');

const makePlaceCard = function (placeTitle, placeURL, arg = true) {
  const galleryItemTemplate = document.querySelector('#gallery__item_template').content;
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.place-card__title').textContent = placeTitle;
  galleryItem.querySelector('.place-card__img').setAttribute('src', placeURL);
  galleryItem.querySelector('.place-card__img').setAttribute('aria-label', placeTitle);
  
  if (arg) {
    galleryList.append(galleryItem);
  } else {
    galleryList.prepend(galleryItem);
  }

  addPlaceCardListeners(galleryItem);
}

const makePopup = function (popupTitle, popupInputTitleNameField, popupInputTitleAdditionalField, popupInputNameAttr, popupInputAdditionalAttr) {
  const popupTemplate = document.querySelector('#popup_template').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);

  popup.querySelector('.popup__title').textContent = popupTitle;

  popup.querySelector('.form__input_field_name').setAttribute('name', popupInputNameAttr);
  popup.querySelector('.form__input_field_name').setAttribute('placeholder', popupInputTitleNameField);
  popup.querySelector('.form__input_field_name').setAttribute('aria-label', popupInputTitleNameField);
  
  popup.querySelector('.form__input_field_additional').setAttribute('name', popupInputAdditionalAttr);
  popup.querySelector('.form__input_field_additional').setAttribute('placeholder', popupInputTitleAdditionalField);
  popup.querySelector('.form__input_field_additional').setAttribute('aria-label', popupInputTitleAdditionalField);

  page.append(popup);
}

const makeImagePopup = function (popupTitle, popupImgUrl) {
  page.insertAdjacentHTML('beforeend', `
    <div class="popup image-popup popup_opened">
      <div class="image-popup__container">
        <img class="image-popup__img" src="${popupImgUrl}" alt="${popupTitle}" >
        <h2 class="image-popup__title">${popupTitle}</h2>
        <button class="button popup__close-btn button_type_close-popup" type="button" title="Закрыть окно" aria-label="Закрыть окно"></button>
      </div>
    </div>`);

  page.querySelector('.popup__close-btn').addEventListener('click', handleClose);
}

const addPlaceCard = function () {
  makePopup('Новое место', 'Название', 'Ссылка на картинку', 'userPlace', 'userPlaceURL');
  const popup = page.querySelector('.popup');
  
  popup.classList.add('popup_opened');
  
  addPopupListeners(popup, false);
}

const editProfile = function () {
  makePopup('Редактировать профиль', 'Напишите имя', 'Напишите о себе', 'userName', 'userAbout');
  const popup = page.querySelector('.popup');

  popup.querySelector('.form__input_field_name').value = profileName.textContent;
  popup.querySelector('.form__input_field_additional').value = profileDescription.textContent;
  popup.classList.add('popup_opened');
  
  addPopupListeners(popup, true);
}

function addPopupListeners(el, arg = true) {
  el.querySelector('.popup__close-btn').addEventListener('click', handleClose);

  if (arg) {
    el.querySelector('.form').addEventListener('submit', editProfileSubmitHandler);
  } else {
    el.querySelector('.form').addEventListener('submit', addPlaceCardSubmitHandler);
  }
}

function addPlaceCardListeners(el) {
  el.querySelector('.button_type_add-like').addEventListener('click', addLikeHandler);
  el.querySelector('.place-card__img').addEventListener('click', openImagePopapHandler);
  el.querySelector('.button_type_delete').addEventListener('click', deleteplaceCardHandler);
}

function handleClose(event) {
  event.target.closest('.popup').remove();
}

function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = evt.target.closest('.popup').querySelector('.form__input_field_name').value;
  profileDescription.textContent = evt.target.closest('.popup').querySelector('.form__input_field_additional').value;
  evt.target.closest('.popup').remove();
}

function addPlaceCardSubmitHandler(evt) {
  evt.preventDefault();
  makePlaceCard(
    evt.target.closest('.popup').querySelector('.form__input_field_name').value,
    evt.target.closest('.popup').querySelector('.form__input_field_additional').value,
    false
  );
  evt.target.closest('.popup').remove();
}

function addLikeHandler(evt) {
  evt.target.classList.toggle('place-card__button_active');
}

function deleteplaceCardHandler(evt) {
  evt.target.closest('.gallery__item').remove();
}

function openImagePopapHandler(evt) {
  makeImagePopup(
    evt.target.closest('.gallery__item').querySelector('.place-card__title').textContent,
    evt.target.closest('.gallery__item').querySelector('.place-card__img').getAttribute('src')
  );
}

initialCards.forEach(el => makePlaceCard(el.name, el.link, true));

editBtn.addEventListener('click', editProfile);
addCardBtn.addEventListener('click', addPlaceCard);