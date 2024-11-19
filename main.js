(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e){e.currentTarget.classList.toggle("card__like-button_is-active")}function n(e){e.currentTarget.targetElement.remove()}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",c),document.addEventListener("mousedown",p),document.addEventListener("mouseup",u)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",c),document.removeEventListener("mousedown",p),document.removeEventListener("mouseup",u)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function p(e){e.target.classList.contains("popup_is-opened")&&(e.target.isClickOnThis=!0)}function u(e){e.target.isClickOnThis&&e.target.classList.contains("popup_is-opened")&&(e.preventDefault(),o(e.target)),e.target.isClickOnThis=!1}var i=document.querySelector(".profile__edit-button"),a=document.querySelector(".popup_type_edit"),d=document.querySelector(".popup__input_type_name"),s=document.querySelector(".popup__input_type_description"),l=document.querySelector(".popup__input_type_card-name"),_=document.querySelector(".popup__input_type_url"),m=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_edit .popup__close"),f=document.querySelector(".popup_type_new-card .popup__close"),k=document.querySelector(".popup_type_image .popup__close"),q=document.querySelector(".popup_type_image"),S=document.querySelector('[name="new-place"]'),g=document.querySelector('[name="edit-profile"]'),E=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),b=document.querySelector(".places__list"),h=function(r){return o=r,c=n,p=t,u=x,a=(i=e.querySelector(".card").cloneNode(!0)).querySelector(".card__delete-button"),d=i.querySelector(".card__image"),a.addEventListener("click",c),a.targetElement=i,i.querySelector(".card__title").textContent=o.name,d.setAttribute("alt",o.name),d.setAttribute("src",o.link),d.addEventListener("click",u),i.querySelector(".card__like-button").addEventListener("click",p),i;var o,c,p,u,i,a,d};function x(e){q.querySelector(".popup__image").removeAttribute("src"),q.querySelector(".popup__caption").textContent=e.target.parentElement.querySelector(".card__title").textContent,q.querySelector(".popup__image").setAttribute("src",e.target.src),q.querySelector(".popup__image").setAttribute("alt",e.target.alt),r(q)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){b.append(h(e))})),i.addEventListener("click",(function(){d.value=E.textContent,s.value=L.textContent,r(a)})),g.addEventListener("submit",(function(e){e.preventDefault();var t=d.value,n=s.value;E.textContent=t,L.textContent=n,o(a)})),S.addEventListener("submit",(function(e){e.preventDefault();var t=l.value,n=_.value;b.prepend(h({name:t,link:n})),S.reset(),o(y)})),m.addEventListener("click",(function(){r(y)})),v.addEventListener("click",(function(){o(a)})),f.addEventListener("click",(function(){o(y)})),k.addEventListener("click",(function(){o(q)}))})();