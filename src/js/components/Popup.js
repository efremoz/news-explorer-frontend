import BaseComponent from './BaseComponent';
import config from '../constants/config';

const { ESCAPE_CODE } = config;

//Класс попапа
export default class Popup extends BaseComponent {
  constructor(element) {
    super();
    this._element = element;
    this._content = this._element.querySelector('.popup__content');
    this._contentHandler = null;
    this.isOpened = false;
    this._saveListeners([
      {
        event: 'mousedown',
        element: 'element',
        callback: this._closeHandler,
      },
      {
        event: 'keyup',
        element: 'window',
        callback: this._closeHandler,
      },
    ]);
  }

  setContent(template, handler) {

    //вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации;

    this._contentHandler = handler;
    this._content.appendChild(template);
  }

  open(template, handler) {
    //открывает попап;
    document.body.style.overflow = 'hidden';
    this._element.classList.add('popup_is-opened');
    this.setContent(template, handler);
    this._addEventListeners();
    this.isOpened = true;
  }

  clearContent() {
    //очищает содержимое попапа
    if (typeof this._contentHandler === 'function') {
      this._contentHandler();
    }
    document.body.style.overflow = '';
    this._content.lastChild.remove();
  }

  close() {
    //закрывает попап
    this.clearContent();
    this._element.classList.remove('popup_is-opened');
    document.body.style.overflow = '';
    this._removeListeners();
    this.isOpened = false;
  }

  _closeHandler(e) {
    if (
      e.keyCode === ESCAPE_CODE ||
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close')
    ) {
      this.close();
    }
  }
}
