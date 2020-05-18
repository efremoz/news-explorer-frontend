import '../pages/index.css';

const formLogin = document.querySelector('.form_login');
const formSignup = document.querySelector('.form_signup');

const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
const authButton = document.querySelector('.header__button');

const buttonAuth = document.querySelector('.form__switch-auth');
const buttonRegistration = document.querySelector('.form__switch-registration');

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