import { addFilm, removeFilm, isInLibrary } from "./library.js";

export function createMoviePopup(movie) {
  const popup = document.createElement("div");
  popup.classList.add("popup-backdrop");

  const inLibrary = isInLibrary(movie.id);

  popup.innerHTML = `
    <div class="popup" >

      <button class="popup-close">×</button>

      <div class="popup-left">
        <img class="popup-poster" src="https://image.tmdb.org/t/p/${getScreenBreakpoint()}${
    movie.poster_path
  }" alt="${movie.title}">
      </div>

      <div class="popup-right">

        <h2 class="popup-title">${movie.title}</h2>

        <div class="popup-row">
          <span class="label">Vote / Votes</span>

          <div class="vote-box">${movie.vote_average}</div>
          <span class="slash">/</span>
          <div class="vote-count">${movie.vote_count}</div>
        </div>

        <div class="popup-row">
          <span class="label">Popularity</span>
          <span class="popup-value">${movie.popularity}</span>
        </div>

        <div class="popup-row">
          <span class="label">Genre</span>
          <span class="popup-value">${movie.genres.join(", ")}</span>
        </div>

        <h3 class="about-title">ABOUT</h3>
        <div class="overviewWrapper">
        <p class="popup-overview">${movie.overview}</p>
        </div> 

        <button class="up-btn" id="library-toggle-btn">
          ${inLibrary ? "Remove from my library" : "Add to my library"}
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.remove();
  });

  const btn = popup.querySelector("#library-toggle-btn");

  btn.addEventListener("click", () => {
    const currentlyInLibrary = isInLibrary(movie.id);

    if (currentlyInLibrary) {
      removeFilm(movie.id);
      btn.textContent = "Add to my library";
    } else {
      addFilm(movie);
      btn.textContent = "Remove from my library";
    }
  });
}

function getScreenBreakpoint() {
  const width = window.innerWidth;

  if (width >= 1280) return "w500";
  if (width >= 780) return "w342";
  if (width >= 500) return "w342";
  return "w342";
}

const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");

openBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});
