import { Card, cardsContainer } from "./Modules/Card.mjs";
import { body, gameModal, openModal } from "./Modules/Modal.mjs";
import { showSpinner, hideSpinner } from "./Modules/Spinner.mjs";
import {
  lastSearchesContainer,
  searchbarNavInput,
  myDebounceLastSearches,
  closeLastSearches,
} from "./Modules/lastSearchesFunctions.mjs";
import { Debounce } from "./Modules/Debounce.mjs";
import { viewListInput } from "./Modules/viewButtons.mjs";
import {
  addListViewClasses,
  cardImgCollection,
} from "./Modules/viewButtons.mjs";

const sidebar = document.getElementById("sidebar");
const navLogoutButton = document.getElementById("nav__logout");
const sidebarLogoutButton = document.getElementById("sidebar__logout");
const main = document.getElementById("main");
const navMenuButton = document.getElementById("nav__menu-button");
const sidebarMenuButton = document.getElementById("sidebar__menu-button");
const searchButton = document.getElementById("nav__search-button");
const searchbar = document.getElementById("nav__searchbar");
const searchbarInputCol = document.getElementsByClassName(
  "nav__searchbar__input"
);
const lastSearchesCol = document.getElementsByClassName(
  "last-searches__content"
);
const cardTitleCollection =
  document.getElementsByClassName("card__info__title");

const snackbar = new mdc.snackbar.MDCSnackbar(
  document.querySelector(".mdc-snackbar")
);
const snackarSurface = document.getElementsByClassName(
  "mdc-snackbar__surface"
)[0];

let pageNumber = 1;
let cardNumber = 1;

let searchQueryParam;
const API_KEY = "f0a66e0eb33e46ab95f5ca5531f5e1e2";
const BASE_URL = "https://api.rawg.io/api/games";

function getCookieValue(name) {
  const nameString = name + "=";

  const value = document.cookie.split(";").filter((item) => {
    return item.includes(nameString);
  });

  if (value.length) {
    return value[0].substring(nameString.length, value[0].length);
  } else {
    return "";
  }
}

const currentToken = getCookieValue("token");

if (currentToken) {
  let lastSearches = localStorage.getItem("lastSearches");
  lastSearches = JSON.parse(lastSearches);

  const getGameDetails = async (games) => {
    try {
      for (let gameIndex in games) {
        const { data } = await axios.get(`${BASE_URL}/${games[gameIndex].id}`, {
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
      snackbar.labelText = error?.response?.data || "Unexpected error occurred";
      snackarSurface.classList.add("mdc-snackbar__surface--error");
      snackbar.open();
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

  const onInputChange = () => {
    myDebounceSearchGames();
    showLastSearches();
  };

  const myDebounceSearchGames = Debounce(() => searchGames(), 2500);

  const updateLastSearches = (lastSearch) => {
    if (!!lastSearch) {
      lastSearches.unshift(lastSearch);
    }
    if (lastSearches.length > 3) {
      lastSearches.pop();
    }
    localStorage.setItem("lastSearches", JSON.stringify(lastSearches));
  };

  const isMobile = (function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  })();

  const searchGames = (searchbarIndex) => {
    let searchbarInd = searchbarIndex;
    if (searchbarIndex == undefined) {
      searchbarInd = isMobile ? 1 : 0;
    }
    //Delete all the current game's cards
    //Reset the page number to show and card number
    pageNumber = 1;
    cardNumber = 1;
    if (
      searchbarInputCol[searchbarInd].value.length >= 3 ||
      searchbarInputCol[searchbarInd].value.length == 0
    ) {
      cardsContainer.innerHTML = "";
      searchQueryParam = searchbarInputCol[searchbarInd].value;
      infScroll.loadNextPage();
      window.scrollTo(0, 0);
      updateLastSearches(searchbarInputCol[searchbarInd].value);
    }
  };

  const showLastSearches = () => {
    if (lastSearches.length > 0) {
      lastSearchesContainer.innerHTML = "";
      lastSearchesContainer.classList.remove("d-none");
      searchbarNavInput.style.borderRadius = "20px 20px 0 0";
      let result = lastSearches.reduce(
        (accumulator, current) =>
          (accumulator += `<span role="button" class="last-searches__content">${current}</span>`),
        '<div class="last-searches__content-container">'
      );
      result += "</div>";
      document.querySelector(".last-searches__container").innerHTML = result;
      for (let i = 0; i < lastSearchesCol.length; i++) {
        lastSearchesCol[i].addEventListener("click", () => {
          searchbarNavInput.value = lastSearchesCol[i].innerText;
          closeLastSearches();
          searchGames(0);
        });
      }
      myDebounceLastSearches();
    }
  };

  const createGameCards = (games) => {
    for (let gameIndex = 0; gameIndex < games.length; gameIndex++) {
      cardsContainer.appendChild(Card(games[gameIndex], cardNumber));
      cardImgCollection[cardNumber - 1].addEventListener("click", () =>
        openModal(games[gameIndex])
      );
      cardTitleCollection[cardNumber - 1].addEventListener("click", () =>
        openModal(games[gameIndex])
      );
      cardNumber++;
    }
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
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

  const logoutSession = () => {
    document.cookie = "token=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.replace("/login.html");
  };

  (() => {
    for (let i = 0; i < searchbarInputCol.length; i++) {
      searchbarInputCol[i].addEventListener("input", () => onInputChange(i));
    }
  })();

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
  searchbarInputCol[0].addEventListener("click", showLastSearches);
  navLogoutButton.addEventListener("click", logoutSession);
  sidebarLogoutButton.addEventListener("click", logoutSession);
}
