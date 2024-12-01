import '../pages/index.css'; 

import {
  createCard,
  deleteCard,
  likeCardListener,
} from '../components/card.js';

import {
  closeModalWindow,
  openModalWindow,
} from '../components/modal.js';

import {
  enableValidation,
  clearValidation, 
} from '../components/validation.js';

import {
  editProfile,
  addCard,
  removeCard,
  addLikeCard,
  deleteLikeCard,
  editAvatar,
  getUserMe,
  getCards,
} from '../components/api.js'


// @todo: DOM узлы

const editModalOpen = document.querySelector('.profile__edit-button');
const editModalWindow = document.querySelector('.popup_type_edit');
const editModalInputName = document.querySelector('.popup__input_type_name');
const editModalInputDescrition = document.querySelector('.popup__input_type_description');
const editModalInputCardName = document.querySelector('.popup__input_type_card-name');
const editModalInputTypeUrl = document.querySelector('.popup__input_type_url');
const editModalInputAvatarUrl = document.querySelector('.popup__input_type_url_avatar')
const editModalAvatarButton = document.querySelector('.profile__image-avtar-edit');


const newCardModalOpen = document.querySelector('.profile__add-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');
const newAvatarModal = document.querySelector('.popup_type_edit_avatar');

const closeEditModal = document.querySelector('.popup_type_edit .popup__close');
const closeNewCardModal = document.querySelector('.popup_type_new-card .popup__close');
const closeImgModal = document.querySelector('.popup_type_image .popup__close');
const closeAvatarModal = document.querySelector('.popup_type_edit_avatar .popup__close');

const openWindowImgModal = document.querySelector('.popup_type_image');

const formNewPlaceElement = document.querySelector('[name="new-place"]');
const formEditProfileElement = document.querySelector('[name="edit-profile"]');
const formModalEditAvatar = document.querySelector('[name="edit-avatar"]');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const placesList = document.querySelector('.places__list');

let _meId = null;

const like = (event) => {
  const likeButtonElement = event.currentTarget;
  const cardElement = likeButtonElement.targetElement;

  let idCard = cardElement.getAttribute('id');
  idCard = idCard.replace(/^card/, '');
  let likeRequest = null

  if (likeButtonElement.classList.contains('card__like-button_is-active')){
    likeRequest = deleteLikeCard(idCard);
  } else {
    likeRequest = addLikeCard(idCard);
  }
  
  likeRequest
    .then((result) => {
      cardElement.querySelector('.card__like-quantity').textContent = result.likes.length;
    })
  likeCardListener(event);
}

const removeCardElement = (event) => {
  let idCard = event.currentTarget.targetElement.getAttribute('id');
  idCard = idCard.replace(/^card/, '');
  removeCard(idCard)
  deleteCard(event)
}

const renderCard = (cardData, meId) => {
  return createCard(cardData, meId, removeCardElement, like, openImageModalWindow)
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}; 

enableValidation(validationConfig);

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
  const submitButton = evt.currentTarget.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...'
  editProfile(nameInputValue, jobInputValue).then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about; 
    
    submitButton.textContent = 'Сохранить'
    closeModalWindow(editModalWindow)
  });

}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardNameInputValue = editModalInputCardName.value;
  const typeUrlInputValue  = editModalInputTypeUrl.value;
  const submitButton = evt.currentTarget.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...'
  console.log(cardNameInputValue, typeUrlInputValue)
  addCard(cardNameInputValue, typeUrlInputValue)
    .then(res => {
      placesList.prepend(renderCard(res, _meId));
      formNewPlaceElement.reset()
      submitButton.textContent = 'Сохранить'
      closeModalWindow(newCardModalWindow)
    });

}


function editAvatarSubmit(evt){
  evt.preventDefault();

  const urlAvatar = editModalInputAvatarUrl.value;
  const submitButton = evt.currentTarget.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...'
  editAvatar(urlAvatar)
    .then(res => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`
      formModalEditAvatar.reset()
      submitButton.textContent = 'Сохранить'
      closeModalWindow(newAvatarModal);
    });
}

editModalAvatarButton.addEventListener('click', function(){
  openModalWindow(newAvatarModal);
})

editModalOpen.addEventListener('click', function(){
  editModalInputName.value = profileTitle.textContent;
  editModalInputDescrition.value = profileDescription.textContent;
  openModalWindow(editModalWindow);
  clearValidation(formEditProfileElement, validationConfig);
})

formModalEditAvatar.addEventListener('submit', editAvatarSubmit);

formEditProfileElement.addEventListener('submit', handleFormEditProfileSubmit);

formNewPlaceElement.addEventListener('submit', handleFormNewPlaceSubmit);

newCardModalOpen.addEventListener('click', function(){
  openModalWindow(newCardModalWindow);
});

closeAvatarModal.addEventListener('click', function(){
  closeModalWindow(newAvatarModal);
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


Promise.all([getCards, getUserMe])
.then((results) => {

  profileTitle.textContent = results[1]['name'];
  profileDescription.textContent = results[1]['about'];
  profileAvatar.style.backgroundImage = `url('${results[1]['avatar']}')`;
  _meId = results[1]._id;

  results[0].forEach((card) => {
    placesList.append(renderCard(card, _meId))
  });
});
