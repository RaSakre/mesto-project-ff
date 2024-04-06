function showError(formElement, inputElement, errorMessage, validationConfig) {
  inputElement.classList.add(validationConfig["inputErrorClass"]);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig["errorClass"]);
}

function hideError(formElement, inputElement, validationConfig) {
  inputElement.classList.remove(validationConfig["inputErrorClass"]);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig["errorClass"]);
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    if (inputElement.classList.contains("popup__input_type_url")) {
      inputElement.setCustomValidity(inputElement.dataset.urlMessage);
    }
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле");
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideError(formElement, inputElement, validationConfig);
  }
}

function setInputListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig["inputSelector"])
  );
  const buttonElem = formElement.querySelector(".popup__button");
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElem, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig["formSelector"])
  );
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setInputListeners(formElement, validationConfig);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElem) {
    return !inputElem.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig["inactiveButtonClass"]);
  } else {
    buttonElement.classList.remove(validationConfig["inactiveButtonClass"]);
  }
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig["inputSelector"])
  );
  inputList.forEach(function (inputElement) {
    hideError(formElement, inputElement, validationConfig);
  });
  const popupCloseSecondButton = document.querySelector(
    ".popup__button_second"
  );
  popupCloseSecondButton.classList.add("popup__button_disabled");
}

export {
  clearValidation,
  enableValidation,
};