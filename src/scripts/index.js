import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLikeCard } from "../components/card.js";
import { showPopup, closePopup, closePopupWithEsc, closePopupWithOverlay, closePopupWithButton } from "../components/modal.js";

const profileEditForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const inputName = profileEditForm.elements.name;
const inputDescription = profileEditForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputCardName = document.forms["new-place"]["place-name"];
const inputCardLink = newCardForm.elements.link;
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__caption");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");

// @todo: Темплейт карточки
export const cardTemplate = document.getElementById("card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");


// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
  cardsList.append(createCard(elem, deleteCard, toggleLikeCard, cardImageScale));
});

const popupProfileEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
	showPopup(popupProfileEdit);
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfileEdit);
};

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", function () {
  showPopup(popupNewPlace);
});

function addNewCard(card) {
  cardsList.prepend(card);
};

newCardForm.addEventListener("submit", cardFormFn);

function cardFormFn(evt) {
  evt.preventDefault();
  const newAddedCard = createCard(
    {
      name: inputCardName.value,
      link: inputCardLink.value,
    },
    deleteCard,
    toggleLikeCard,
    cardImageScale
  );
  addNewCard(newAddedCard);
  newCardForm.reset();
  closePopup(popupNewPlace);
};


function cardImageScale(evt) {
  showPopup(popupTypeImage);
  popupImage.src = evt.target.closest(".card__image").src;
  popupImage.alt = evt.target.closest(".card__image").alt;
  popupImageText.textContent = evt.target.closest(".card__image").alt;
};
