// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardParams, deleteFunction){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunction);
  deleteButton.targetElement = cardElement;
  cardElement.querySelector('.card__title').textContent = cardParams.name;
  cardElement.querySelector('.card__image').setAttribute('src', cardParams.link);

  return cardElement;
  // placesList.append(cardElement);
}
// @todo: Функция удаления карточки
function deleteCard(event){
  event.currentTarget.targetElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardParams) => {
  card = createCard(cardParams, deleteCard);
  placesList.append(card);
});   

