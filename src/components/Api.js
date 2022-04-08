export default class Api {
  constructor(apiUrl, token) {
    this._apiUrl = apiUrl;
    this._token = token;
  }

  setUserInfo(name, about) {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log);
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  setNewUserCard(name, link) {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log);
  }

  getUserCard() {
    return fetch(`${this._apiUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  deleteUserCard(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log);
  }

  getInitialCards() {
    return fetch(`${this._apiUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  putLikeCard(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log);
  }
  
  deleteLikeCard(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log);
  }

  setUserAvatar(link) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => (res.ok) ? res.json() : Promise.reject(res.status))
    .catch(console.log);
  }
}