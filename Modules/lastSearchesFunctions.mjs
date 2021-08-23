import { Debounce } from "./Debounce.mjs";
export let lastSearches = localStorage.getItem("lastSearches");

export const searchbarNavInput = document.getElementsByClassName(
  "nav__searchbar__input"
)[0];
export const lastSearchesContainer = document.querySelector(
  ".last-searches__container"
);
lastSearches = JSON.parse(lastSearches);

export const myDebounceLastSearches = Debounce(() => closeLastSearches(), 1500);

export const closeLastSearches = () => {
  lastSearchesContainer.classList.add("d-none");
  searchbarNavInput.style.borderRadius = "20px";
};
