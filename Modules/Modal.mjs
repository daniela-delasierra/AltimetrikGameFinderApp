import {
  showPlatforms,
  getReleasedDate,
  getImgMedia,
  getPlatforms,
  getGenresName,
} from "./gameDataFunctions.mjs";
import { hideSpinner } from "./Spinner.mjs";

const disabledBackground = document.getElementsByClassName("bg-disabled")[1];
export const gameModal = document.getElementById("game");
export const body = document.getElementsByTagName("body")[0];

const Modal = (game) => {
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

export const openModal = (game) => {
  gameModal.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  gameModal.appendChild(Modal(game));
  disabledBackground.classList.remove("d-none");
  hideSpinner();
  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    gameModal.removeChild(document.getElementById("game-modal"));
    gameModal.classList.add("d-none");
    body.classList.remove("overflow-hidden");
    disabledBackground.classList.add("d-none");
  });
};
