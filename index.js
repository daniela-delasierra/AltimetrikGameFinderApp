const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const cardsContainer = document.getElementById("cards-container");
const body = document.getElementsByTagName("body")[0];
const navMenuButton = document.getElementById("nav__menu-button");
const sidebarMenuButton = document.getElementById("sidebar__menu-button");
const searchButton = document.getElementById("nav__search-button");
const searchbar = document.getElementById("nav__searchbar");
const gameModal = document.getElementById("game");
const searchbarInputCol = document.getElementsByClassName(
  "nav__searchbar__input"
);
const spinner = document.getElementById("spinner-container");

const cardTitleCollection =
  document.getElementsByClassName("card__info__title");
const viewListInput = document.getElementById("view-list-input");
const viewStackedInput = document.getElementById("view-stacked-input");

let pageNumber = 1;
let cardNumber = 1;
let searchQueryParam;
const API_KEY = "f0a66e0eb33e46ab95f5ca5531f5e1e2";
const baseURL = "https://api.rawg.io/api/games";

const openModal = (games, i) => {
  gameModal.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  gameModal.appendChild(showGameModal(games[i]));
  document.getElementsByClassName("bg-disabled")[0].classList.remove("d-none");
  hideSpinner();
  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    gameModal.removeChild(document.getElementById("game-modal"));
    gameModal.classList.add("d-none");
    body.classList.remove("overflow-hidden");
    document.getElementsByClassName("bg-disabled")[0].classList.add("d-none");
  });
};

const createGameCards = (games) => {
  for (let i = 0; i < games.length; i++) {
    cardsContainer.appendChild(Card(games[i]));
    cardImgCollection[cardNumber - 1].addEventListener("click", () =>
      openModal(games, i)
    );
    cardTitleCollection[cardNumber - 1].addEventListener("click", () =>
      openModal(games, i)
    );
    cardNumber++;
  }
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};

const getGameDetails = async (games) => {
  try {
    for (let gameIndex in games) {
      const { data } = await axios.get(`${baseURL}/${games[gameIndex].id}`, {
        params: {
          key: API_KEY,
          search: searchQueryParam,
        },
      });
      games[gameIndex] = { ...games[gameIndex], ...data };
    }
    pageNumber++;
    return games;
  } catch (error) {
    console.log(error);
  }
};

const processGameInfo = async (data) => {
  showSpinner();
  const games = await getGameDetails(data.results);
  if (games) {
    createGameCards(games);
    if (viewListInput.checked) {
      addListViewClasses();
    }
  }
  hideSpinner();
};

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

const searchGames = (i) => {
  //Delete all the current game's cards
  cardsContainer.innerHTML = "";
  //Reset the page number to show and card number
  pageNumber = 1;
  cardNumber = 1;
  if (
    searchbarInputCol[i].value.length >= 3 ||
    searchbarInputCol[i].value.length == 0
  ) {
    searchQueryParam = searchbarInputCol[i].value;
    infScroll.loadNextPage();
    window.scrollTo(0, 0);
  }
};

const addEventListenerToSearchbar = (() => {
  for (let i = 0; i < searchbarInputCol.length; i++) {
    searchbarInputCol[i].addEventListener(
      "input",
      debounce(() => searchGames(i), 3000)
    );
  }
})();

const viewStackedButton = document.getElementById("view-stacked");
const viewListButton = document.getElementById("view-list");
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
  "card__footer__position-info"
);
const gameDescriptionCollection =
  document.getElementsByClassName("game-description");

const getGenresName = (genres) => {
  return genres.map((genre) => genre.name).join(", ");
};
const getPlatforms = (platforms) => {
  return platforms.map((platform) => platform.platform.name).join(", ");
};

const getReleasedDate = (date) => {
  if (date) {
    date = date.split("-");
    let d = new Date(date[0], date[1] - 1, date[2]);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${da}, ${ye}`;
  }
};

const getImgMedia = (screenshots) => {
  let element = screenshots.slice(1, 6);
  let images = "<div class='img-container'>";
  let i = 0;
  while (element[i]) {
    if (i == 0) {
      images += `
      <div class="game-video">
        <img src="${element[i].image}" class="media__img" />
        <div class="play-video__button">
        <svg
        class="youtube-icon"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 49 49"
        style="enable-background:new 0 0 49 49;"
        xml:space="preserve"
      >
        <path
          fill="#ffffff"
          d="M39.256,6.5H9.744C4.371,6.5,0,10.885,0,16.274v16.451c0,5.39,4.371,9.774,9.744,9.774h29.512
                      c5.373,0,9.744-4.385,9.744-9.774V16.274C49,10.885,44.629,6.5,39.256,6.5z M47,32.726c0,4.287-3.474,7.774-7.744,7.774H9.744
                      C5.474,40.5,2,37.012,2,32.726V16.274C2,11.988,5.474,8.5,9.744,8.5h29.512c4.27,0,7.744,3.488,7.744,7.774V32.726z"
        />
        <path
          fill="#ffffff"
          d="M33.36,24.138l-13.855-8.115c-0.308-0.18-0.691-0.183-1.002-0.005S18,16.527,18,16.886v16.229
                      c0,0.358,0.192,0.69,0.502,0.868c0.154,0.088,0.326,0.132,0.498,0.132c0.175,0,0.349-0.046,0.505-0.137l13.855-8.113
                      c0.306-0.179,0.495-0.508,0.495-0.863S33.667,24.317,33.36,24.138z M20,31.37V18.63l10.876,6.371L20,31.37z"
        />
      </svg> 
          <p>Play full video</p>
        </div>
      </div>`;
    } else if (!element[i + 1]) {
      images += `<div class="media__img">
          <img src="${element[i].image}" class="media__img last-preview-img" />
          <div class="view-all">
          <p>
            View all
            <br />
            ...
          </p>
        </div>
      </div>
      `;
    } else {
      images += `<img src="${element[i].image}" class="media__img" />`;
    }
    i++;
  }
  images += " </div>";
  return images;
};

const Card = ({
  name,
  released,
  background_image,
  genres,
  description,
  parent_platforms,
}) => {
  const str = `
    <div class="card">
        <div class="card__img-container" role="button" tabindex="0">
          <img class="card__img-container__img" src='${background_image}'>
        </div>
        <div class="card__content">
            <div class="card__info">
                <h2 role="button" tabindex="0" class="card__info__title is-bold" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${name}">${name}</h2>
                <div class="card__info__container">
                    <div class="info__row">
                        <p class="info">Release date</p>
                        <span class="info date">${getReleasedDate(
                          released
                        )}</span>
                    </div>
                    <div class="info__row">
                        <p class="info">Genres</p>
                        <span class="info genres" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${getGenresName(
                          genres
                        )}">${getGenresName(genres)}</span>
                    </div>
                </div>
                <div></div>
            </div>

            <div class="card__footer">

                    ${showPlatforms(parent_platforms)}
                <span class="card__footer__position-info green-color">
                            #${cardNumber}
                </span>
                <button class="card__footer__button green-gradient-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gift-fill" viewBox="0 0 16 16">
                        <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="game-description">
            ${description}
        </div>
    </div>`;
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
};

let cardsCollection = document.getElementsByClassName("card");
let cardImgCollection = document.getElementsByClassName("card__img-container");

const addListViewClasses = () => {
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

main.addEventListener(
  "click",
  (event) => {
    if (sidebar.classList.contains("show")) {
      event.stopImmediatePropagation();
      sidebar.classList.remove("show");
      body.classList.remove("overflow-hidden");
      gameModal.classList.remove("overflow-hidden");
    }
  },
  true
);

navMenuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  body.classList.add("overflow-hidden");
  gameModal.classList.add("overflow-hidden");
  sidebar.classList.toggle("show");
});

sidebarMenuButton.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  body.classList.remove("overflow-hidden");
  gameModal.classList.remove("overflow-hidden");
});

searchButton.addEventListener("click", () => {
  searchbar.classList.toggle("display-none");
  gameModal.classList.toggle("top-166");
});

const showGameModal = (game) => {
  const modal = `<div id="game-modal">
      <div class="game__background-img" style="background-image: linear-gradient(
          to top,
          rgba(48, 48, 48, 1),
          rgba(48, 48, 48, 0.3)),
          url(${game.background_image}">
      </div>
      <div class="game__info">
          <div class="game__info__icons-container" >
            ${showPlatforms(game.parent_platforms)}
            <svg id="close-button" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
              class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
          <h2 class="game__info__title is-bold">${game.name}</h2>
          <div class="game-info-container">
            <div class="game__info__game-tags">
              <div class="game-tag release-date">${getReleasedDate(
                game.released
              )}</div>
              <div class="game-tag ranking-position">
                <span class="green-color is-bold game-position">#1
                </span><span>TOP 2021</span>
              </div>
              <div class="game-tag category-ranking-position">
                <span class="green-color is-bold game-position">#342</span><span>RPG</span>
              </div>
            </div>
            <div class="buttons-container">
              <div role="button" class="buy-button">
                <a class="buy-button__link">Where to<br /><span class="buy-button--upper-text">BUY</span></a>
                <span class="add-icon">+</span>
              </div>
              <div role="button" class="wish-list-button">
                <a class="buy-button__link">add to<br /><span class="buy-button--upper-text">WISH LIST</span></a>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gift-fill gift-icon" viewBox="0 0 16 16">
                <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="game-info__description">
            ${game.description}
          </div>
          <div class="buttons-container feedback-buttons">
            <div class="game-feedback__button" role="button">
              <a class="game-feedback__link">Left a comment</a>
              <span class="add-icon">+</span>
            </div>
            <div class="game-feedback__button" role="button">
              <a class="game-feedback__link">Write a review</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </div>
          </div>
          <div class="wrapper">
            <div id="media-files">
              ${getImgMedia(game.short_screenshots)}
              
            </div>
            <div id="game-detail">
              <div class="row-info">
                <h2 class="game-subtitle">Platforms</h2>
                <div class="game-detail__info underlined" id="plattfom-info">
                  ${getPlatforms(game.platforms)}
                </div>
              </div>
              <div class="row-info">
                <h2 class="game-subtitle">Release date</h2>
                <div class="game-detail__info" id="release-date">
                ${getReleasedDate(game.released)}
                </div>
              </div>
              <div class="row-info">
                <h2 class="game-subtitle">Publisher</h2>
                <div class="game-detail__info underlined" id="publisher">
                  ${game.publishers[0]?.name || "Unknown"}
                </div>
              </div>
              <div class="row-info">
                <h2 class="game-subtitle">Website</h2>
                <a href="${
                  game.website
                }" class="game-detail__info underlined" id="website">${
    game.website
  }</a>
              </div>
              <div class="row-info">
                <h2 class="game-subtitle">Genre</h2>
                <div class="game-detail__info underlined" id="genre">
                  ${getGenresName(game.genres)}
                </div>
              </div>
              <div class="row-info">
                <h2 class="game-subtitle">Developer</h2>
                <div class="game-detail__info underlined" id="developer">
                  ${game.developers[0]?.name || "Unknown"}
                </div>
              </div>
              <div class="row-info">
                <h2 class="game-subtitle">Age rating</h2>
                <div class="game-detail__info" id="age-rating">${
                  game.esrb_rating?.name || "Not rated"
                }</div>
              </div>
            </div>
          </div>
        </div></div>`;
  var parser = new DOMParser();
  var doc = parser.parseFromString(modal, "text/html");
  return doc.body.firstChild;
};

const showPlatformIcons = (platforms) => {
  platforms.array.forEach((platform) => {
    switch (platform.platform.id) {
      case 0:
    }
  });
};

let infScroll = new InfiniteScroll(cardsContainer, {
  path: () => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNumber}`;
    if (searchQueryParam) {
      url += `&search=${searchQueryParam}`;
    }
    return url;
  },
  append: false,
  responseBody: "json",
  history: false,
});

infScroll.on("load", processGameInfo);
infScroll.loadNextPage();

const showSpinner = () => {
  spinner.classList.remove("d-none");
};

const hideSpinner = () => {
  spinner.classList.add("d-none");
};

const play = `<svg height="20" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg" fill="white" class="platform-icon">
<path
    d="M6.5 0.149317L6.5 12.0296L9.07955 12.8818L9.07955 2.92038C9.07955 2.45098 9.28024 2.13932 9.60212 2.2465C10.023 2.36823 10.1048 2.80063 10.1048 3.2648L10.1048 7.24326C11.7104 8.05369 12.9745 7.24283 12.9745 5.10456C12.9745 2.91953 12.2334 1.94614 10.0527 1.16352C9.19249 0.864854 7.59836 0.360857 6.5 0.149317Z" />
<path
    d="M9.75 11.1429L13.6492 9.45771C14.0903 9.25915 14.1578 8.9894 13.8008 8.84764C13.4382 8.70325 12.791 8.74457 12.3452 8.93895L9.75 10.0506V8.27688L9.89861 8.21729C9.89861 8.21729 10.6498 7.89415 11.7064 7.75502C12.7609 7.61465 14.0541 7.77328 15.0706 8.2385C16.2156 8.68019 16.3439 9.32446 16.0542 9.77281C15.7603 10.2165 15.0478 10.5375 15.0478 10.5375L9.75 12.8484" />
<path
    d="M1.18907 11.3389C-0.0278308 10.9683 -0.230758 10.1851 0.324385 9.73273C0.836458 9.31962 1.70854 9.00863 1.70854 9.00863L5.31353 7.60333L5.31353 9.20276L2.72172 10.2185C2.26263 10.398 2.1938 10.6507 2.56358 10.7828C2.93997 10.9203 3.60794 10.8834 4.0673 10.698L5.31353 10.2068V11.6346C5.23321 11.6494 5.1439 11.6642 5.06238 11.6794C3.81985 11.9049 2.49607 11.8123 1.18907 11.3389Z" />
<path fill-rule="evenodd" clip-rule="evenodd"
    d="M16.1271 12.7978C16.0247 12.8989 15.8903 12.9561 15.7455 12.9561C15.6008 12.9561 15.462 12.8989 15.3594 12.7978C15.2582 12.6948 15.2021 12.5603 15.2021 12.4154C15.2021 12.1153 15.4451 11.8727 15.7455 11.8727C15.8903 11.8727 16.0247 11.928 16.1271 12.0314C16.2284 12.1324 16.2855 12.2692 16.2855 12.4154C16.2855 12.5603 16.2284 12.6948 16.1271 12.7978ZM15.2934 12.4154C15.2934 12.292 15.3396 12.1788 15.4239 12.095C15.5104 12.0092 15.6257 11.963 15.7455 11.963C15.8655 11.963 15.9779 12.0092 16.0622 12.095C16.1473 12.1788 16.1932 12.292 16.1932 12.4154C16.1932 12.6627 15.9922 12.8634 15.7455 12.8634C15.6257 12.8634 15.5104 12.8177 15.4239 12.7331C15.3396 12.6477 15.2934 12.5358 15.2934 12.4154ZM15.9927 12.6405C15.9976 12.6544 16.0034 12.6627 16.0118 12.6651L16.0193 12.6694V12.7038H15.9018L15.8996 12.6969L15.8916 12.6761C15.8903 12.6651 15.8887 12.6508 15.8871 12.6267L15.8819 12.5325C15.8805 12.4991 15.8696 12.4796 15.8494 12.4667C15.8345 12.4617 15.8141 12.4579 15.7837 12.4579H15.6205V12.7038H15.5134V12.0997H15.7941C15.8399 12.0997 15.8785 12.1078 15.908 12.1204C15.9672 12.1482 15.9976 12.1984 15.9976 12.269C15.9976 12.3037 15.9889 12.3362 15.9741 12.3601C15.9612 12.377 15.946 12.3924 15.9295 12.4075L15.9339 12.4106C15.9451 12.4185 15.9563 12.4263 15.9628 12.4378C15.9778 12.4543 15.9846 12.482 15.9858 12.5177L15.9885 12.5946C15.9889 12.6143 15.9905 12.6296 15.9927 12.6405ZM15.8661 12.3435C15.8835 12.3323 15.8916 12.31 15.8916 12.276C15.8916 12.2401 15.8792 12.2162 15.8549 12.2042C15.8399 12.1984 15.8214 12.1942 15.7964 12.1942H15.6205V12.3639H15.7867C15.8198 12.3639 15.846 12.3571 15.8661 12.3435Z" />
</svg>`;
const apple = `<svg height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" class="platform-icon"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 22.773 22.773" xml:space="preserve" fill="white">
    <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
    <path
        d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
</svg>`;
const windows = `<svg height="20" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg" class="platform-icon">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M13 5.95833H5.95833V0.998704L13 0V5.95833ZM5.41667 1.08333V5.95833H0V1.80612L5.41667 1.08333ZM5.41667 6.5H0V11.1145L5.41667 11.9167V6.5ZM5.95833 11.912V6.5H13V13L5.95833 11.912Z"
        fill="white" />
</svg>`;
const linux = `<svg height="20" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 841.9 980" xml:space="preserve" fill="white" class="platform-icon">
    <path class="st0"
        d="M617.9,980c-5.7,0-11.3,0-17,0c-5-1.2-10-2.1-14.9-3.7c-17.7-5.7-28.4-19.1-37-34.6c-1.5-2.7-3.2-4.2-6.3-4.9
c-72.9-16.9-145.5-12.8-218.1,2.1c-1.5,0.3-3.2,1.7-4,3c-14.4,24.7-37.5,35.3-65.9,30.6c-23-3.8-44.7-11.5-66.5-19.3
c-24.9-8.9-49.5-18.9-75.6-23.7c-18-3.3-36.2-5.4-54.2-8.7c-14.3-2.6-28.3-6.4-40.7-14.3c-13.2-8.4-16.7-18.4-12-33.4
c3.1-10,6.3-20,9.5-30c5.1-15.7,5.5-31.3-0.1-47c-1.7-4.7-2.7-9.6-3.6-14.5c-4-21.5,4.9-35.7,25.8-41.6c1.6-0.5,3.2-0.7,4.9-1.2
c11.1-2.9,22.3-5.4,33.2-9c16.4-5.5,30.3-14.7,38.2-30.8c5.9-12,12.8-23,25.1-29.4c-5.3-15.7-6.3-31.5-1.6-47
c3.1-10.1,8.7-19.4,12.6-29.3c9.6-24.8,19.6-49.5,27.9-74.8c14.2-42.8,34.6-82,62.9-117.2c14.3-17.8,27.3-36.6,40.9-54.9
c4.7-6.3,8-13.3,8.4-21.1c1.1-21.1,2.9-42.3,2.2-63.3c-1-31.1-4-62.2-5.7-93.3c-1.4-25-0.3-50,5.5-74.5c6.3-26,18-48.7,40.7-64.3
C350.3,18,369.7,9.7,390.5,5c9.4-2.1,18.9-3.4,28.4-5c8.7,0,17.3,0,26,0c1.3,0.3,2.5,0.8,3.8,0.9c46.2,5.2,81.7,27.1,104.8,67.7
c19.2,33.8,27.6,70.9,30.3,109.3c1.9,26.9,2.4,53.9,4.2,80.8c2,30.5,10.9,58.6,29.3,83.6c17.6,23.9,34.4,48.3,51.1,72.8
c25.9,38,50.9,76.5,70.9,118c11.7,24.3,18.7,49.7,18.9,76.9c0.2,24.6-2.8,48.8-8.6,72.7c-0.5,1.9-0.1,4.8,1.1,6.1
c14.1,15.3,21.3,32.9,20.6,54c-0.5,16.2,5.4,30.4,18.4,40.3c8.6,6.6,18.4,11.9,28.2,16.6c20.9,10.1,26.6,31.7,12.7,50.3
c-6.2,8.3-14.6,14.1-23.5,19c-23.3,12.8-46.8,25.4-70,38.6c-26.7,15.2-52.7,31.1-74.7,53.1c-5.4,5.4-12.6,9.4-19.7,12.4
C634.9,976.3,626.2,977.7,617.9,980z M311.9,304.5c0.3,1.8,0.6,3.5,0.8,5.1c0.2,1.8,0.3,3.7,0.2,5.5c-1.2,32.2-12.4,60.6-31.8,86.1
c-3.3,4.3-6.9,8.8-9,13.7c-7.4,17.8-14.5,35.7-21.2,53.8c-7.6,20.6-13.6,41.9-24.9,60.9c-19.9,33.5-28.2,69.8-27.1,108.4
c0.7,23.2,7.9,43.8,25.9,59.6c8.9,7.8,17.7,15.7,26.8,23.2c16.5,13.5,33.4,26.5,49.5,40.4c6.2,5.3,11.7,12,15.9,19
c8.2,13.7,3.2,31.4-10.6,39.6c-4,2.3-8.4,3.9-12.7,5.8c0.1,0.2,0.2,0.7,0.5,1.1c12.7,14.6,25.3,29.2,38.2,43.6
c1.3,1.5,4,2.3,6.1,2.6c21.4,2.9,42.9,2.8,64.3,0.8c18.4-1.7,37-3.2,54.8-7.5c43.3-10.5,76.5-36.9,104.4-70.7
c1.3-1.6,1.7-4.2,1.8-6.4c0.4-16.5,0.4-33,1.1-49.5c0.6-14.6,1.9-29.2,3.2-43.8c0.6-6.7,4.4-12.1,10.9-13.5
c6.9-1.5,14.1-1.4,21.2-1.7c2.5-0.1,5.1,0.6,7.7,1c0.4-1.2,0.6-1.9,0.7-2.5c11.9-50.3,11.6-100.2-4.6-149.7
c-18.8-57.3-42-112.9-67.1-167.6c-9.6-21-20.3-41.5-30.8-62.1c-3.1-6.2-5.1-6.6-11.8-4.7c-1.8,0.5-3.6,0.9-5.2,1.8
c-12.3,6.3-24.6,12.6-36.8,19c-18.7,9.9-37.2,20.1-55.9,29.8c-10.6,5.5-21.8,5.3-32.2-0.2c-9.4-4.9-18.5-10.6-26.8-17.1
C328.7,321.1,320.8,312.7,311.9,304.5z M258.4,946c4.1-1.1,9.1-1.1,12.1-3.5c7.6-6.1,15-12.8,21.1-20.3c8.9-10.9,10.4-23.8,6.4-37.3
c-4.2-14-12.4-25.6-21.5-36.8c-8.5-10.5-17.1-20.9-24.4-32.2c-16.7-26.1-32-53-48.9-79c-7.4-11.3-16.8-21.4-25.9-31.5
c-3.7-4.1-8.8-7.1-13.8-9.7c-8.4-4.4-14.3-3-20.1,4.6c-3,3.9-5.4,8.4-7.8,12.8c-3.5,6.4-6.6,13.1-10.2,19.4
c-5.1,8.9-12.6,15-22.6,17.7c-6.6,1.8-13.2,3.3-19.8,5c-9.8,2.6-19.7,5-29.3,8.1c-8,2.6-11.7,8.5-10.8,17c0.6,5.3,1.2,10.6,2.4,15.8
c3.5,14.8,3.3,29.3-1.3,43.8c-3.2,10-6.3,20.1-8.1,30.3c-2,11.6,1,16.3,12.3,19c16.5,3.9,33.2,7.1,49.9,9.9
c24.3,4.1,48.3,8.9,71,19.3c13.6,6.2,27.8,11.1,41.9,16.1C226.4,939.7,241.9,944.4,258.4,946z M613.3,711.1
c-1.3-0.1-2.8-0.4-4.3-0.4c-8.8-0.1-12.3,2.8-12.8,11.5c-0.3,5.8,0.1,11.7,0.3,17.5c0.6,18,3.1,36.1,1.5,53.8
c-2.3,25.3-7.3,50.4-11.8,75.4c-2.5,14-5.1,27.8-2.3,42.1c6.5,32.8,30.7,44.6,60,29.1c14.6-7.7,26.9-18.3,38.7-29.7
c5.7-5.5,11.6-11.3,18.4-15.3c23.7-13.8,47.9-26.7,71.9-40.1c9.6-5.4,19.2-10.6,28.4-16.7c6.4-4.2,6.7-10.1,1.5-15.8
c-2.7-2.9-5.8-5.6-9.1-7.7c-5.6-3.6-11.3-7.1-17.3-10c-12.8-6.1-20.8-16.2-25.8-29.1c-3.9-9.9-5.3-20.2-5-30.8
c0.2-9.1-2.3-17.2-10.3-22.8c-0.5,0.4-0.7,0.5-0.8,0.6c-1.4,2.5-2.8,4.9-4.2,7.4c-9.6,17.8-23.4,30.6-43.1,36.4
c-7.8,2.3-15.8,4.6-23.8,5.2c-27.7,2-43.1-8.3-48-35.6C614.2,728,614,719.8,613.3,711.1z M385.5,327.4c5.2-1.8,10.9-2.9,15.7-5.5
c25.6-14.1,51.1-28.6,76.4-43.2c7.1-4.1,7.7-11.2,1.5-16.6c-4.5-3.9-9.6-7.4-15-9.6c-19.6-7.9-39.5-15-59.1-22.8
c-10.2-4.1-19.5-2.6-28.4,3.1c-2,1.3-4.1,2.3-5.9,3.8c-14.8,11.9-29.6,23.7-44.2,35.8c-1.5,1.2-2.4,4.8-1.8,6.5
c1.6,4.3,3.8,8.6,6.7,12c11.6,13.6,26.6,23,41.8,32.1C376.7,325.1,380.9,325.8,385.5,327.4z M438.4,219.1c0.3-0.7,0.4-0.9,0.4-1
c-0.5-1.4-1-2.8-1.4-4.2c-3-10.3-2.8-20.5,2.1-30.1c4.3-8.5,10.5-14.8,20.8-14.8c10.2,0,16.5,6.3,20.8,14.8
c8.3,16.6,4.1,34.8-10.8,47.9c13.1,6.6,10.7,7.8,20.9-2.5c22.6-22.8,21.9-66-0.9-88.6c-15.9-15.8-38.6-17.3-55.7-3.3
c-21,17.1-26.1,48.6-17,72.1c0.5,1.2,1.8,2.3,3,2.9C426.4,214.5,432.3,216.8,438.4,219.1z M353.9,220.5c5-3.5,9.1-7.7,14-9.6
c6.6-2.5,8.4-6.9,8.6-13.2c0.9-18.4-2.3-35.6-14.8-49.9c-12.7-14.6-31.3-14.6-44.4-0.3c-1.8,2-3.6,4-4.9,6.3
c-14.1,24.9-14.5,50.1-0.2,74.9c3,5.3,8.5,9.1,13,13.4c0.8,0.8,3.2,1.3,3.9,0.7c4.4-3.4,8.6-7.2,12.5-10.6c-4.1-1.4-8-2-11.1-3.9
c-14.6-9.2-19.2-37.5-8.6-51.2c5.5-7.1,13.8-8.9,20.5-3.1c4.7,4.1,8.6,9.7,11.2,15.4C358.2,199.3,357.9,209.8,353.9,220.5z" />
</svg>`;
const xbox = `<svg height="20" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg" class="platform-icon">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M6.5 0C7.75357 0 8.79048 0.40056 9.73452 1.07423C9.75 1.07423 9.75 1.09244 9.75 1.11064C9.75 1.12885 9.73452 1.12885 9.71905 1.12885C8.5119 0.819328 6.68571 2.03922 6.51548 2.16667H6.5H6.48452C6.31429 2.03922 4.4881 0.819328 3.28095 1.12885C3.26548 1.12885 3.25 1.12885 3.25 1.11064C3.25 1.09244 3.25 1.07423 3.26548 1.07423C4.20952 0.40056 5.24643 0 6.5 0ZM10.6537 11.4392C11.6287 10.4302 8.40504 6.86712 6.5023 5.41667C6.5023 5.41667 6.48658 5.41667 6.48658 5.43243C4.59957 6.86712 1.3602 10.4302 2.35088 11.4392C3.45164 12.4167 4.91407 13 6.5023 13C8.09054 13 9.53724 12.4167 10.6537 11.4392ZM1.78082 2.19751C1.7734 2.19751 1.76969 2.20158 1.76598 2.20566C1.76227 2.20973 1.75856 2.2138 1.75114 2.2138C0.667808 3.40327 0 5.04896 0 6.8576C0 8.34035 0.460046 9.72534 1.21689 10.817C1.21689 10.8333 1.23174 10.8333 1.24658 10.8333C1.26142 10.8333 1.26142 10.817 1.24658 10.8007C0.78653 9.25282 3.11644 5.52149 4.31849 3.95726L4.33333 3.94097C4.33333 3.93257 4.33333 3.9285 4.3313 3.92653C4.32939 3.92467 4.32568 3.92467 4.31849 3.92467C2.49315 1.93681 1.8847 2.14863 1.78082 2.19751ZM8.66667 3.93424L8.68151 3.91793C10.5068 1.94443 11.1153 2.15646 11.2043 2.18908C11.2105 2.18908 11.2141 2.18908 11.2173 2.19025C11.2217 2.1919 11.2253 2.19586 11.234 2.20539C12.3322 3.39602 13 5.04332 13 6.85372C13 8.33792 12.54 9.72426 11.7831 10.817C11.7831 10.8333 11.7683 10.8333 11.7534 10.8333V10.8007C12.1986 9.25127 9.88356 5.5163 8.68151 3.95055C8.66667 3.95055 8.66667 3.93424 8.66667 3.93424Z"
        fill="white" />
</svg>`;
const android = `<svg height="20" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 475.071 475.071" style="enable-background:new 0 0 475.071 475.071;"
    xml:space="preserve" fill="white" class="platform-icon">
    <path d="M65.947,153.884c-8.183,0-15.136,2.853-20.844,8.566c-5.708,5.711-8.564,12.562-8.564,20.555v122.772
c0,8.179,2.855,15.126,8.564,20.837c5.708,5.712,12.657,8.562,20.841,8.562c8.186,0,15.085-2.851,20.699-8.562
c5.618-5.711,8.425-12.658,8.425-20.837V183.005c0-7.996-2.857-14.847-8.565-20.555C80.794,156.74,73.939,153.884,65.947,153.884z
" />
    <path d="M106.494,349.457c0,8.754,3.046,16.177,9.136,22.269c6.091,6.085,13.512,9.13,22.27,9.13h21.128l0.288,64.81
c0,8.186,2.855,15.129,8.564,20.841c5.708,5.711,12.562,8.565,20.555,8.565c8.188,0,15.133-2.854,20.844-8.565
c5.711-5.712,8.564-12.655,8.564-20.841v-64.81h39.397v64.81c0,8.186,2.854,15.129,8.562,20.841
c5.715,5.711,12.662,8.565,20.848,8.565c8.179,0,15.126-2.854,20.834-8.565c5.708-5.712,8.559-12.655,8.559-20.841v-64.81h21.416
c8.56,0,15.89-3.039,21.98-9.13c6.092-6.092,9.138-13.515,9.138-22.269V159.308H106.494V349.457z" />
    <path d="M302.345,43.682L322.61,6.279c1.335-2.474,0.855-4.377-1.424-5.708c-2.478-1.143-4.38-0.572-5.708,1.714L294.918,39.97
c-18.082-7.994-37.205-11.991-57.384-11.991c-20.174,0-39.304,3.997-57.387,11.991L159.591,2.286
c-1.328-2.286-3.234-2.857-5.708-1.714c-2.285,1.331-2.758,3.234-1.426,5.708l20.271,37.402
c-20.559,10.467-36.923,25.076-49.108,43.824c-12.181,18.749-18.273,39.259-18.273,61.525h264.095
c0-22.266-6.091-42.777-18.273-61.525C338.982,68.758,322.717,54.148,302.345,43.682z M185.144,98.068
c-2.187,2.19-4.803,3.284-7.849,3.284c-3.046,0-5.614-1.093-7.71-3.284c-2.091-2.187-3.14-4.805-3.14-7.85
c0-3.046,1.049-5.664,3.14-7.854c2.093-2.19,4.665-3.282,7.71-3.282c3.042,0,5.659,1.091,7.849,3.282
c2.19,2.19,3.284,4.808,3.284,7.854C188.428,93.264,187.334,95.878,185.144,98.068z M305.489,98.068
c-2.098,2.19-4.668,3.284-7.713,3.284c-3.046,0-5.657-1.093-7.848-3.284c-2.19-2.187-3.281-4.805-3.281-7.85
c0-3.046,1.091-5.664,3.281-7.854c2.19-2.19,4.802-3.282,7.848-3.282c3.045,0,5.615,1.091,7.713,3.282
c2.088,2.19,3.139,4.808,3.139,7.854C308.628,93.264,307.58,95.878,305.489,98.068z" />
    <path d="M429.964,162.306c-5.708-5.614-12.655-8.422-20.841-8.422c-7.991,0-14.843,2.808-20.551,8.422
c-5.711,5.616-8.568,12.517-8.568,20.699v122.772c0,8.179,2.857,15.126,8.568,20.837c5.708,5.712,12.56,8.562,20.551,8.562
c8.186,0,15.133-2.851,20.841-8.562c5.715-5.711,8.568-12.658,8.568-20.837V183.005
C438.532,174.822,435.679,167.921,429.964,162.306z" />
</svg>`;
const nintendo = `<svg height="20" viewBox="0 0 13 13" fill="white" xmlns="http://www.w3.org/2000/svg" class="platform-icon">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67443 13H7.67506C7.62406 13 7.58325 12.9591 7.58325 12.908V0.081761C7.58325 0.0408805 7.61385 0 7.66486 0H9.67443C11.5106 0 12.9999 1.49214 12.9999 3.33176V9.66824C12.9999 11.5079 11.5106 13 9.67443 13ZM11.4596 7.15409C11.4596 6.42846 10.8679 5.83569 10.1437 5.83569C9.41941 5.83569 8.83796 6.42846 8.82776 7.15409C8.82776 7.87972 9.41941 8.47248 10.1437 8.47248C10.8679 8.47248 11.4596 7.87972 11.4596 7.15409Z" fill="white"/>
    <path d="M2.16675 4.33333C2.16675 4.92917 2.65425 5.41667 3.25008 5.41667C3.84591 5.41667 4.33341 4.92917 4.33341 4.33333C4.33341 3.7375 3.84591 3.25 3.25008 3.25C2.64522 3.25 2.16675 3.72847 2.16675 4.33333Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.45677 0H6.40457C6.45759 0 6.5 0.0408805 6.5 0.0919811V12.908C6.5 12.9591 6.45759 13 6.40457 13H3.45677C1.54812 13 0 11.5079 0 9.66824V3.33176C0 1.49214 1.54812 0 3.45677 0ZM3.45677 11.9575H5.41843V1.04245H3.45677C2.82055 1.04245 2.22675 1.28774 1.7814 1.71698C1.32545 2.14623 1.08157 2.71855 1.08157 3.33176V9.66824C1.08157 10.2814 1.33605 10.8538 1.7814 11.283C2.22675 11.7225 2.82055 11.9575 3.45677 11.9575Z" fill="white"/>
    </svg>`;

const showPlatforms = (platforms) => {
  svgs = '<div class="card__platform-icons">';
  platforms.forEach((platform) => {
    switch (platform.platform.id) {
      case 1:
        svgs += windows;
        break;
      case 2:
        svgs += play;
        break;
      case 3:
        svgs += xbox;
        break;
      case 5:
        svgs += apple;
        break;
      case 6:
        svgs += linux;
        break;
      case 7:
        svgs += nintendo;
        break;
      case 8:
        svgs += android;
        break;
      default:
        break;
    }
  });
  svgs += "</div>";
  return svgs;
};

const lastSearches = [];
