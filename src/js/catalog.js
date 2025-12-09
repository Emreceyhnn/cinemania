import {
  fetchMovies,
  fetchGenres,
  ENDPOINTS,
  fetchTrailerKey,
} from "./fetchApi";
import { createMoviePopup } from "./modal";
import spriteUrl from "../img/sprite.svg";

let currentPage = 1;
let totalPages = 1;
let currentQuery = "";
let currentYear = "";

let catalogHero;
let catalogInput;
let catalogSelect;
let catalogBtn;
let catalogMoviesWrapper;
let isEmpty;
let pagination;

function getDomElements() {
  catalogHero = document.querySelector(".catalog-hero-wrapper");
  catalogInput = document.querySelector(".catalog-filter-input");
  catalogSelect = document.querySelector(".catalog-filter-select");
  catalogBtn = document.querySelector(".catalog-filter-btn");
  catalogMoviesWrapper = document.querySelector(".catalog-movies-wrapper");
  isEmpty = document.querySelector("#empty-catalog");
  pagination = document.querySelector("#pagination");
}

function createCatalogHero(movie) {
  return `
    <section class="container" >
      <div class="catalog-hero"
        style="background-image:
          linear-gradient(83.06deg, #111111 11.91%, rgba(17,17,17,0) 73.11%),
          url('https://image.tmdb.org/t/p/${getScreenBreakpointHero()}${
    movie.poster_path
  }');
        ">
        <div class="catalog-hero-content">
          <div class="catalog-hero-content-description">
            <h1>${movie.title}</h1>
            <div>${createStars(movie.vote_average)}</div>
            <p>${movie.overview}</p>
          </div>

          <div class="catalog-hero-content-buttons">
            <button class="catalog-hero-btn">Watch Trailer</button>
            <button class="catalog-hero-btn-details">More Details</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function createStars(vote) {
  const rating = vote / 2;

  let full = Math.floor(rating);
  let half = rating % 1 >= 0.5 ? 1 : 0;
  let empty = 5 - full - half;

  const fullStars =
    `<svg width="${getScreenBreakpointStars()}" height="${getScreenBreakpointStars()}" fill="#ffc226"><use href="${spriteUrl}#icon-star"></use></svg>`.repeat(
      full
    );

  const halfStar = half
    ? `<svg width="${getScreenBreakpointStars()}" height="${getScreenBreakpointStars()}" fill="#ffc226"><use href="${spriteUrl}#icon-star-half"></use></svg>`
    : "";

  const emptyStars =
    `<svg width="${getScreenBreakpointStars()}" height="${getScreenBreakpointStars()}"><use href="${spriteUrl}#icon-star-outline"></use></svg>`.repeat(
      empty
    );

  return fullStars + halfStar + emptyStars;
}

export function createTrailerModal(videoKey) {
  const modal = document.createElement("div");
  modal.classList.add("trailer-backdrop");

  if (!videoKey) {
    modal.innerHTML = `
      <div class="no-trailer-modal">
        <button class="no-trailer-close">×</button>

        <p class="no-trailer-text">
          OOPS... We are very sorry! But we couldn’t find the trailer.
        </p>

        <div class="no-trailer-img"></div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".no-trailer-close").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    return;
  }

  modal.innerHTML = `
    <div class="trailer-modal">
      <button class="trailer-close">×</button>

      <iframe
        src="https://www.youtube.com/embed/${videoKey}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".trailer-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

export async function loadCatalogHero() {
  if (!catalogHero) return;

  const data = await fetchMovies(ENDPOINTS.POPULAR_MOVIES);
  const genreMap = await fetchGenres();

  const movie = data.results[0];

  const markup = createCatalogHero({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    overview: movie.overview,
    year: movie.release_date?.split("-")[0] ?? "—",
    vote_average: movie.vote_average,
    genre_names: movie.genre_ids.map((id) => genreMap[id]).join(", "),
  });

  catalogHero.innerHTML = markup;

  const trailerBtn = document.querySelector(".catalog-hero-btn");

  trailerBtn.addEventListener("click", async () => {
    const key = await fetchTrailerKey(movie.id);
    if (key) createTrailerModal(key);
    else alert("Trailer bulunamadı!");
  });

  const moreDetailsBtn = document.querySelector(".catalog-hero-btn-details");

  moreDetailsBtn.onclick = (e) => {
    if (movie) {
      createMoviePopup({
        id: movie.id,
        title: movie.title,
        year: movie.release_date.split("-")[0],
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        overview: movie.overview,
        genres: movie.genre_ids.map((id) => genreMap[id]),
      });
    }
  };
}

function populateYearOptions(
  startYear = new Date().getFullYear(),
  endYear = 1980
) {
  if (!catalogSelect) return;

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "All Years";
  catalogSelect.appendChild(emptyOption);

  for (let year = startYear; year >= endYear; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    catalogSelect.appendChild(option);
  }
}

export function createWeeklyTrendCard(movie) {
  const IMG = `https://image.tmdb.org/t/p/${getScreenBreakpoint()}`;

  return `
    <li class="weekly-trends-card" data-id="${movie.id}"
      style="background:linear-gradient(
        180deg, rgba(0,0,0,0) 63%, rgba(0,0,0,0.9) 92%
      ), url('${IMG}${
    movie.poster_path
  }')" data-aos="zoom-in" data-aos-duration="1000">
      
      <div class="weekly-trends-card-desc">
        <h5>${movie.title}</h5>
        <p>${movie.genres} | ${movie.year}</p>
      </div>

      <div class="weekly-trends-rating">
        ${createStars(movie.vote_average)}
      </div>
    </li>
  `;
}

function movieCardRenderer(list, location, genreMap) {
  if (!location) return;

  const markup = list
    .map((movie) =>
      createWeeklyTrendCard({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        year: movie.release_date?.split("-")[0] || "—",
        vote_average: movie.vote_average,
        genres: movie.genre_ids.map((id) => genreMap[id]).join(", "),
      })
    )
    .join("");

  location.innerHTML = markup;
}

export async function loadMovies(endpoint, page = 1, query = "", year = "") {
  currentPage = page;
  currentQuery = query.trim();
  currentYear = year;

  if (!catalogMoviesWrapper) return;

  if (
    endpoint === ENDPOINTS.SEARCH_MOVIES &&
    currentQuery === "" &&
    year !== ""
  ) {
    endpoint = ENDPOINTS.POPULAR_MOVIES;
  }

  const data = await fetchMovies(endpoint, page, query, year);
  const genreMap = await fetchGenres();

  totalPages = Math.min(data.total_pages, 500);

  const movies = data.results.slice(0, 20);

  if (movies.length === 0) {
    isEmpty.style.display = "flex";
    pagination.style.display = "none";
  } else {
    isEmpty.style.display = "none";
    pagination.style.display = "flex";
  }

  movieCardRenderer(movies, catalogMoviesWrapper, genreMap);

  renderPagination();

  catalogMoviesWrapper.onclick = (e) => {
    const li = e.target.closest(".weekly-trends-card");
    if (!li) return;

    const movieId = Number(li.dataset.id);
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      createMoviePopup({
        id: movie.id,
        title: movie.title,
        year: movie.release_date.split("-")[0],
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        overview: movie.overview,
        genres: movie.genre_ids.map((id) => genreMap[id]),
      });
    }
  };
}

function renderPagination() {
  const container = document.querySelector(".catalog-pagination");
  if (!container) return;

  let html = "";

  html += `<button class="pg-prev" ${currentPage === 1 ? "disabled" : ""}>
    <svg width="28" height="28"><use href="${spriteUrl}#icon-chevron-left"></use></svg>
  </button>`;

  html += pageBtn(1);

  if (currentPage > 3) html += `<span class="pg-dots">..</span>`;

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  for (let p = start; p <= end; p++) html += pageBtn(p);

  if (currentPage < totalPages - 2) html += `<span class="pg-dots">..</span>`;

  if (totalPages > 1) html += pageBtn(totalPages);

  html += `<button class="pg-next" ${
    currentPage === totalPages ? "disabled" : ""
  }>
    <svg width="28" height="28"><use href="${spriteUrl}#icon-chevron-right"></use></svg>
  </button>`;

  container.innerHTML = html;

  attachPaginationEvents();
}

function pageBtn(page) {
  const active = page === currentPage ? "pg-active" : "";
  return `<button class="pg-btn ${active}" data-page="${page}">${page
    .toString()
    .padStart(2, "0")}</button>`;
}

function attachPaginationEvents() {
  const buttons = document.querySelectorAll(".pg-btn");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const page = Number(btn.dataset.page);
      loadMovies(
        currentQuery || currentYear
          ? ENDPOINTS.SEARCH_MOVIES
          : ENDPOINTS.POPULAR_MOVIES,
        page,
        currentQuery,
        currentYear
      );
    })
  );

  const prev = document.querySelector(".pg-prev");
  if (prev)
    prev.addEventListener("click", () => {
      if (currentPage > 1)
        loadMovies(
          currentQuery || currentYear
            ? ENDPOINTS.SEARCH_MOVIES
            : ENDPOINTS.POPULAR_MOVIES,
          currentPage - 1,
          currentQuery,
          currentYear
        );
    });

  const next = document.querySelector(".pg-next");
  if (next)
    next.addEventListener("click", () => {
      if (currentPage < totalPages)
        loadMovies(
          currentQuery || currentYear
            ? ENDPOINTS.SEARCH_MOVIES
            : ENDPOINTS.POPULAR_MOVIES,
          currentPage + 1,
          currentQuery,
          currentYear
        );
    });
}

function attachFilterEvents() {
  if (catalogBtn)
    catalogBtn.addEventListener("click", () => {
      loadMovies(
        ENDPOINTS.SEARCH_MOVIES,
        1,
        catalogInput.value.trim(),
        catalogSelect.value
      );
    });

  if (catalogSelect)
    catalogSelect.addEventListener("change", () => {
      loadMovies(
        ENDPOINTS.SEARCH_MOVIES,
        1,
        catalogInput.value.trim(),
        catalogSelect.value
      );
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getDomElements();
  loadCatalogHero();
  populateYearOptions();
  attachFilterEvents();
  loadMovies(ENDPOINTS.POPULAR_MOVIES);
});
function getScreenBreakpoint() {
  const width = window.innerWidth;

  if (width >= 1280) return "w500";
  if (width >= 780) return "w342";
  if (width >= 500) return "w342";
  return "w342";
}

function getScreenBreakpointHero() {
  const width = window.innerWidth;

  if (width >= 1280) return "w1280";
  if (width >= 780) return "w780";
  if (width >= 500) return "w342";
  return "w342";
}
function getScreenBreakpointStars() {
  const width = window.innerWidth;

  if (width >= 1280) return "18";
  if (width >= 780) return "10";
  if (width >= 500) return "14";
  return "14";
}
