class Api {
  constructor(options) {
    this._options = {...options};

  }
  _fetch(path, method = "GET", body) {
    return fetch(`${this._options.baseUrl}${path}`, {headers: this._options.headers, method: method, body: body})
      .then((result) => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      })
  }

  getInitialCards() {
    return this._fetch('cards');
  }

  getUserInfo() {
    return this._fetch('users/me');
  }

  patchUserInfo({name, about}) {
    return this._fetch('users/me', "PATCH", JSON.stringify({name: name, about: about}));
  }

  addNewCard({name, link}) {
    return this._fetch('cards', "POST",JSON.stringify({name: name, link: link}));
  }

  deleteCard(cardId) {
    return this._fetch('cards/' + cardId, "DELETE");
  }

  setLike(cardId) {
    return this._fetch('cards/' + cardId + '/likes', "PUT");
  }

  deleteLike(cardId) {
    return this._fetch('cards/' + cardId + '/likes', "DELETE");
  }

  patchUserAvatar(avatarLink) {
    return this._fetch('users/me/avatar', "PATCH", JSON.stringify({avatar: avatarLink}));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: '55a8e4ab-fab7-47ea-952b-a22a4b1ba00e',
    'Content-Type': 'application/json'
  }
});

export default api;
