import BaseComponent from './BaseComponent';

//Класс карточки новости. 
export default class NewsCard extends BaseComponent {
  constructor(data, template) {
    super();
    this._element = document
      .querySelector(template)
      .content.cloneNode(true)
      .querySelector('.card__wrapper');
    this._data = data;
    this._id = null;
    this._cardEventCallback = null;
    this._textWrapper = this._element.querySelector('.card__description-wrapper');
    this._setData(this._data);    
  }

  remove() {
    this._removeListeners();
    this._element.remove();
  }

  _setData(data) {
    this._element.querySelector('.card__source').textContent = data.source;
    this._element.querySelector('.card__title').textContent = data.title;
    this._element.querySelector('.card__date',).textContent = NewsCard._setFormattedDate(data.date);
    this._element.querySelector('.card__description').textContent = data.text;
    this._element.querySelector('.card__image').src = data.image;
    this._element.querySelector('.card__image').alt = data.title;
    if (this._element.querySelector('.card__keywords-icon')) {
      this._element.querySelector('.card__keywords-icon').textContent = data.keyword;
    }
  }

  static _setFormattedDate(dataDate) {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const [
      { value: day },
      ,
      { value: month },
      ,
      { value: year },
    ] = formatter.formatToParts(new Date(dataDate));

    return `${day} ${month}, ${year}`;
  }

  set id(cardId) {
    this._id = cardId;
  }

  get id() {
    return this._id;
  }

  get node() {
    return this._element;
  }

}
