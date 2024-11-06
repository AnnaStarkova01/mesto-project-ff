import '../pages/index.css'; 
import {initialCards} from '../scripts/cards.js';
import {createCard} from '../components/card.js';
import {
  closeModalWindow, 
  handleFormNewPlaceSubmit,
  handleFormEditProfileSubmit, 
  openModalWindow,
  editModalInputName,
  editModalInputDescrition,
  profileDescription,
  profileTitle,
  placesList
} from '../components/modal.js';

// @todo: DOM узлы

const editModalOpen = document.querySelector('.profile__edit-button');
const editModalWindow = document.querySelector('.popup_type_edit');
const formNewPlaceElement = document.querySelector('[name="new-place"]');
const newCardModalOpen = document.querySelector('.profile__add-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');
const closeEditModal = document.querySelector('.popup_type_edit .popup__close');
const closeNewCardModal = document.querySelector('.popup_type_new-card .popup__close');
const closeImgModal = document.querySelector('.popup_type_image .popup__close');
const formEditProfileElement = document.querySelector('[name="edit-profile"]');


// @todo: Вывести карточки на страницу
initialCards.forEach((cardParams) => {
  placesList.append(createCard(cardParams));
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
  closeModalWindow();
})

closeNewCardModal.addEventListener('click', function(){
  closeModalWindow();
});

closeImgModal.addEventListener('click', function(){
  closeModalWindow();
})

//esc
document.addEventListener('keyup', function(event) {
  if (event.key === 'Escape' && windowModal) {
    closeModalWindow();
  }
});

//overlay
document.addEventListener('mousedown', function (event) {
  if(!event.target.classList.contains('popup_is-opened')) return;
  event.target.isClickOnThis = true;
});

document.addEventListener('mouseup', function (event) {
  if (event.target.isClickOnThis && event.target.classList.contains('popup_is-opened')) {
    event.preventDefault();
    closeModalWindow();
    return;
  }
  event.target.isClickOnThis = false;
})