import '../../pages/articles/index.css';

const  header = document.querySelector('.header');
const  body = document.querySelector('.body');
const  buttonMenu = document.querySelector('.menu__button');
const  blcokMenuContainerMobile = document.querySelector('.menu__items-container_mobile');
const  blockOverlay = document.querySelector('.header__menu-overlay');


buttonMenu.addEventListener('click', () => {

  let statusMenu = document.getElementsByClassName('menu__button-close');

  if(1 === statusMenu.length) {
    header.classList.remove('header_dropdown');
    body.classList.remove('body_is-hidden');
    blockOverlay.style.display = 'none';
    blcokMenuContainerMobile.style.display = 'none';
    buttonMenu.classList.remove('menu__button-close');
    buttonMenu.classList.remove('menu__button-close_black');
    buttonMenu.classList.add('menu__button-open');
    buttonMenu.classList.add('menu__button-open_black');
  } else {
    header.classList.add('header_dropdown');
    body.classList.add('body_is-hidden');
    blockOverlay.style.display = 'flex';
    blcokMenuContainerMobile.style.display = 'flex';
    buttonMenu.classList.remove('menu__button-open');
    buttonMenu.classList.remove('menu__button-open_black');
    buttonMenu.classList.add('menu__button-close');
    buttonMenu.classList.add('menu__button-close_black');
  }
});