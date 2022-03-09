export default class FormValidator {
  constructor(config, formSelector) {
    this._form = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._errorIdSuffix = config.errorIdSuffix;
    this._formSelector = formSelector;
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}${this._errorIdSuffix}`);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}${this._errorIdSuffix}`);
    inputElement.classList.remove(this._errorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._element.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    } else {
      this._element.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _getFormElement() {
    const formElement = document.querySelector(this._formSelector);

    return formElement;
  }

  setInitialState() {
    this._element = this._getFormElement();
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    
    this._toggleButtonState();
  };

  enableValidation() {
    this._element = this._getFormElement();
    this._setEventListeners();
  }
}