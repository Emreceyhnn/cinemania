import { fetchMovies, fetchGenres, ENDPOINTS } from "./fetchApi.js";
import { addFilm, isInLibrary, removeFilm } from "./library.js";
import { createMoviePopup } from "./modal.js";

const weeklyList = document.querySelector(".weekly-trends-list");
const wrapper = document.getElementById("upcoming-wrapper");

export function createStars(vote) {
  const rating = vote / 2;

  let full = Math.floor(rating);
  let half = rating % 1 >= 0.5 ? 1 : 0;
  let empty = 5 - full - half;

  const fullStars =
    `<svg width="${getScreenBreakpointStars()}" height="${getScreenBreakpointStars()}" fill="#ffc226"><use href="./src/img/sprite.svg#icon-star"></use></svg>`.repeat(
      full
    );

  const halfStar = half
    ? `<svg width="${getScreenBreakpointStars()}" height="${getScreenBreakpointStars()}" fill="#ffc226"><use href="./src/img/sprite.svg#icon-star-half"></use></svg>`
    : "";

  const emptyStars =
    `<svg width="${getScreenBreakpointStars()}" height="${getScreenBreakpointStars()}"><use href="/cinemania/src/img/sprite.svg#icon-star-outline"></use></svg>`.repeat(
      empty
    );

  return fullStars + halfStar + emptyStars;
}

export function createWeeklyTrendCard(movie) {
  const IMG = `https://image.tmdb.org/t/p/${getScreenBreakpoint()}`;

  return `
    <li class="weekly-trends-card"  data-id="${
      movie.id
    }" style="background:linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 63.48%,
      rgba(0, 0, 0, 0.9) 92.16%
    ), url('${IMG}${movie.poster_path}')" >

      <div class="weekly-trends-card-desc">
        <h5>${movie.title}</h5>
        <p>${movie.genre_names} | ${movie.year}</p>
      </div>

      <div class="weekly-trends-rating">
        ${createStars(movie.vote_average)}
      </div>

    </li>
  `;
}

export async function loadWeeklyTrends() {
  const data = await fetchMovies(ENDPOINTS.TRENDING_WEEK);
  const genreMap = await fetchGenres();

  const movies = data.results.slice(0, getScreenBreakpointSlicer());

  const markup = movies
    .map((movie) =>
      createWeeklyTrendCard({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        year: movie.release_date.split("-")[0],
        vote_average: movie.vote_average,
        genre_names: movie.genre_ids.map((id) => genreMap[id]).join(", "),
      })
    )
    .join("");

  weeklyList.innerHTML = markup;

  weeklyList.addEventListener("click", (e) => {
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
  });
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

function createUpcomingMovieCard(movie, inLibrary) {
  const IMG = `https://image.tmdb.org/t/p/${getScreenBreakpointHero()}`;

  return `
     <div class="upcoming-card" data-aos="fade-down" data-aos-duration="1000">
      <div class="upcoming-card-img" style="background-image: linear-gradient(307deg, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0) 60%), url('${IMG}${
    movie.backdrop_path
  }')" data-aos="zoom-in" data-aos-duration="1000"> 
      </div> 
      <div class="upcoming-card-content"> 
      <h2 class="up-title">${movie.title}</h2> 
      <div class="up-value-wrapper"> 
      <div> 
      <div class="up-row"> 
      <span class="up-label">Release date</span> 
      <span class="up-info up-orange">${formatDate(movie.release_date)}
      </span> 
      </div> 
      <div class="up-row"> 
      <span class="up-label">Vote / Votes</span> 
      <div class="up-votes"> 
      <span class="up-box">${movie.vote_average.toFixed(1)}</span> 
      <span class="up-slash">/</span> 
      <span class="up-box">${movie.vote_count}</span>
      </div> 
      </div> 
      </div> 
      <div> 
      <div class="up-row"> 
      <span class="up-label">Popularity</span> 
      <span class="up-info">${movie.popularity.toFixed(1)}</span> 
      </div> 
      <div class="up-row"> 
      <span class="up-label">Genre</span> 
      <span class="up-info">${movie.genres.join(", ")}</span> 
      </div> 
      </div> 
      </div> 
      <div class="up-row"> 
      <span class="up-label">About</span> 
      </div> 
      <p class="up-about">${movie.overview}</p> 
      <button id="upcoming-btn" class="up-btn">${
        inLibrary ? "Remove from my library" : "Add to my library"
      }</button> 
        </div> 
        </div>


  `;
}

export async function loadUpcomingMovie() {
  const data = await fetchMovies(ENDPOINTS.UPCOMING_MOVIES);
  const genreMap = await fetchGenres();

  const movie = data.results[0];
  const genres = movie.genre_ids.map((id) => genreMap[id]);

  const markup = createUpcomingMovieCard(
    {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genres: genres,
      overview: movie.overview,
    },
    isInLibrary(movie.id)
  );

  wrapper.innerHTML = markup;
  const btn = document.querySelector("#upcoming-btn");

  btn.addEventListener("click", () => {
    if (isInLibrary(movie.id)) {
      removeFilm(movie.id);
      btn.textContent = "Add to my library";
    } else {
      addFilm(movie);
      btn.textContent = "Remove from my library";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadUpcomingMovie();
  loadWeeklyTrends();
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

function getScreenBreakpointSlicer() {
  const width = window.innerWidth;

  return width > 321 ? 3 : 1;
}
