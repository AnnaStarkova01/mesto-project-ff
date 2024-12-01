//api.js
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '78d647ac-c117-4622-a9f8-fa9f9240e132',
    'Content-Type': 'application/json'
  }
}

export const getCards = new Promise((resolve, reject) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      reject(`Что-то пошло не так: ${res.status}`);
      return
    }
    resolve(res.json())
    return 
  })
  .catch((err) => {
    console.log(err); 
  });
})

export const getUserMe = new Promise ((resolve, reject)=> {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {

    if (!res.ok) {
      reject(`Что-то пошло не так: ${res.status}`);
      return
    }
    resolve(res.json())
    return 
  })
  .catch((err) => {
    console.log(err); 
  });
})

export function editProfile(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err); 
  })
}

export function addCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err); 
  })
}

export function removeCard(idCard){
  fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err); 
  });
}

export function addLikeCard(idCard){
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
    
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err); 
  });
}

export function deleteLikeCard(idCard){
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err); 
  });
}

export function editAvatar(avatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    })
    
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err); 
  });
}