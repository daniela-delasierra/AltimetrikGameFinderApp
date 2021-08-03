const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const body = document.getElementsByTagName("body")[0];
const navMenuButton = document.getElementById("nav__menu-button");
const sidebarMenuButton = document.getElementById("sidebar__menu-button");
const searchButton = document.getElementById("nav__search-button");
const searchbar = document.getElementById("nav__searchbar");

const viewStackedButton = document.getElementById("view-stacked");
const viewListButton = document.getElementById("view-list");
const cardsCollection = document.getElementsByClassName("card");
const cardImgCollection = document.getElementsByClassName("card__img");
const cardContentCollection = document.getElementsByClassName("card__content");
const cardInfoTitleCollection =
  document.getElementsByClassName("card__info__title");
const cardInfoContainerCollection = document.getElementsByClassName(
  "card__info__container"
);
const infoRowCollection = document.getElementsByClassName("info__row");
const dateCollection = document.getElementsByClassName("date");
const genresCollection = document.getElementsByClassName("genres");
const cardFooterCollection = document.getElementsByClassName("card__footer");
const cardFooterPosition = document.getElementsByClassName(
  "card__footer__position"
);
const gameDescriptionCollection =
  document.getElementsByClassName("game-description");

const addListViewClasses = () => {
  for (let i = 0; i < cardsCollection.length; i++) {
    cardsCollection[i].classList.add("card--list-view");
    cardImgCollection[i].classList.add("card__img--list-view");
    cardContentCollection[i].classList.add("card__content--list-view");
    cardInfoTitleCollection[i].classList.add("card__info__title--list-view");
    cardInfoContainerCollection[i].classList.add(
      "card__info__container--list-view"
    );
    dateCollection[i].classList.add("date--list-view");
    genresCollection[i].classList.add("genres--list-view");
    cardFooterCollection[i].classList.add("card__footer--list-view");
    cardFooterPosition[i].classList.add("card__footer__position--list-view");
    gameDescriptionCollection[i].classList.add("game-description--list-view");
    for (let x = 0; x < infoRowCollection.length; x++) {
      infoRowCollection[x].classList.add("info__row--list-view");
    }
  }
};

const removeListClasses = () => {
  for (let i = 0; i <= cardsCollection.length - 1; i++) {
    cardsCollection[i].classList.remove("card--list-view");
    cardImgCollection[i].classList.remove("card__img--list-view");
    cardContentCollection[i].classList.remove("card__content--list-view");
    cardInfoTitleCollection[i].classList.remove("card__info__title--list-view");
    cardInfoContainerCollection[i].classList.remove(
      "card__info__container--list-view"
    );
    dateCollection[i].classList.remove("date--list-view");
    genresCollection[i].classList.remove("genres--list-view");
    cardFooterCollection[i].classList.remove("card__footer--list-view");
    cardFooterPosition[i].classList.remove("card__footer__position--list-view");
    gameDescriptionCollection[i].classList.remove(
      "game-description--list-view"
    );
    for (let x = 0; x < infoRowCollection.length; x++) {
      infoRowCollection[x].classList.remove("info__row--list-view");
    }
  }
};

viewStackedButton.addEventListener("click", removeListClasses);
viewListButton.addEventListener("click", addListViewClasses);

main.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

navMenuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  body.classList.toggle("transitioning");
  sidebar.classList.toggle("show");
  setTimeout(() => {
    body.classList.toggle("transitioning");
  }, 700);
});

sidebarMenuButton.addEventListener("click", () => {
  body.classList.toggle("transitioning");
  sidebar.classList.toggle("show");
  setTimeout(() => {
    body.classList.toggle("transitioning");
  }, 700);
});

searchButton.addEventListener("click", () => {
  searchbar.classList.toggle("display-none");
  header.classList.toggle("m-top-62");
});
