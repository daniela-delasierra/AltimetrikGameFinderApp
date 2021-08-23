import {
  play,
  apple,
  windows,
  linux,
  xbox,
  android,
  nintendo,
} from "./platformSVG.mjs";

export const showPlatforms = (platforms) => {
  let svgs = '<div class="card__platform-icons">';
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

export const getReleasedDate = (date) => {
  if (date) {
    date = date.split("-");
    let d = new Date(date[0], date[1] - 1, date[2]);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${da}, ${ye}`;
  }
};

export const getGenresName = (genres) => {
  return genres.map((genre) => genre.name).join(", ");
};

export const getImgMedia = (screenshots) => {
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

export const getPlatforms = (platforms) => {
  return platforms.map((platform) => platform.platform.name).join(", ");
};
