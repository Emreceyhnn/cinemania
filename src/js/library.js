import { createWeeklyTrendCard } from "./catalog";
import { createMoviePopup } from "./modal";

const movieListEl = document.querySelector(".library-movies-wrapper");
const isEmpty = document.querySelector("#empty-library");
const loadMoreBtn = document.querySelector("#loadMore");

const LIBRARY_KEY = "myLibrary";
let sliceEnd = 20;
let select;

function movieCardRenderer(list, location) {
  const markup = list
    .map((movie) =>
      createWeeklyTrendCard({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        year: movie.year,
        vote_average: movie.vote_average,
        genre_names: movie.genres,
      })
    )
    .join("");

  location.innerHTML = markup;

  location.onclick = (e) => {
    const li = e.target.closest(".weekly-trends-card");
    if (!li) return;

    const movieId = Number(li.dataset.id);
    const movie = list.find((m) => m.id === movieId);
    if (!movie) return;

    createMoviePopup({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      year: movie.year,
      overview: movie.overview,
      genres: movie.genres,
    });
  };
}

export function getLibrary() {
  return JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
}

export function addFilm(movie) {
  const library = getLibrary();
  if (!library.some((f) => f.id === movie.id)) {
    library.push(movie);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
}

export function removeFilm(id) {
  const filtered = getLibrary().filter((f) => f.id !== id);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(filtered));
}

export function isInLibrary(id) {
  return getLibrary().some((f) => f.id === id);
}

export async function genreSelect() {
  const movies = getLibrary();
  const genres = [...new Set(movies.flatMap((m) => m.genres))];

  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "All Genres";
  select.appendChild(defaultOption);

  genres.forEach((genreName) => {
    const option = document.createElement("option");
    option.value = genreName;
    option.textContent = genreName;
    select.appendChild(option);
  });
}

export async function getMovieCard() {
  const movies = getLibrary();

  loadMoreBtn.style.display = movies.length > 20 ? "block" : "none";

  const moviesList = movies.slice(0, sliceEnd);
  movieCardRenderer(moviesList, movieListEl);

  if (sliceEnd >= movies.length) {
    loadMoreBtn.style.display = "none";
  }
}

function isLibraryEmpty() {
  const movies = getLibrary();

  if (movies.length === 0) {
    isEmpty.style.display = "flex";
    loadMoreBtn.style.display = "none";
    select.style.display = "none";
    movieListEl.innerHTML = "";
  } else {
    isEmpty.style.display = "none";
    select.style.display = "block";
  }
}

function renderFilteredMovies(movies) {
  if (movies.length === 0) {
    movieListEl.innerHTML = "<p>No movies found for this genre.</p>";
    loadMoreBtn.style.display = "none";
    return;
  }

  const moviesList = movies.slice(0, sliceEnd);
  movieCardRenderer(moviesList, movieListEl);

  loadMoreBtn.style.display = movies.length > sliceEnd ? "block" : "none";

  loadMoreBtn.onclick = () => {
    sliceEnd += 20;
    renderFilteredMovies(movies);
  };
}

function handleGenreFilter() {
  const selected = select.value;
  const movies = getLibrary();

  sliceEnd = 20;

  let filteredMovies = movies;

  if (selected !== "") {
    filteredMovies = movies.filter((movie) => {
      const genres = movie.genres || movie.genre_names || [];

      // Array değilse array'e çevir
      const genreArray = Array.isArray(genres) ? genres : [genres];

      return genreArray.includes(selected);
    });
  }

  renderFilteredMovies(filteredMovies);
}

document.addEventListener("DOMContentLoaded", () => {
  select = document.getElementById("genre-filter");
  if (!select) return;

  select.addEventListener("change", handleGenreFilter);

  genreSelect();
  getMovieCard();
  isLibraryEmpty();

  loadMoreBtn.addEventListener("click", () => {
    sliceEnd += 20;
    getMovieCard();
  });
});
