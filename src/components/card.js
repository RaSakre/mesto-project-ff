import { cardTemplate } from "../scripts";
import { deleteCardRequest, putLikeRequest, deleteLikeRequest } from "../scripts/api";

// @todo: Функция создания карточки

export function createCard(
  cardData,
  deleteCard,
  likeCard,
  scaleCardImage,
  ownerId
) {
  const cardContent = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardContent.querySelector(".card__image");
  cardImage.src = cardData.link;
  const cardDescription = (cardContent.querySelector(".card__image").alt =
    cardData.name);
  const cardTitle = (cardContent.querySelector(".card__title").textContent =
    cardData.name);
  const likeButton = cardContent.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton, cardData._id, cardLikeCount);
  });
  const likes = cardData.likes;
  likes.forEach(function (el) {
    if (el._id === ownerId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  cardImage.addEventListener("click", scaleCardImage);
  const cardLikeCount = cardContent.querySelector(".card__like-count");
  cardLikeCount.textContent = cardData.likes.length;
  if (cardData.owner._id === ownerId) {
    const myCardId = cardData._id;
    const cardDeleteIcon = cardContent.querySelector(".card__delete-button");
    cardDeleteIcon.addEventListener("click", function () {
      deleteCard(cardDeleteIcon, myCardId);
    });
  } else {
    const cardDeleteButton = (cardContent.querySelector(
      ".card__delete-button"
    ).style.display = "none");
  }
  return cardContent;
}

// @todo: Функция удаления карточки
export function deleteCard(button, cardId) {
  const card = button.closest(".card");
	deleteCardRequest(cardId)
	.then(() =>{
		card.remove()
	})
    .catch((err) => {
      console.log(err);
    });
}

// Функция постановки лайка

export function likeCard(button, cardId, likeCounter) {
  if (!button.classList.contains("card__like-button_is-active")) {
		putLikeRequest(cardId)
      .then((data) => {
        button.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
		deleteLikeRequest(cardId)
      .then((data) => {
        button.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}