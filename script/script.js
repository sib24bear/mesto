let page = document.querySelector('.page');
let editBtn = page.querySelector('.button_type_edit-profile');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let popup = page.querySelector('.popup');
let closePopupBtn = popup.querySelector('.popup__close-btn');
let form = popup.querySelector('.form');
let formInputUserName = form.querySelector('.form__input_user_name');
let formInputUserDescription = form.querySelector('.form__input_user_about');

function openPopup() {
  popup.classList.add('popup_opened');
  formInputUserName.value = profileName.textContent;
  formInputUserDescription.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formInputUserName.value;
  profileDescription.textContent = formInputUserDescription.value;
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
form.addEventListener('submit', formSubmitHandler);
closePopupBtn.addEventListener('click', closePopup);
