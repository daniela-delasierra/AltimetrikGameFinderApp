import {
  showPlatforms,
  getReleasedDate,
  getGenresName,
} from "./gameDataFunctions.mjs";

export const cardsContainer = document.getElementById("cards-container");

export const Card = (
  { name, released, background_image, genres, description, parent_platforms },
  cardNumber
) => {
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
