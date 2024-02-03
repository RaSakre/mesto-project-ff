import { cardTemplate } from "../scripts";
// @todo: Функция создания карточки
export const createCard = function (
  cardData,
  cardRemove,
  toggleLikeCard,
  cardImageScale
) {
  const cloneTemplate = cardTemplate.cloneNode(true);
  const cardImage = cloneTemplate.querySelector(".card__image");
  cloneTemplate.querySelector(".card__image").alt = cardData.name;
  cloneTemplate.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cloneTemplate.querySelector(".card__delete-button");
  const likeButton = cloneTemplate.querySelector(".card__like-button");
  likeButton.addEventListener("click", toggleLikeCard);
  deleteButton.addEventListener("click", cardRemove);
  cardImage.src = cardData.link;
  cardImage.addEventListener("click", cardImageScale);
  return cloneTemplate;
};

// @todo: Функция удаления карточки
export const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

export function toggleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};