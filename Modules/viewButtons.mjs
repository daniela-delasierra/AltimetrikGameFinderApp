export const viewListInput = document.getElementById("view-list-input");
export const viewStackedInput = document.getElementById("view-stacked-input");
export let cardImgCollection = document.getElementsByClassName(
  "card__img-container"
);

const viewStackedButton = document.getElementById("view-stacked");
const viewListButton = document.getElementById("view-list");
const cardFooterCollection = document.getElementsByClassName("card__footer");
const cardsCollection = document.getElementsByClassName("card");
const cardContentCollection = document.getElementsByClassName("card__content");
const cardInfoTitleCollection =
  document.getElementsByClassName("card__info__title");
const cardInfoContainerCollection = document.getElementsByClassName(
  "card__info__container"
);
const infoRowCollection = document.getElementsByClassName("info__row");
const dateCollection = document.getElementsByClassName("date");
const genresCollection = document.getElementsByClassName("genres");

const cardFooterPosition = document.getElementsByClassName(
  "card__footer__position-info"
);
const gameDescriptionCollection =
  document.getElementsByClassName("game-description");

export const addListViewClasses = () => {
  viewListInput.checked = true;
  viewStackedInput.checked = false;
  for (let i = 0; i < cardsCollection.length; i++) {
    cardsCollection[i].classList.add("card--list-view");
    cardImgCollection[i].classList.add("card__img-container--list-view");
    cardContentCollection[i].classList.add("card__content--list-view");
    cardInfoTitleCollection[i].classList.add("card__info__title--list-view");
    cardInfoContainerCollection[i].classList.add(
      "card__info__container--list-view"
    );
    dateCollection[i].classList.add("date--list-view");
    genresCollection[i].classList.add("genres--list-view");
    cardFooterCollection[i].classList.add("card__footer--list-view");
    cardFooterPosition[i].classList.add(
      "card__footer__position-info--list-view"
    );
    gameDescriptionCollection[i].classList.add("game-description--list-view");
    for (let x = 0; x < infoRowCollection.length; x++) {
      infoRowCollection[x].classList.add("info__row--list-view");
    }
  }
};

const removeListClasses = () => {
  viewStackedInput.checked = true;
  viewListInput.checked = false;
  for (let i = 0; i < cardsCollection.length; i++) {
    cardsCollection[i].classList.remove("card--list-view");
    cardImgCollection[i].classList.remove("card__img-container--list-view");
    cardContentCollection[i].classList.remove("card__content--list-view");
    cardInfoTitleCollection[i].classList.remove("card__info__title--list-view");
    cardInfoContainerCollection[i].classList.remove(
      "card__info__container--list-view"
    );
    dateCollection[i].classList.remove("date--list-view");
    genresCollection[i].classList.remove("genres--list-view");
    cardFooterCollection[i].classList.remove("card__footer--list-view");
    cardFooterPosition[i].classList.remove(
      "card__footer__position-info--list-view"
    );
    gameDescriptionCollection[i].classList.remove(
      "game-description--list-view"
    );
    for (let x = 0; x < infoRowCollection.length; x++) {
      infoRowCollection[x].classList.remove("info__row--list-view");
    }
  }
};

viewStackedButton.addEventListener("click", removeListClasses, true, false);
viewListButton.addEventListener("click", addListViewClasses, true, false);
