const toggleSaveButton = e => {
  if (
    e.target.classList.contains('card__bookmark-button_unsaved') &&
    !localStorage.getItem('token')
  ) {
    e.target.nextElementSibling.classList.toggle('card__bookmark-label_active');
  }
};

export default toggleSaveButton;
