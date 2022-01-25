'use strict';

let page = document.querySelector('.page');
let editBtn = page.querySelector('.button_type_edit-profile');

function addPopup() {
  page.insertAdjacentHTML('beforeend', `
    <div class="popup">
      <div class="popup__container">
          <h4 class="popup__title">Редактировать профиль</h4>
          <button class="button popup__close-btn button_type_close-popup" type="button" title="Закрыть окно" aria-label="Закрыть окно"></button>
          <form class="form">
              <label class="form__label">
                <input class="form__input" name="userName" type="text" aria-label="Напишите имя">
              </label>
              <label class="form__label">
                <input class="form__input" name="userAbout" type="text" aria-label="Напишите о себе">
              </label>
            <button class="button form__submit-btn" type="submit">Сохранить</button>
          </form>
      </div>
    </div>
  `);
}

function closePopup(popup, page) {
  popup.classList.remove('popup_opened');
  page.lastChild.remove();
}

editBtn.addEventListener('click', function () {

  addPopup();

  let profileName = page.querySelector('.profile__name');
  let profileDescription = page.querySelector('.profile__description');
  let popup = page.querySelector('.popup');
  let closePopupBtn = popup.querySelector('.popup__close-btn');
  let form = popup.querySelector('.form');
  let formInputUserName = form.querySelector('[name=userName]');
  let formInputUserDescription = form.querySelector('[name=userAbout]');
  let formSubmitBtn = form.querySelector('.form__submit-btn');
  
  formInputUserName.value = profileName.textContent;
  formInputUserDescription.value = profileDescription.textContent;
  
  popup.classList.add('popup_opened');

  formSubmitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    profileName.textContent = formInputUserName.value;
    profileDescription.textContent = formInputUserDescription.value;

    closePopup(popup, page);
  });

  closePopupBtn.addEventListener('click', function () {
    closePopup(popup, page);
  });
});
