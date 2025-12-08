import "./css/style.css";
import { loadCatalogHero } from "./js/catalog.js";
import { loadUpcomingMovie, loadWeeklyTrends } from "./js/home.js";

const btn = document.querySelector("#theme-toggle");

let isDark = localStorage.getItem("theme") === "light" ? false : true;
document.body.classList.toggle("dark", isDark);
btn.classList.toggle("active", isDark);
btn.classList.toggle("inactive", !isDark);

btn.addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("dark", isDark);
  btn.classList.toggle("active", isDark);
  btn.classList.toggle("inactive", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const currentPath = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach((link) => {
  const linkPath = link.getAttribute("href").split("/").pop();

  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});
