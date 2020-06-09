import '../../pages/articles/index.css';

import config from '../constants/config';
import errors from '../constants/errors';

import Header from '../components/Header';
import Results from '../components/Results';
import NewsCard from '../components/NewCard';
import Article from '../components/Article';

import MainApi from '../api/MainApi';

import renderPage from '../utils/renderPage';
import errorHandler from '../utils/errorHandler';

const { GET_RESULT_ERROR } = errors;

const mainApi = new MainApi({
  url: config.SERVER_URL,
});

const header = new Header(document.querySelector('.header'), true);
const results = new Results(document.querySelector('.results'), true);
const article = new Article(document.querySelector('.article'));

if (localStorage.getItem('token')) {
  renderPage(mainApi, header, article);
} else {
  window.location.href = '../';
}

const headerButtonHandler = e => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.href = '../';
};

const headerMenuHandler = e => {
  if (
    window.matchMedia('(max-width: 650px)').matches &&
    e.target.classList.contains('menu__button')
  ) {
    header.toggleMenuButton();
    header.toggleMenu();
  }
};

header.setListeners([
  {
    event: 'click',
    element: '.header__button',
    callback: e => headerButtonHandler(e),
  },
  {
    event: 'click',
    element: '.menu__button',
    callback: e => headerMenuHandler(e),
  },
]);

const trashButtonHandler = (e, card, data) => {
  e.preventDefault();
  e.stopPropagation();
  if (window.confirm('Вы действительно хотите удалить эту новость?')) {
    mainApi
      .deleteBookmark(data._id)
      .then(() => {
        article.changeSummary(data.keyword);
        card.remove();
        results.renderedCards.pop();
        if (results.renderedCards.length === 0) {
          results.hide();
        }
      })
      .catch(err => {
        errorHandler(err);
      });
  }
};

results.show();
mainApi
  .getArticles()
  .then(res => {
    results.togglePreloader(false);
    res.data.forEach(cardData => {
      article.createSummary(cardData.keyword);

      const newsCardElement = new NewsCard(cardData, '.card-bookmark-template');
      newsCardElement.setListeners([
        {
          event: 'click',
          element: '.card__trash-button',
          callback: e => trashButtonHandler(e, newsCardElement, cardData),
        },
        {
          event: 'click',
          element: '.card',
          callback: () => {
            window.open(cardData.link, '_blank');
          },
        },
        
      ]);

      results.renderedCards.push(newsCardElement);
      results.insertElement(newsCardElement.node);
      article.counter += 1;
    });

    article.sortSummary();
  })
  .catch(err => {
    results.togglePreloader(false);
    errorHandler(err, results.setMessageError, GET_RESULT_ERROR);
  });