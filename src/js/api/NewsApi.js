import config from '../constants/config';

const { ONE_DAY, NEWSAPI_TOKEN } = config;

export default class NewsApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._lastDay = options.lastDay;
  }

  static getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _getDates() {
    const today = new Date();
    const lastday = new Date(today.getTime() - this._lastDay * ONE_DAY);
    return `&from=${lastday
      .toISOString()
      .slice(0, 10)}&to=${today.toISOString().slice(0, 10)}`;
  }

  getNews(input) {
     //возвращает список новостей на основе запроса.
    return fetch(`${this._url}/?apiKey=${NEWSAPI_TOKEN}&q=${input}${this._getDates()}&pageSize=100`, {
      headers: this._headers,
    }).then(res => NewsApi.getJSONResponse(res));
  }
}
