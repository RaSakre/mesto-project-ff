import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCards, deleteCard, cardIsLiked } from "../components/card.js";
import { showPopup, closePopup, closePopupWithEsc, closePopupWithOverlay, closePopupWithButton } from "../components/modal.js";

const form1 = document.forms["edit-profile"];
const form2 = document.forms["new-place"];
const inputName = form1.elements.name;
const inputDescription = form1.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputCardName = document.forms["new-place"]["place-name"];
const inputCardLink = form2.elements.link;
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
  cardsList.append(createCards(elem, deleteCard, cardIsLiked, cardImageScale));
});

const popupProfileEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  showPopup(popupProfileEdit);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
});


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfileEdit);
};

form1.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", function () {
  showPopup(popupNewPlace);
});

function addNewCard(card) {
  cardsList.prepend(card);
};

form2.addEventListener("submit", cardFormFn);

function cardFormFn(evt) {
  evt.preventDefault();
  const newAddedCard = createCards(
    {
      name: inputCardName.value,
      link: inputCardLink.value,
    },
    deleteCard,
    cardIsLiked,
    cardImageScale
  );
  addNewCard(newAddedCard);
  form2.reset();
  closePopup(popupNewPlace);
};


function cardImageScale(evt) {
  showPopup(popupTypeImage);
  popupImage.src = evt.target.closest(".card__image").src;
  popupImage.alt = evt.target.closest(".card__image").alt;
  popupImageText.textContent = evt.target.closest(".card__image").alt;
};
