//Модальное окно Редактировать
export const formEditProfileElement = document.querySelector('[name="edit-profile"]');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const editModalInputName = document.querySelector('.popup__input_type_name');
export const editModalInputDescrition = document.querySelector('.popup__input_type_description');
export const placesList = document.querySelector('.places__list');
//Модальное окно Добавить карточку 
export const editModalInputCardName = document.querySelector('.popup__input_type_card-name');
export const editModalInputTypeUrl = document.querySelector('.popup__input_type_url');

//Модальное окно Открыть картинку 
export const openWindowImgModal = document.querySelector('.popup_type_image');

import {createCard} from '../components/card.js';
//Закрыть модальное окно
let windowModal = null;

//открытие модального окна 
export function openModalWindow(modalWindow){
  modalWindow.classList.add('popup_is-opened');
  windowModal = modalWindow;
}

export function openImageModalWindow(event){
  openWindowImgModal.querySelector('.popup__image').addEventListener('load', function listener(){
    openModalWindow(openWindowImgModal)
    openWindowImgModal.querySelector('.popup__image').removeEventListener('load', listener)
  })
  openWindowImgModal.querySelector('.popup__image').setAttribute('src', event.target.src);
}

export function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 

  const nameInputValue = editModalInputName.value;
  const jobInputValue  = editModalInputDescrition.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  closeModalWindow()
}

export function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardNameInputValue = editModalInputCardName.value;
  const typeUrlInputValue  = editModalInputTypeUrl.value;

  placesList.prepend(createCard({name: cardNameInputValue, link: typeUrlInputValue}));

  closeModalWindow()
}

//закрытие модального окна 
export function closeModalWindow() {
  if (!windowModal) return;
  windowModal.classList.remove('popup_is-opened');
  windowModal.querySelectorAll('input').forEach((inputElement)=>{
    inputElement.value = null
  })
  windowModal = null;
}
