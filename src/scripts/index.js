import '../pages/index.css'; 
import {initialCards} from '../scripts/cards.js';

import {
  createCard,
  deleteCard,
  likeCard
} from '../components/card.js';

import {
  closeModalWindow,
  openModalWindow,
} from '../components/modal.js';

// @todo: DOM узлы

const editModalOpen = document.querySelector('.profile__edit-button');
const editModalWindow = document.querySelector('.popup_type_edit');
const editModalInputName = document.querySelector('.popup__input_type_name');
const editModalInputDescrition = document.querySelector('.popup__input_type_description');
const editModalInputCardName = document.querySelector('.popup__input_type_card-name');
const editModalInputTypeUrl = document.querySelector('.popup__input_type_url');

const newCardModalOpen = document.querySelector('.profile__add-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');

const closeEditModal = document.querySelector('.popup_type_edit .popup__close');
const closeNewCardModal = document.querySelector('.popup_type_new-card .popup__close');
const closeImgModal = document.querySelector('.popup_type_image .popup__close');

const openWindowImgModal = document.querySelector('.popup_type_image');

const formNewPlaceElement = document.querySelector('[name="new-place"]');
const formEditProfileElement = document.querySelector('[name="edit-profile"]');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placesList = document.querySelector('.places__list');

const renderCard = (cardData) => {
  return createCard(cardData, deleteCard, likeCard, openImageModalWindow)
}

function openImageModalWindow(event){
  openWindowImgModal.querySelector('.popup__image').removeAttribute('src');

  openWindowImgModal.querySelector('.popup__caption').textContent =
    event.target.parentElement.querySelector('.card__title').textContent;

  openWindowImgModal.querySelector('.popup__image').setAttribute('src', event.target.src);
  openWindowImgModal.querySelector('.popup__image').setAttribute('alt', event.target.alt);
  openModalWindow(openWindowImgModal)
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 

  const nameInputValue = editModalInputName.value;
  const jobInputValue  = editModalInputDescrition.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  closeModalWindow(editModalWindow)
}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardNameInputValue = editModalInputCardName.value;
  const typeUrlInputValue  = editModalInputTypeUrl.value;

  placesList.prepend(renderCard({name: cardNameInputValue, link: typeUrlInputValue}));

  formNewPlaceElement.reset()

  closeModalWindow(newCardModalWindow)
}


// @todo: Вывести карточки на страницу
initialCards.forEach((cardParams) => {
  placesList.append(renderCard(cardParams));
});

editModalOpen.addEventListener('click', function(){
  editModalInputName.value = profileTitle.textContent;
  editModalInputDescrition.value = profileDescription.textContent;
  openModalWindow(editModalWindow);
})

formEditProfileElement.addEventListener('submit', handleFormEditProfileSubmit);

formNewPlaceElement.addEventListener('submit', handleFormNewPlaceSubmit);

newCardModalOpen.addEventListener('click', function(){
  openModalWindow(newCardModalWindow);
});

closeEditModal.addEventListener('click', function(){
  closeModalWindow(editModalWindow);
})

closeNewCardModal.addEventListener('click', function(){
  closeModalWindow(newCardModalWindow);
});

closeImgModal.addEventListener('click', function(){
  closeModalWindow(openWindowImgModal);
})
