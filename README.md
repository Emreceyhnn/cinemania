🎬 Cinemania — Modern Movie Discovery App

Cinemania is a fast, modern, and fully responsive movie discovery application powered by the TMDB API.
It provides trending movies, upcoming releases, a full catalog with filtering, and a personal movie library stored locally.
Built with Vite, optimized for performance, and deployed on GitHub Pages.

🔗 Live Demo: https://emreceyhnn.github.io/cinemania/

🔗 GitHub Repository: https://github.com/Emreceyhnn/cinemania

📸 Screenshots

(Optional — add images here if you want hero/catalog/modal previews.)

🚀 Getting Started
1. Clone the Repository
```
git clone https://github.com/Emreceyhnn/cinemania
cd cinemania
```
2. Install Dependencies
```
npm install
```
4. Start the Development Server
```
npm run dev
```
🔧 Production Build

Generate a production-ready build:
```
npm run build
```

This can be deployed automatically to GitHub Pages.

The project is fully responsive and adapts seamlessly across all major screen sizes.
A clean and minimal breakpoint structure is used to ensure consistent layout, spacing, and typography on every device.

Breakpoints used in the project:

1280px  — Desktop
Optimized for large screens with full layout, extended spacing, and enhanced visuals.

780px  — Tablet
Adjusted component scaling, balanced typography, and improved readability for medium-sized screens.

320px — Mobile
Mobile-first layout with simplified structure, larger touch targets, and optimized vertical spacing.

⚡ Performance Tests (Lighthouse)

Below are mobile and desktop Lighthouse results after optimizations.

📱 Mobile
Metric	Score
Performance	85–90
Accessibility	98
Best Practices	96
SEO	90
🖥️ Desktop
Metric	Score
Performance	97
Accessibility	98
Best Practices	96
SEO	90

🟢 After major improvements (CLS fixes, caching, render-blocking removal), the project consistently scores in the green zone.

🧩 Technologies Used

HTML5

CSS3 (Responsive Layout, Flexbox/Grid)

JavaScript (ES6 Modules)

Vite 7

AOS Animations

TMDB API

LocalStorage

GitHub Pages

🎥 Key Features
⭐ Trending Movies

Displays weekly trending movies fetched from TMDB in a modern card layout.

🔥 Upcoming Movies

Shows upcoming releases with large backdrop images and gradient overlays.

🎬 Catalog Page

Includes:

Search

Genre filtering

Paginated results

Responsive grid

📚 My Library (LocalStorage)

Allows users to save their favorite movies into a personal library stored locally.

🌗 Dark / Light Theme Support

Automatic theme detection + manual toggle.

🔍 Movie Details Modal

Opens a detailed popup with:

Vote average / vote count

Popularity

Overview

Genres

Add/Remove from Library

⚡ High Performance Optimizations

Cinemania includes:

Aspect-ratio fixes for zero CLS shifting

Lazy-loaded dynamic sections

Optimized caching

Non-blocking JS & fonts

Vite-optimized bundles

🛠️ Project Structure
```
cinemania/
│
├── src/
│   ├── css/
│   ├── img/
│   ├── js/
│   ├── sections/
│   ├── index.html
│   ├── catalog.html
│   ├── myLibrary.html
│
├── vite.config.js
├── package.json
└── README.md
```
👤 Author

Emre Ceyhan
🔗 GitHub: https://github.com/Emreceyhnn
