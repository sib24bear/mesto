const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${config.errorIdSuffix}`);
  inputElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${config.errorIdSuffix}`);
  inputElement.classList.remove(config.errorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setInitialState = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitBtnElement = formElement.querySelector(config.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(config, formElement, inputElement);
  });
  
  toggleButtonState(config, inputList, submitBtnElement);
};


const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitBtnElement = formElement.querySelector(config.submitButtonSelector);
  
  toggleButtonState(config, inputList, submitBtnElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, submitBtnElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });

    setEventListeners(config, formElement);
  });
};

enableValidation(configValidation);