const AUTH_SERVER = "http://localhost:3000";
const loginButton = document.getElementById("login-button");
const snackbar = new mdc.snackbar.MDCSnackbar(
  document.querySelector(".mdc-snackbar")
);

const snackarSurface = document.getElementsByClassName(
  "mdc-snackbar__surface"
)[0];

const showPasswordIcon = document.querySelector(".bi-eye-fill");
const hidePasswordIcon = document.querySelector(".bi-eye-slash-fill");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordErrMsg = document.getElementById("password-error-msg");
const emailErrMsg = document.getElementById("email-error-msg");

const showPassword = () => {
  showPasswordIcon.classList.remove("d-none");
  hidePasswordIcon.classList.add("d-none");
  password.type = "text";
};

const hidePassword = () => {
  showPasswordIcon.classList.add("d-none");
  hidePasswordIcon.classList.remove("d-none");
  password.type = "password";
};

const resetInputStyle = () => {
  emailInput.classList.remove("invalid");
  emailInput.children[0].classList.remove("invalid");
  emailInput.children[1].firstElementChild.classList.remove("invalid");
  passwordInput.classList.remove("invalid");
  passwordInput.children[0].classList.remove("invalid");
  passwordInput.children[1].firstElementChild.classList.remove("invalid");
  emailErrMsg.classList.add("d-none");
  passwordErrMsg.classList.add("d-none");
  snackarSurface.classList.remove("mdc-snackbar__surface--error");
  snackarSurface.classList.remove("mdc-snackbar__surface--alert");
  snackarSurface.classList.remove("mdc-snackbar__surface--success");
};

const showInputError = (input) => {
  input.classList.add("invalid");
  input.children[0].classList.add("invalid");
  input.children[1].firstElementChild.classList.add("invalid");
  if (input == emailInput) {
    emailErrMsg.classList.remove("d-none");
  } else {
    passwordErrMsg.classList.remove("d-none");
  }
};

const userLogin = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  resetInputStyle();
  try {
    const response = await axios.post(
      `${AUTH_SERVER}/login`,
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status[0] == 1 || response.status[0] == 3) {
      snackarSurface.classList.add("mdc-snackbar__surface--alert");
      snackbar.open();
    }
    if (response.data.hasOwnProperty("accessToken")) {
      document.cookie = `token=${response.data.accessToken}`;
      window.location.replace("./main.html");
    }
  } catch (error) {
    if (error?.response?.data == "Email format is invalid") {
      showInputError(emailInput);
    } else if (error?.response?.data == "Incorrect password") {
      showInputError(passwordInput);
    } else {
      snackbar.labelText = error?.response?.data || "Unexpected error occurred";
      snackarSurface.classList.add("mdc-snackbar__surface--error");
      snackbar.open();
    }
  }
};

loginButton.addEventListener("click", (e) => userLogin(e));
showPasswordIcon.addEventListener("click", hidePassword);
hidePasswordIcon.addEventListener("click", showPassword);
