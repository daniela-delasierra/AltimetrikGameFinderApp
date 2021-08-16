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

const API_KEY = "75f39d102c7f41b5ba33821c8b28a897";

const getData = async (href, searchQuery = "") => {
  try {
    const { data: gameData } = await axios.get(
      `${href}?key=${API_KEY}&${searchQuery}`
    );
    for (let gameIndex in gameData.results) {
      const { data } = await axios.get(
        `${href}/${gameData.results[gameIndex].id}?key=${API_KEY}&${searchQuery}`
      );
      gameData.results[gameIndex] = { ...gameData.results[gameIndex], ...data };
    }
    for (let i = 0; i < gameData.results.length; i++) {
      cardsContainer.appendChild(
        createCard(gameData.results[i], Number(i) + 1)
      );
      cardImgCollection[i].addEventListener("click", () => {
        gameModal.classList.remove("d-none");
        body.classList.add("overflow-hidden");
        gameModal.appendChild(showGameModal(gameData.results[i]));
        document
          .getElementsByClassName("bg-disabled")[0]
          .classList.remove("d-none");
        const closeButton = document.getElementById("close-button");
        closeButton.addEventListener("click", () => {
          gameModal.removeChild(document.getElementById("game-modal"));
          gameModal.classList.add("d-none");
          body.classList.remove("overflow-hidden");
          document
            .getElementsByClassName("bg-disabled")[0]
            .classList.add("d-none");
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

getData("https://api.rawg.io/api/games");

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

const searchGames = (i) => {
  const href = "https://api.rawg.io/api/games";
  if (searchbarInputCol[i].value.length >= 3) {
    querySearchParameter = `&search=${searchbarInputCol[i].value}`;
    cardsContainer.innerHTML = "";
    debugger;
    getData(href, querySearchParameter);
  } else if (searchbarInputCol[i].value.length == 0) {
    getData(href);
  }
};

const addEventListenerToSearchbar = () => {
  for (let i = 0; i < searchbarInputCol.length; i++) {
    searchbarInputCol[i].addEventListener(
      "input",
      debounce(() => searchGames(i), 3000)
    );
  }
};
addEventListenerToSearchbar();

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
  let element = screenshots
    .splice(0, 4)
    .reduce(
      (total, current) =>
        (total += `<img src="${current.image}" class="media__img" />`),
      "<div class='img-container'> "
    );

  element += " </div>";
  return element;
};

const createCard = (
  { name, released, background_image, genres, description, platforms },
  index
) => {
  const str = `
    <div class="card">
        <div class="card__img-container">
          <img class="card__img-container__img" src='${background_image}'>
        </div>
        <div class="card__content">
            <div class="card__info">
                <h2 class="card__info__title is-bold">${name}</h2>
                <div class="card__info__container">
                    <div class="info__row">
                        <p class="info">Release date</p>
                        <p class="info date">${getReleasedDate(released)}</p>
                    </div>
                    <div class="info__row">
                        <p class="info">Genres</p>
                        <p class="info genres">${getGenresName(genres)}</p>
                    </div>
                </div>
                <div></div>
            </div>

            <div class="card__footer">
                <div class="card__footer__icons">
                    <svg xmlns:dc="http://purl.org/dc/elements/1.1/" height="13" width="16" fill="currentColor" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 154.81912"  preserveAspectRatio="xMidYMid">
                        <path d="m 197.23914,117.96194 c -3.8677,4.8796 -13.34356,8.36053 -13.34356,8.36053 0,0 -70.49109,25.31994 -70.49109,25.31994 0,0 0,-18.67289 0,-18.67289 0,0 51.87665,-18.48401 51.87665,-18.48401 5.887,-2.10924 6.79096,-5.09097 2.00581,-6.65604 -4.77616,-1.56957 -13.42451,-1.11983 -19.31601,0.99841 0,0 -34.56645,12.17426 -34.56645,12.17426 0,0 0,-19.37898 0,-19.37898 0,0 1.99232,-0.6746 1.99232,-0.6746 0,0 9.98856,-3.534896 24.03371,-5.09097 14.04515,-1.547081 31.24291,0.211374 44.74389,5.32933 15.21445,4.80764 16.92793,11.89543 13.06473,16.77502 z M 120.11451,86.165853 c 0,0 0,-47.752601 0,-47.752601 0,-5.608163 -1.03439,-10.771093 -6.29626,-12.232725 -4.0296,-1.290734 -6.53012,2.45104 -6.53012,8.054706 0,0 0,119.583887 0,119.583887 0,0 -32.250314,-10.23591 -32.250314,-10.23591 0,0 0,-142.58321 0,-142.58321 13.712343,2.54549 33.689454,8.56291 44.429074,12.18326 27.31226,9.376917 36.57225,21.047482 36.57225,47.343343 0,25.630256 -15.82159,35.344478 -35.92463,25.63925 z M 15.862004,131.01768 C 0.24279269,126.6193 -2.3566614,117.45375 4.7626047,112.17389 c 6.5795883,-4.8751 17.7689333,-8.54492 17.7689333,-8.54492 0,0 46.241498,-16.442224 46.241498,-16.442224 0,0 0,18.744854 0,18.744854 0,0 -33.275709,11.90892 -33.275709,11.90892 -5.878004,2.10924 -6.781967,5.09547 -2.005807,6.66054 4.780657,1.56506 13.433512,1.11983 19.320511,-0.99391 0,0 15.961005,-5.79256 15.961005,-5.79256 0,0 0,16.77053 0,16.77053 -1.011893,0.17989 -2.140724,0.35978 -3.184104,0.53518 -15.965505,2.60845 -32.969893,1.5201 -49.726928,-4.00262 z m 171.105246,7.42508 c 2.0193,0 3.91267,0.78254 5.33832,2.22618 1.42566,1.42115 2.21269,3.31903 2.21269,5.33383 0,2.02379 -0.78703,3.91267 -2.21269,5.33383 -1.42565,1.43464 -3.31902,2.21718 -5.33832,2.21718 -2.0193,0 -3.90818,-0.78254 -5.33833,-2.21718 -1.42565,-1.42116 -2.20818,-3.31004 -2.20818,-5.33383 0,-4.16453 3.38198,-7.56001 7.54651,-7.56001 z m -6.27827,7.56001 c 0,1.6775 0.65211,3.25606 1.83941,4.43436 1.18279,1.19629 2.76585,1.8439 4.43886,1.8439 3.46743,0 6.27826,-2.81532 6.27826,-6.27826 0,-1.682 -0.64761,-3.26056 -1.8394,-4.44336 -1.1828,-1.19629 -2.76586,-1.83941 -4.43886,-1.83941 -1.67301,0 -3.25607,0.64312 -4.43886,1.83941 -1.1873,1.1828 -1.83941,2.76136 -1.83941,4.44336 z m 8.55841,-4.07008 c 0.82751,0.36428 1.24576,1.06586 1.24576,2.06427 0,0.5127 -0.10794,0.94444 -0.3283,1.28174 -0.15741,0.24285 -0.38228,0.44074 -0.63413,0.61163 0.19788,0.11694 0.37328,0.25635 0.50371,0.41826 0.17988,0.23386 0.28332,0.60713 0.29682,1.11533 0,0 0.0405,1.07486 0.0405,1.07486 0.0135,0.28783 0.0315,0.5082 0.0765,0.64312 0.045,0.19788 0.13042,0.32381 0.23835,0.36429 0,0 0.11244,0.054 0.11244,0.054 0,0 0,0.12143 0,0.12143 0,0 0,0.18439 0,0.18439 0,0 0,0.18439 0,0.18439 0,0 -0.18439,0 -0.18439,0 0,0 -1.33571,0 -1.33571,0 0,0 -0.10793,0 -0.10793,0 0,0 -0.054,-0.0944 -0.054,-0.0944 -0.045,-0.0899 -0.0764,-0.19338 -0.10793,-0.3283 -0.0225,-0.12143 -0.045,-0.3328 -0.0585,-0.65661 0,0 -0.0675,-1.33571 -0.0675,-1.33571 -0.018,-0.46322 -0.1754,-0.75105 -0.47222,-0.90396 -0.18439,-0.0854 -0.49021,-0.12592 -0.90396,-0.12592 0,0 -2.28914,0 -2.28914,0 0,0 0,3.26056 0,3.26056 0,0 0,0.18439 0,0.18439 0,0 -0.18889,0 -0.18889,0 0,0 -1.08836,0 -1.08836,0 0,0 -0.18438,0 -0.18438,0 0,0 0,-0.18439 0,-0.18439 0,0 0,-8.03672 0,-8.03672 0,0 0,-0.18439 0,-0.18439 0,0 0.18438,0 0.18438,0 0,0 3.71929,0 3.71929,0 0.63863,0 1.17381,0.0944 1.58756,0.28782 z m -4.0296,3.38648 c 0,0 2.32961,0 2.32961,0 0.46772,0 0.841,-0.0855 1.10634,-0.26084 0.24286,-0.1754 0.35979,-0.49471 0.35979,-0.95793 0,-0.5037 -0.1664,-0.83201 -0.51719,-1.0074 -0.19338,-0.0944 -0.46323,-0.14841 -0.80503,-0.14841 0,0 -2.47352,0 -2.47352,0 0,0 0,2.37458 0,2.37458 z"/>
                    </svg>
                    <svg fill="currentColor" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" inkscape:version="0.91 r13725" width="13    " height="16" viewBox="0 0 375 376.25">
                            <path  d="M 168.2944,373.74853 C 139.61126,371.0014 110.57139,360.70054 85.625,344.42449 64.720673,330.78566 60,325.17896 60,313.9899 c 0,-22.47524 24.711913,-61.84014 66.99249,-106.71584 24.01246,-25.48631 57.46022,-55.36001 61.0775,-54.55105 7.0309,1.57238 63.25048,56.41053 84.29656,82.2252 33.28077,40.82148 48.58095,74.24535 40.808,89.14682 -5.9087,11.32753 -42.57225,33.4669 -69.50776,41.97242 -22.19984,7.01011 -51.35538,9.9813 -75.37239,7.68108 z M 31.766299,290.62209 C 14.395259,263.97255 5.6188412,237.73641 1.3815314,199.79015 -0.0176432,187.26015 0.4837454,180.09314 4.5586735,154.375 9.6374984,122.32096 27.891686,85.238616 49.825812,62.417381 c 9.341907,-9.719732 10.176232,-9.956543 21.563404,-6.120482 13.828359,4.658436 28.595941,14.857457 51.498364,35.56661 l 13.36254,12.082871 -7.2969,8.96431 C 95.080774,154.52332 59.323551,213.50779 45.847741,250 c -7.32599,19.83862 -10.280842,39.75281 -7.12868,48.04363 2.128174,5.59752 0.173385,3.51093 -6.952762,-7.42154 z m 304.915431,4.53255 c 1.71605,-8.37719 -0.4544,-23.76257 -5.5413,-39.28002 C 320.12376,222.26864 283.30079,159.75041 249.4876,117.24408 L 238.84328,103.86316 250.35914,93.289071 C 265.39545,79.482434 275.83517,71.215236 287.0994,64.194558 295.98821,58.654402 308.69049,53.75 314.15053,53.75 c 3.36626,0 15.21723,12.298726 24.78421,25.720611 14.81725,20.787709 25.71782,45.986979 31.24045,72.219689 3.56833,16.9498 3.8657,53.23126 0.57486,70.13935 -2.70068,13.87582 -8.40314,31.87484 -13.9661,44.08195 -4.16823,9.14657 -14.53521,26.91044 -19.0783,32.69074 -2.33569,2.97175 -2.33761,2.96527 -1.02393,-3.4477 z M 171.36546,47.404099 c -15.60147,-7.922671 -39.6696,-16.427164 -52.96493,-18.715209 -4.66097,-0.802124 -12.61193,-1.249474 -17.6688,-0.994114 -10.969609,0.55394 -10.479658,-0.0197 7.11783,-8.333665 C 122.47979,12.44903 134.68342,8.3844145 151.25,4.9058925 c 18.6362,-3.91308583 53.66559,-3.95900844 72.00507,-0.094397 19.80818,4.1741058 43.13297,12.8540855 56.27624,20.9423865 l 3.90633,2.403927 -8.96247,-0.452584 c -17.81003,-0.899366 -43.76576,6.295879 -71.6327,19.857459 -8.40538,4.090523 -15.71788,7.357511 -16.25,7.25997 -0.53211,-0.09754 -7.38426,-3.43589 -15.22701,-7.418555 z" id="path4148" inkscape:connector-curvature="0"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="13" width="16" viewBox="0 0  88 88" fill="currentColor">
                        <path  d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313zm35.67,33.529,0.0277,34.453-35.67-4.9041-0.002-29.78zm4.3261-39.025,47.318-6.906,0,41.527-47.318,0.37565zm47.329,39.349-0.0111,41.34-47.318-6.6784-0.0663-34.739z"/>
                    </svg>
                </div>
                <span class="card__footer__position-info green-color">
                            #${index}
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

viewStackedButton.addEventListener("click", removeListClasses);
viewListButton.addEventListener("click", addListViewClasses);

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
  const modal = `<div id="game-modal"><div class="game__background-img" style="background-image: linear-gradient(
          to top,
          rgba(48, 48, 48, 1),
          rgba(48, 48, 48, 0.3)
        ),
        url(${game.background_image}"></div>
        <div class="game__info">
          <div class="game__info__icons-container">
            <div class="game__info__platform-icons">
              <svg xmlns:dc="http://purl.org/dc/elements/1.1/" height="17" width="20" fill="currentColor"
                xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
                viewBox="0 0 200 154.81912" preserveAspectRatio="xMidYMid">
                <path
                  d="m 197.23914,117.96194 c -3.8677,4.8796 -13.34356,8.36053 -13.34356,8.36053 0,0 -70.49109,25.31994 -70.49109,25.31994 0,0 0,-18.67289 0,-18.67289 0,0 51.87665,-18.48401 51.87665,-18.48401 5.887,-2.10924 6.79096,-5.09097 2.00581,-6.65604 -4.77616,-1.56957 -13.42451,-1.11983 -19.31601,0.99841 0,0 -34.56645,12.17426 -34.56645,12.17426 0,0 0,-19.37898 0,-19.37898 0,0 1.99232,-0.6746 1.99232,-0.6746 0,0 9.98856,-3.534896 24.03371,-5.09097 14.04515,-1.547081 31.24291,0.211374 44.74389,5.32933 15.21445,4.80764 16.92793,11.89543 13.06473,16.77502 z M 120.11451,86.165853 c 0,0 0,-47.752601 0,-47.752601 0,-5.608163 -1.03439,-10.771093 -6.29626,-12.232725 -4.0296,-1.290734 -6.53012,2.45104 -6.53012,8.054706 0,0 0,119.583887 0,119.583887 0,0 -32.250314,-10.23591 -32.250314,-10.23591 0,0 0,-142.58321 0,-142.58321 13.712343,2.54549 33.689454,8.56291 44.429074,12.18326 27.31226,9.376917 36.57225,21.047482 36.57225,47.343343 0,25.630256 -15.82159,35.344478 -35.92463,25.63925 z M 15.862004,131.01768 C 0.24279269,126.6193 -2.3566614,117.45375 4.7626047,112.17389 c 6.5795883,-4.8751 17.7689333,-8.54492 17.7689333,-8.54492 0,0 46.241498,-16.442224 46.241498,-16.442224 0,0 0,18.744854 0,18.744854 0,0 -33.275709,11.90892 -33.275709,11.90892 -5.878004,2.10924 -6.781967,5.09547 -2.005807,6.66054 4.780657,1.56506 13.433512,1.11983 19.320511,-0.99391 0,0 15.961005,-5.79256 15.961005,-5.79256 0,0 0,16.77053 0,16.77053 -1.011893,0.17989 -2.140724,0.35978 -3.184104,0.53518 -15.965505,2.60845 -32.969893,1.5201 -49.726928,-4.00262 z m 171.105246,7.42508 c 2.0193,0 3.91267,0.78254 5.33832,2.22618 1.42566,1.42115 2.21269,3.31903 2.21269,5.33383 0,2.02379 -0.78703,3.91267 -2.21269,5.33383 -1.42565,1.43464 -3.31902,2.21718 -5.33832,2.21718 -2.0193,0 -3.90818,-0.78254 -5.33833,-2.21718 -1.42565,-1.42116 -2.20818,-3.31004 -2.20818,-5.33383 0,-4.16453 3.38198,-7.56001 7.54651,-7.56001 z m -6.27827,7.56001 c 0,1.6775 0.65211,3.25606 1.83941,4.43436 1.18279,1.19629 2.76585,1.8439 4.43886,1.8439 3.46743,0 6.27826,-2.81532 6.27826,-6.27826 0,-1.682 -0.64761,-3.26056 -1.8394,-4.44336 -1.1828,-1.19629 -2.76586,-1.83941 -4.43886,-1.83941 -1.67301,0 -3.25607,0.64312 -4.43886,1.83941 -1.1873,1.1828 -1.83941,2.76136 -1.83941,4.44336 z m 8.55841,-4.07008 c 0.82751,0.36428 1.24576,1.06586 1.24576,2.06427 0,0.5127 -0.10794,0.94444 -0.3283,1.28174 -0.15741,0.24285 -0.38228,0.44074 -0.63413,0.61163 0.19788,0.11694 0.37328,0.25635 0.50371,0.41826 0.17988,0.23386 0.28332,0.60713 0.29682,1.11533 0,0 0.0405,1.07486 0.0405,1.07486 0.0135,0.28783 0.0315,0.5082 0.0765,0.64312 0.045,0.19788 0.13042,0.32381 0.23835,0.36429 0,0 0.11244,0.054 0.11244,0.054 0,0 0,0.12143 0,0.12143 0,0 0,0.18439 0,0.18439 0,0 0,0.18439 0,0.18439 0,0 -0.18439,0 -0.18439,0 0,0 -1.33571,0 -1.33571,0 0,0 -0.10793,0 -0.10793,0 0,0 -0.054,-0.0944 -0.054,-0.0944 -0.045,-0.0899 -0.0764,-0.19338 -0.10793,-0.3283 -0.0225,-0.12143 -0.045,-0.3328 -0.0585,-0.65661 0,0 -0.0675,-1.33571 -0.0675,-1.33571 -0.018,-0.46322 -0.1754,-0.75105 -0.47222,-0.90396 -0.18439,-0.0854 -0.49021,-0.12592 -0.90396,-0.12592 0,0 -2.28914,0 -2.28914,0 0,0 0,3.26056 0,3.26056 0,0 0,0.18439 0,0.18439 0,0 -0.18889,0 -0.18889,0 0,0 -1.08836,0 -1.08836,0 0,0 -0.18438,0 -0.18438,0 0,0 0,-0.18439 0,-0.18439 0,0 0,-8.03672 0,-8.03672 0,0 0,-0.18439 0,-0.18439 0,0 0.18438,0 0.18438,0 0,0 3.71929,0 3.71929,0 0.63863,0 1.17381,0.0944 1.58756,0.28782 z m -4.0296,3.38648 c 0,0 2.32961,0 2.32961,0 0.46772,0 0.841,-0.0855 1.10634,-0.26084 0.24286,-0.1754 0.35979,-0.49471 0.35979,-0.95793 0,-0.5037 -0.1664,-0.83201 -0.51719,-1.0074 -0.19338,-0.0944 -0.46323,-0.14841 -0.80503,-0.14841 0,0 -2.47352,0 -2.47352,0 0,0 0,2.37458 0,2.37458 z" />
              </svg>
              <svg fill="currentColor" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
                xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1"
                inkscape:version="0.91 r13725" width="17    " height="20" viewBox="0 0 375 376.25">
                <path
                  d="M 168.2944,373.74853 C 139.61126,371.0014 110.57139,360.70054 85.625,344.42449 64.720673,330.78566 60,325.17896 60,313.9899 c 0,-22.47524 24.711913,-61.84014 66.99249,-106.71584 24.01246,-25.48631 57.46022,-55.36001 61.0775,-54.55105 7.0309,1.57238 63.25048,56.41053 84.29656,82.2252 33.28077,40.82148 48.58095,74.24535 40.808,89.14682 -5.9087,11.32753 -42.57225,33.4669 -69.50776,41.97242 -22.19984,7.01011 -51.35538,9.9813 -75.37239,7.68108 z M 31.766299,290.62209 C 14.395259,263.97255 5.6188412,237.73641 1.3815314,199.79015 -0.0176432,187.26015 0.4837454,180.09314 4.5586735,154.375 9.6374984,122.32096 27.891686,85.238616 49.825812,62.417381 c 9.341907,-9.719732 10.176232,-9.956543 21.563404,-6.120482 13.828359,4.658436 28.595941,14.857457 51.498364,35.56661 l 13.36254,12.082871 -7.2969,8.96431 C 95.080774,154.52332 59.323551,213.50779 45.847741,250 c -7.32599,19.83862 -10.280842,39.75281 -7.12868,48.04363 2.128174,5.59752 0.173385,3.51093 -6.952762,-7.42154 z m 304.915431,4.53255 c 1.71605,-8.37719 -0.4544,-23.76257 -5.5413,-39.28002 C 320.12376,222.26864 283.30079,159.75041 249.4876,117.24408 L 238.84328,103.86316 250.35914,93.289071 C 265.39545,79.482434 275.83517,71.215236 287.0994,64.194558 295.98821,58.654402 308.69049,53.75 314.15053,53.75 c 3.36626,0 15.21723,12.298726 24.78421,25.720611 14.81725,20.787709 25.71782,45.986979 31.24045,72.219689 3.56833,16.9498 3.8657,53.23126 0.57486,70.13935 -2.70068,13.87582 -8.40314,31.87484 -13.9661,44.08195 -4.16823,9.14657 -14.53521,26.91044 -19.0783,32.69074 -2.33569,2.97175 -2.33761,2.96527 -1.02393,-3.4477 z M 171.36546,47.404099 c -15.60147,-7.922671 -39.6696,-16.427164 -52.96493,-18.715209 -4.66097,-0.802124 -12.61193,-1.249474 -17.6688,-0.994114 -10.969609,0.55394 -10.479658,-0.0197 7.11783,-8.333665 C 122.47979,12.44903 134.68342,8.3844145 151.25,4.9058925 c 18.6362,-3.91308583 53.66559,-3.95900844 72.00507,-0.094397 19.80818,4.1741058 43.13297,12.8540855 56.27624,20.9423865 l 3.90633,2.403927 -8.96247,-0.452584 c -17.81003,-0.899366 -43.76576,6.295879 -71.6327,19.857459 -8.40538,4.090523 -15.71788,7.357511 -16.25,7.25997 -0.53211,-0.09754 -7.38426,-3.43589 -15.22701,-7.418555 z"
                  id="path4148" inkscape:connector-curvature="0" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="17" width="20" viewBox="0 0  88 88"
                fill="currentColor">
                <path
                  d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313zm35.67,33.529,0.0277,34.453-35.67-4.9041-0.002-29.78zm4.3261-39.025,47.318-6.906,0,41.527-47.318,0.37565zm47.329,39.349-0.0111,41.34-47.318-6.6784-0.0663-34.739z" />
              </svg>
            </div>
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
              <video class="media__video">
                <source />
              </video>
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
