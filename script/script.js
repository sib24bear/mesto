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
  const galleryItemPlaceTitle = galleryItem.querySelector('.place-card__title');
  const galleryItemPlaceImg = galleryItem.querySelector('.place-card__img');

  galleryItemPlaceTitle.textContent = placeTitle;
  galleryItemPlaceImg.src = placeURL;
  galleryItemPlaceImg.alt = placeTitle;

  addPlaceCardListeners(galleryItem, placeTitle, placeURL);

  return galleryItem;
}

function addLikePlaceCardHandler(evt) {
  evt.target.classList.toggle('place-card__button_active');
}

function deletePlaceCardHandler(evt) {
  evt.target.closest('.gallery__item').remove();
}

function addPlaceCardListeners(el, placeTitle, placeURL) {
  el.querySelector('.button_type_add-like').addEventListener('click', addLikePlaceCardHandler);
  el.querySelector('.place-card__img').addEventListener('click', function(){
    openImage(placeTitle, placeURL);
  });
  el.querySelector('.button_type_delete').addEventListener('click', deletePlaceCardHandler);
}

function openPopup(popup) {
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

function openImage(placeName, placeLink) {
  openPopup(openImagePopup);
  
  imagePopupTitle.textContent = placeName;
  imagePopupImg.src = placeLink;
  imagePopupImg.alt = placeName;
}

function submitEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = formInputName.value;
  profileDescription.textContent = formInputAbout.value;

  closePopup(editProfilePopup);
}

function editProfile() {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileDescription.textContent;
  
  setInitialState(configValidation, editProfilePopupForm);
  openPopup(editProfilePopup);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();

  galleryList.prepend(createCard(formInputPlaceName.value, formInputPlaceLink.value));
  
  closePopup(addPlaceCardPopup);
}

function handleOpenPopupAddedNewCard() {
  addPlaceCardPopupForm.reset();
  setInitialState(configValidation, addPlaceCardPopupForm);
  openPopup(addPlaceCardPopup);
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

initialCards.forEach(el => galleryList.append(createCard(el.name, el.link)));

editBtn.addEventListener('click', editProfile);
editProfileClosePopupBtn.addEventListener('click', closePopupHandler);
editProfilePopupForm.addEventListener('submit', submitEditForm);
addCardBtn.addEventListener('click', handleOpenPopupAddedNewCard);
addPlaceCardClosePopupBtn.addEventListener('click', closePopupHandler);
addPlaceCardPopupForm.addEventListener('submit', submitAddPlaceForm);
closeImagePopupBtn.addEventListener('click', closePopupHandler);
document.addEventListener('click', overlayhandler);