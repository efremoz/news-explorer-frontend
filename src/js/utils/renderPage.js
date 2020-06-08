import errorHandler from './errorHandler';

const renderPage = (api, header, article) => {
  api
    .getUserData()
    .then(res => {
      header.render({ isLoggedIn: true, userName: res.data.name });
  
      if (article) {
        article.setUsername(res.data.name);
      }
    })
    .catch(err => {
      errorHandler(err);
    });
};

export default renderPage;
