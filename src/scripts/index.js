import "../pages/index.css";
import { createCard } from "../components/card";
import { deleteCard, likeCard } from "../components/card";
import {
  openPopup,
  closePopup,
} from "../components/modal";
import {
  clearValidation,
  enableValidation,
} from "./validation";
import {
	getProfileRequest,
	getCardsRequest,
	profilePatchRequest,
	avatarPatchRequest,
	postCardRequest,
} from "./api"
import { Promise } from "core-js";

// @todo: Темплейт карточки
export const cardTemplate = document.getElementById("card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");


const popupEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const editForm = document.forms["edit-profile"];
const editNameInput = editForm.elements.name;
const editJobInput = editForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const newCardForm = document.forms["new-place"];
const newCardName = newCardForm.elements["place-name"];
const newCardLink = newCardForm.elements.link;
const popupScaleImage = document.querySelector(".popup__image");
const popupImageDescription = document.querySelector(".popup__caption");
const popupBigImage = document.querySelector(".popup_type_image");
const profileAvatar = document.querySelector(".profile__image");
const avatarChangeButton = document.querySelector(".profile__image_button");
const avatarPopup = document.querySelector(".popup__avatar-change");
const avatarForm = document.forms.avatar;
const avatarInput = avatarForm.elements.link;
const avatarButton = avatarForm.elements.avaSave

editButton.addEventListener("click", function () {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileJob.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(popupEdit);
});

profileAddButton.addEventListener("click", function () {
  clearValidation(newCardForm, validationConfig);
  openPopup(popupNewCard);
	newCardName.value = null;
	newCardLink.value = null
});

avatarChangeButton.addEventListener("click", function () {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
	avatarInput.value = ''
	if (avatarInput.value === '') {
		avatarButton.classList.add('popup__button_disabled')
	} else {
		avatarButton.classList.remove('popup__button_disabled')
	}
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = avatarForm.elements.avaSave;
  button.textContent = "Сохранение...";
  avatarPatchRequest(avatarInput.value)
    .then(() => {
      profileAvatar.style.backgroundImage = "url(" + avatarInput.value + ")";
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function  handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = editForm.elements.profileSave;
  button.textContent = "Сохранение...";
  profilePatchRequest(editNameInput, editJobInput)
    .then(() => {
      profileTitle.textContent = editNameInput.value;
      profileJob.textContent = editJobInput.value;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function addNewCard(card) {
  placesList.prepend(card);
}

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const button = newCardForm.elements.cardSave;
  button.textContent = "Сохранение...";
  const newCardObj = {
    name: newCardName.value,
    link: newCardLink.value,
    likes: [],
  };
  postCardRequest(newCardObj)
    .then((res) => {
      const ownerId = res.owner._id;
      const cardInfo = createCard(
        res,
        deleteCard,
        likeCard,
        scaleCardImage,
        ownerId
      );
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closePopup(popupNewCard);
      addNewCard(cardInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
});

function scaleCardImage(evt) {
  popupScaleImage.src = evt.target.src;
  popupImageDescription.textContent = evt.target.alt;
  openPopup(popupBigImage);
}
//----------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error_active",
};

enableValidation(validationConfig);


Promise.all([getProfileRequest(), getCardsRequest()])
.then((data) => {
	const userData = data[0];
	const cardsData = data[1];
	const ownerId = userData._id;
	profileAvatar.style.backgroundImage = "url(" + userData.avatar + ")";
	profileTitle.textContent = userData.name;
	profileJob.textContent = userData.about;
	cardsData.forEach(function (el) {
		placesList.append(
			createCard(el, deleteCard, likeCard, scaleCardImage, ownerId)
		);
	});
})
.catch((err) => {
	console.log("Ошибка. Запрос не выполнен: ", err);
});
