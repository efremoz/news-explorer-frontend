//Отвечает за взаимодействие с написанным вами Node.js API
export default class MainApi {
  constructor(options) {
    //Конструктор этого класса принимает опции, необходимые для инициализации работы с API.
    this._url = options.url;
  }

  static getJSONResponse(res) {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  signup(userData) {
    //регистрирует нового пользователя;
    const { name, email, password } = userData;
    return fetch(`${this._url}/signup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(res => MainApi.getJSONResponse(res));
  }

  signin(userData) {
    //аутентифицирует пользователя на основе почты и пароля;
    const { email, password } = userData;
    return fetch(`${this._url}/signin`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => MainApi.getJSONResponse(res));
  }

  getUserData() {
    // возвращает информацию о пользователе;
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => MainApi.getJSONResponse(res));
  }

  addBookmark(cardData) {
    /// создаёт статью; createArticle
    return fetch(`${this._url}/articles`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(cardData),
    }).then(res => MainApi.getJSONResponse(res));
  }

  deleteBookmark(articleId) {
    /// удаляет статью. removeArticle
    return fetch(`${this._url}/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    }).then(res => MainApi.getJSONResponse(res));
  }

  getArticles() {
    // забирает все статьи;
    return fetch(`${this._url}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => MainApi.getJSONResponse(res));
  }
}
