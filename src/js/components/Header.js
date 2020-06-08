import BaseComponent from './BaseComponent';

//Класс, отвечающий за логику работы шапки сайта. Его конструктор принимает объект опций. 
//В опциях передайте цвет шапки, так как на разных страницах он может быть разный.
export default class Header extends BaseComponent {
  constructor(element, isArticlesUrl) {

    super();
    this._element = element;
    this._isArticlesUrl = isArticlesUrl;
    this._articlesLink = this._element.querySelector('.menu__item_articles');
    this._buttonIcon = this._element.querySelector('.button__icon');
    this._buttonText = this._element.querySelector('.button__text');
    this._menu = this._element.querySelector('.menu__button');
    this._list = this._element.querySelector('.menu__items-container_mobile');
    this._overlay = this._element.querySelector('.header__menu-overlay');
  }

  render(props) {

    console.log(props, 'Props');

    //при вызове перерисовывает шапку в зависимости от переданного аргумента — объекта props. 
    //У этого объекта есть два обязательных свойства:
    //isLoggedIn — залогинен ли пользователь;
    //userName — имя, которое отображается в шапке залогиненного пользователя

    if (props.isLoggedIn) {
      this._articlesLink.style.display = 'inline-block';
      this._buttonIcon.style.display = 'block';
      this._buttonText.textContent = props.userName;
    } else {
      this._articlesLink.style.display = 'none';
      this._buttonIcon.style.display = 'none';
      this._buttonText.textContent = 'Авторизоваться';
    }
  }

  checkMenuState() {
    if (
      this._menu.classList.contains('menu__button-close_white') ||
      this._menu.classList.contains('menu__button-close_black')
    ) {
      return true;
    }
    return false;
  }

  toggleMenuButton() {
    if (this._isArticlesUrl) {
      this._menu.classList.toggle('menu__button-close_black');
    } else {
      this._menu.classList.toggle('menu__button-close_white');
    }
  }

  toggleMenu() {
   this._element.classList.toggle('header_dropdown');
   this._list.classList.toggle('menu__items-container_active');
   this._overlay.classList.toggle('header__menu-overlay_active');
   document.body.classList.toggle('body_hidden');
  }
}

