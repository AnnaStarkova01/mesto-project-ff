import {openImageModalWindow} from '../components/modal.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

function likeCard(event){
  event.currentTarget.classList.toggle('card__like-button_is-active')
}

// @todo: Функция создания карточки
export function createCard(cardParams, deleteFunction=deleteCard, likeFunction=likeCard, openImageFunction=openImageModalWindow){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image')
  deleteButton.addEventListener('click', deleteFunction);
  deleteButton.targetElement = cardElement;
  cardElement.querySelector('.card__title').textContent = cardParams.name;
  cardImage.setAttribute('src', cardParams.link);
  cardImage.addEventListener('click', openImageFunction)
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunction);

  return cardElement;
  // placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(event){
  event.currentTarget.targetElement.remove();
}


