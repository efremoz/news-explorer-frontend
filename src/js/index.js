import '../pages/index.css';

const formLogin = document.querySelector('.form_login');
const formSignup = document.querySelector('.form_signup');

const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
const authButton = document.querySelector('.header__button');

const buttonAuth = document.querySelector('.form__switch-auth');
const buttonRegistration = document.querySelector('.form__switch-registration');

const  header = document.querySelector('.header');
const  body = document.querySelector('.body');
const  buttonMenu = document.querySelector('.menu__button');
const  blcokMenuContainerMobile = document.querySelector('.menu__items-container_mobile');
const  blockOverlay = document.querySelector('.header__menu-overlay');

const  formInput = document.querySelector('form');

function popupClose() {
  popup.classList.remove('popup_is-opened')
};

function popupOpen() {
  popup.classList.add('popup_is-opened')
};

buttonClose.addEventListener('click', popupClose);
authButton.addEventListener('click', popupOpen);

buttonAuth.addEventListener('click', () => {
  formSignup.style.display = 'none';
  formLogin.style.display = 'block';
  
});
buttonRegistration.addEventListener('click', () => {
  formLogin.style.display = 'none';
  formSignup.style.display = 'block';
});

buttonMenu.addEventListener('click', () => {

  let statusMenu = document.getElementsByClassName('menu__button-close');

  if(1 === statusMenu.length) {
    header.classList.remove('header_dropdown');
    body.classList.remove('body_is-hidden');
    blockOverlay.style.display = 'none';
    blcokMenuContainerMobile.style.display = 'none';
    buttonMenu.classList.remove('menu__button-close');
    buttonMenu.classList.remove('menu__button-close_white');
    buttonMenu.classList.add('menu__button-open');
    buttonMenu.classList.add('menu__button-open_white');
  } else {
    header.classList.add('header_dropdown');
    body.classList.add('body_is-hidden');
    blockOverlay.style.display = 'flex';
    blcokMenuContainerMobile.style.display = 'flex';
    buttonMenu.classList.remove('menu__button-open');
    buttonMenu.classList.remove('menu__button-open_white');
    buttonMenu.classList.add('menu__button-close');
    buttonMenu.classList.add('menu__button-close_white');
  }  
});
