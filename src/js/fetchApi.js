const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p";

export { BASE_URL, IMG_BASE_URL };

export const ENDPOINTS = {
  POPULAR_MOVIES: "/movie/popular",
  UPCOMING_MOVIES: "/movie/upcoming",
  TRENDING_WEEK: "/trending/movie/week",
  TRENDING_DAY: "/trending/movie/day",
  SEARCH_MOVIES: "/search/movie",
  GENRE_LIST: "/genre/movie/list",
  MOVIE_DETAILS: (movieId) => `/movie/${movieId}`,
  MOVIE_VIDEOS: (movieId) => `/movie/${movieId}/videos`,
  IMG_ORIGINAL: "/original",
  IMG_W500: "/w500",
  IMG_W780: "/w780",
  IMG_W1280: "/w1280",
};

export async function fetchMovies(endpoint, page = 1, query = "", year = "") {
  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&page=${page}&query=${query}&year=${year}`
  );
  return await res.json();
}

export async function fetchMoviesBySearch(endpoint, page, query, year) {
  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&page=${page}&query=${query}&year=${year}`
  );
  return await res.json();
}

export async function fetchTrailerKey(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ed2682fe1cd0ecc2efbcdeb7464c5ffd`
  );

  const data = await res.json();

  const trailer = data.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  return trailer ? trailer.key : null;
}

export async function fetchGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  const res = await fetch(url);
  const data = await res.json();

  const genreMap = {};
  data.genres.forEach((g) => {
    genreMap[g.id] = g.name;
  });

  return genreMap;
}
