import BaseComponent from './BaseComponent';

export default class Results extends BaseComponent {
  constructor(element, isArticles) {
    super();
    this._element = element;
    this._isArticles = isArticles;
    this._message = this._element.querySelector('.results__message');
    this._cardlist = this._element.querySelector('.results__list');
    this._preloader = this._element.querySelector('.preloader');
    this.cardsData = null;
    this.counter = null;
    this.renderedCards = [];
    this._initializeSearchResultsElems();
    this.setMessageError = this.setMessageError.bind(this);
  }

  _initializeSearchResultsElems() {
    if (!this._isArticles) {
      this._moreCards = this._element.querySelector('.results__button');
      this._noResults = this._element.querySelector('.no-results');
    }
  }

  show() {
    if (!this._isArticles) {
      this.toggleNoResults(false);
      this.toggleMoreCards(false);
    }
    this._message.textContent = '';
    this.togglePreloader(true);
    this._element.classList.add('results_active');
  }

  hide() {
    this._element.classList.remove('results_active');
  }

  insertElement(node) {
    this._cardlist.append(node);
  }

  togglePreloader(isShow) {
    if (isShow) {
      this._preloader.classList.add('preloader_active');
    } else {
      this._preloader.classList.remove('preloader_active');
    }
  }

  toggleMoreCards(isShow) {
    if (isShow) {
      this._moreCards.classList.add('results__button_active');
    } else {
      this._moreCards.classList.remove('results__button_active');
    }
  }

  toggleNoResults(isShow) {
    if (isShow) {
      this._noResults.classList.add('no-results_active');
    } else {
      this._noResults.classList.remove('no-results_active');
    }
  }

  setMessageError(message) {
    this._message.textContent = message;
  }
}
