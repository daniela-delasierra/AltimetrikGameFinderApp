const spinner = document.getElementById("spinner-container");

export const showSpinner = () => {
  spinner.classList.remove("d-none");
};

export const hideSpinner = () => {
  spinner.classList.add("d-none");
};
