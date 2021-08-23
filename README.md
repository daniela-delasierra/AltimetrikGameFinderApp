# AltimetrikGameFinderApp

Multi-platform app to search games and get information about them.

## Starting 🚀

_These instructions will allow you to get a copy of the project running on your local machine for development and testing purposes.._

### Prerequisites 📋

_Steps you need to follow to use the app_

1. Install JSON Server Auth in your machine following the steps mentioned in the Getting started of the documentation => https://www.npmjs.com/package/json-server-auth (First, you might need to install Node.js to get access to its package manager. If it is the case, please, follow the link => [Node.js](https://nodejs.org/en/)https://nodejs.org/en/ )
2. Run JSON Server Auth on Port 3000 of your machine.
3. Create last searches on local storage writting $ localStorage.setItem("lastSearches", JSON.stringify([])) in the browser's console. *This step was accidentally removed of the code and it will be part of the next version.
4. Clone or download the github repository  => https://github.com/daniela-delasierra/AltimetrikGameFinderApp
5. Open the app using the login.html file executed by a Live Server to avoid CORS errors.

### Things to improve:

#### Funcionality:

1. Last searches only works for tablet and desktop.
2. Token is not being validated after login.
3. Implement remember checkbox funcionality of the login.

#### Coding
1. Set lastSearches on localStorage.
2. Make code more modular.
3. Use Sass to implement variables for main and secondary colors of the app and to nest css declarations for better readability.
4. Use event.target to handle the search input instead of asking for the used device type.

## Author ✒️

* **Daniela de la Sierra** - - [de la Sierra](https://github.com/daniela-delasierra)

