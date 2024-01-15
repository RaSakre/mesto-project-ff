// @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');


// @todo: Функция создания карточки

const createCards = function (cardData, cardRemove){
const cloneTemplate =  cardTemplate.cloneNode(true);
const cardImage = cloneTemplate.querySelector('.card__image');
cloneTemplate.querySelector('.card__image').alt = cardData.name;
cloneTemplate.querySelector('.card__title').textContent = cardData.name;
const deleteButton = cloneTemplate.querySelector('.card__delete-button');
deleteButton.addEventListener('click', cardRemove);
cardImage.src = cardData.link;
return cloneTemplate
};

// @todo: Функция удаления карточки

const deleteCard = (evt) => {
evt.target.closest('.card').remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(elem){
	cardsList.append(createCards(elem, deleteCard));
});
