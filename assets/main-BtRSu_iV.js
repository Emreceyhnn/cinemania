(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const D="ed2682fe1cd0ecc2efbcdeb7464c5ffd",l={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",SEARCH_MOVIES:"/search/movie"};async function O(e,t=1,n="",a=""){return await(await fetch(`https://api.themoviedb.org/3${e}?api_key=${D}&page=${t}&query=${n}&year=${a}`)).json()}async function Z(e){const a=(await(await fetch(`https://api.themoviedb.org/3/movie/${e}/videos?api_key=ed2682fe1cd0ecc2efbcdeb7464c5ffd`)).json()).results.find(r=>r.site==="YouTube"&&r.type==="Trailer");return a?a.key:null}async function C(){const e=`https://api.themoviedb.org/3/genre/movie/list?api_key=${D}&language=en-US`,n=await(await fetch(e)).json(),a={};return n.genres.forEach(r=>{a[r.id]=r.name}),a}const M=document.querySelector(".library-movies-wrapper"),W=document.querySelector("#empty-library"),m=document.querySelector("#loadMore"),N="myLibrary";let w=20,u;function j(e,t){const n=e.map(a=>Q({id:a.id,title:a.title,poster_path:a.poster_path,overview:a.overview,year:a.year,vote_average:a.vote_average,genre_names:a.genres})).join("");t.innerHTML=n,t.onclick=a=>{const r=a.target.closest(".weekly-trends-card");if(!r)return;const i=Number(r.dataset.id),o=e.find(s=>s.id===i);o&&P({id:o.id,title:o.title,poster_path:o.poster_path,vote_average:o.vote_average,vote_count:o.vote_count,popularity:o.popularity,year:o.year,overview:o.overview,genres:o.genres})}}function b(){return JSON.parse(localStorage.getItem(N))||[]}function Y(e){const t=b();t.some(n=>n.id===e.id)||(t.push(e),localStorage.setItem(N,JSON.stringify(t)))}function F(e){const t=b().filter(n=>n.id!==e);localStorage.setItem(N,JSON.stringify(t))}function I(e){return b().some(t=>t.id===e)}async function ee(){const e=b(),t=[...new Set(e.flatMap(a=>a.genres))];u.innerHTML="";const n=document.createElement("option");n.value="",n.textContent="All Genres",u.appendChild(n),t.forEach(a=>{const r=document.createElement("option");r.value=a,r.textContent=a,u.appendChild(r)})}async function U(){const e=b();m.style.display=e.length>20?"block":"none";const t=e.slice(0,w);j(t,M),w>=e.length&&(m.style.display="none")}function te(){b().length===0?(W.style.display="flex",m.style.display="none",u.style.display="none",M.innerHTML=""):(W.style.display="none",u.style.display="block")}function K(e){if(e.length===0){M.innerHTML="<p>No movies found for this genre.</p>",m.style.display="none";return}const t=e.slice(0,w);j(t,M),m.style.display=e.length>w?"block":"none",m.onclick=()=>{w+=20,K(e)}}function ne(){const e=u.value,t=b();w=20;let n=t;e!==""&&(n=t.filter(a=>{const r=a.genres||a.genre_names||[];return(Array.isArray(r)?r:[r]).includes(e)})),K(n)}document.addEventListener("DOMContentLoaded",()=>{u=document.getElementById("genre-filter"),u&&(u.addEventListener("change",ne),ee(),U(),te(),m.addEventListener("click",()=>{w+=20,U()}))});function P(e){const t=document.createElement("div");t.classList.add("popup-backdrop");const n=I(e.id);t.innerHTML=`
    <div class="popup" >

      <button class="popup-close">×</button>

      <div class="popup-left">
        <img class="popup-poster" src="https://image.tmdb.org/t/p/${re()}${e.poster_path}" alt="${e.title}">
      </div>

      <div class="popup-right">

        <h2 class="popup-title">${e.title}</h2>

        <div class="popup-row">
          <span class="label">Vote / Votes</span>

          <div class="vote-box">${e.vote_average}</div>
          <span class="slash">/</span>
          <div class="vote-count">${e.vote_count}</div>
        </div>

        <div class="popup-row">
          <span class="label">Popularity</span>
          <span class="popup-value">${e.popularity}</span>
        </div>

        <div class="popup-row">
          <span class="label">Genre</span>
          <span class="popup-value">${e.genres.join(", ")}</span>
        </div>

        <h3 class="about-title">ABOUT</h3>
        <div class="overviewWrapper">
        <p class="popup-overview">${e.overview}</p>
        </div> 

        <button class="up-btn" id="library-toggle-btn">
          ${n?"Remove from my library":"Add to my library"}
        </button>

      </div>

    </div>
  `,document.body.appendChild(t),t.querySelector(".popup-close").addEventListener("click",()=>{t.remove()});const a=t.querySelector("#library-toggle-btn");a.addEventListener("click",()=>{I(e.id)?(F(e.id),a.textContent="Add to my library"):(Y(e),a.textContent="Remove from my library")})}function re(){const e=window.innerWidth;return e>=1280?"w500":(e>=780||e>=500,"w342")}const ae=document.getElementById("open-menu"),ie=document.getElementById("close-menu"),J=document.getElementById("mobile-menu");ae.addEventListener("click",()=>{J.classList.add("active")});ie.addEventListener("click",()=>{J.classList.remove("active")});const f="/cinemania/assets/sprite-6mYVYw0_.svg";let c=1,h=1,g="",y="",T,B,v,H,k,x,V;function oe(){T=document.querySelector(".catalog-hero-wrapper"),B=document.querySelector(".catalog-filter-input"),v=document.querySelector(".catalog-filter-select"),H=document.querySelector(".catalog-filter-btn"),k=document.querySelector(".catalog-movies-wrapper"),x=document.querySelector("#empty-catalog"),V=document.querySelector("#pagination")}function se(e){return`
    <section class="container" >
      <div class="catalog-hero"
        style="background-image:
          linear-gradient(83.06deg, #111111 11.91%, rgba(17,17,17,0) 73.11%),
          url('https://image.tmdb.org/t/p/${ye()}${e.poster_path}');
        ">
        <div class="catalog-hero-content">
          <div class="catalog-hero-content-description">
            <h1>${e.title}</h1>
            <div>${z(e.vote_average)}</div>
            <p>${e.overview}</p>
          </div>

          <div class="catalog-hero-content-buttons">
            <button class="catalog-hero-btn">Watch Trailer</button>
            <button class="catalog-hero-btn-details">More Details</button>
          </div>
        </div>
      </div>
    </section>
  `}function z(e){const t=e/2;let n=Math.floor(t),a=t%1>=.5?1:0,r=5-n-a;const i=`<svg width="${$()}" height="${$()}" fill="#ffc226"><use href="${f}#icon-star"></use></svg>`.repeat(n),o=a?`<svg width="${$()}" height="${$()}" fill="#ffc226"><use href="${f}#icon-star-half"></use></svg>`:"",s=`<svg width="${$()}" height="${$()}"><use href="${f}#icon-star-outline"></use></svg>`.repeat(r);return i+o+s}function le(e){const t=document.createElement("div");if(t.classList.add("trailer-backdrop"),!e){t.innerHTML=`
      <div class="no-trailer-modal">
        <button class="no-trailer-close">×</button>

        <p class="no-trailer-text">
          OOPS... We are very sorry! But we couldn’t find the trailer.
        </p>

        <div class="no-trailer-img"></div>
      </div>
    `,document.body.appendChild(t),t.querySelector(".no-trailer-close").addEventListener("click",()=>{t.remove()}),t.addEventListener("click",n=>{n.target===t&&t.remove()});return}t.innerHTML=`
    <div class="trailer-modal">
      <button class="trailer-close">×</button>

      <iframe
        src="https://www.youtube.com/embed/${e}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  `,document.body.appendChild(t),t.querySelector(".trailer-close").addEventListener("click",()=>{t.remove()}),t.addEventListener("click",n=>{n.target===t&&t.remove()})}async function ce(){if(!T)return;const e=await O(l.POPULAR_MOVIES),t=await C(),n=e.results[0],a=se({id:n.id,title:n.title,poster_path:n.poster_path,overview:n.overview,year:n.release_date?.split("-")[0]??"—",vote_average:n.vote_average,genre_names:n.genre_ids.map(o=>t[o]).join(", ")});T.innerHTML=a,document.querySelector(".catalog-hero-btn").addEventListener("click",async()=>{const o=await Z(n.id);o?le(o):alert("Trailer bulunamadı!")});const i=document.querySelector(".catalog-hero-btn-details");i.onclick=o=>{n&&P({id:n.id,title:n.title,year:n.release_date.split("-")[0],poster_path:n.poster_path,vote_average:n.vote_average,vote_count:n.vote_count,popularity:n.popularity,overview:n.overview,genres:n.genre_ids.map(s=>t[s])})}}function de(e=new Date().getFullYear(),t=1980){if(!v)return;const n=document.createElement("option");n.value="",n.textContent="All Years",v.appendChild(n);for(let a=e;a>=t;a--){const r=document.createElement("option");r.value=a,r.textContent=a,v.appendChild(r)}}function Q(e){const t=`https://image.tmdb.org/t/p/${fe()}`;return`
    <li class="weekly-trends-card" data-id="${e.id}"
      style="background:linear-gradient(
        180deg, rgba(0,0,0,0) 63%, rgba(0,0,0,0.9) 92%
      ), url('${t}${e.poster_path}')" data-aos="zoom-in" data-aos-duration="1000">
      
      <div class="weekly-trends-card-desc">
        <h5>${e.title}</h5>
        <p>${e.genre_names} | ${e.year}</p>
      </div>

      <div class="weekly-trends-rating">
        ${z(e.vote_average)}
      </div>
    </li>
  `}function pe(e,t,n){if(!t)return;const a=e.map(r=>Q({id:r.id,title:r.title,poster_path:r.poster_path,overview:r.overview,year:r.release_date?.split("-")[0]||"—",vote_average:r.vote_average,genres:r.genre_ids.map(i=>n[i]).join(", ")})).join("");t.innerHTML=a}async function E(e,t=1,n="",a=""){if(c=t,g=n.trim(),y=a,!k)return;e===l.SEARCH_MOVIES&&g===""&&a!==""&&(e=l.POPULAR_MOVIES);const r=await O(e,t,n,a),i=await C();h=Math.min(r.total_pages,500);const o=r.results.slice(0,20);o.length===0?(x.style.display="flex",V.style.display="none"):(x.style.display="none",V.style.display="flex"),pe(o,k,i),ue(),k.onclick=s=>{const _=s.target.closest(".weekly-trends-card");if(!_)return;const X=Number(_.dataset.id),d=o.find(A=>A.id===X);d&&P({id:d.id,title:d.title,year:d.release_date.split("-")[0],poster_path:d.poster_path,vote_average:d.vote_average,vote_count:d.vote_count,popularity:d.popularity,overview:d.overview,genres:d.genre_ids.map(A=>i[A])})}}function ue(){const e=document.querySelector(".catalog-pagination");if(!e)return;let t="";t+=`<button class="pg-prev" ${c===1?"disabled":""}>
    <svg width="28" height="28"><use href="${f}#icon-chevron-left"></use></svg>
  </button>`,t+=q(1),c>3&&(t+='<span class="pg-dots">..</span>');let n=Math.max(2,c-1),a=Math.min(h-1,c+1);for(let r=n;r<=a;r++)t+=q(r);c<h-2&&(t+='<span class="pg-dots">..</span>'),h>1&&(t+=q(h)),t+=`<button class="pg-next" ${c===h?"disabled":""}>
    <svg width="28" height="28"><use href="${f}#icon-chevron-right"></use></svg>
  </button>`,e.innerHTML=t,ge()}function q(e){return`<button class="pg-btn ${e===c?"pg-active":""}" data-page="${e}">${e.toString().padStart(2,"0")}</button>`}function ge(){document.querySelectorAll(".pg-btn").forEach(a=>a.addEventListener("click",()=>{const r=Number(a.dataset.page);E(g||y?l.SEARCH_MOVIES:l.POPULAR_MOVIES,r,g,y)}));const t=document.querySelector(".pg-prev");t&&t.addEventListener("click",()=>{c>1&&E(g||y?l.SEARCH_MOVIES:l.POPULAR_MOVIES,c-1,g,y)});const n=document.querySelector(".pg-next");n&&n.addEventListener("click",()=>{c<h&&E(g||y?l.SEARCH_MOVIES:l.POPULAR_MOVIES,c+1,g,y)})}function ve(){H&&H.addEventListener("click",()=>{E(l.SEARCH_MOVIES,1,B.value.trim(),v.value)}),v&&v.addEventListener("change",()=>{E(l.SEARCH_MOVIES,1,B.value.trim(),v.value)})}document.addEventListener("DOMContentLoaded",()=>{oe(),ce(),de(),ve(),E(l.POPULAR_MOVIES)});function fe(){const e=window.innerWidth;return e>=1280?"w500":(e>=780||e>=500,"w342")}function ye(){const e=window.innerWidth;return e>=1280?"w1280":e>=780?"w780":(e>=500,"w342")}function $(){const e=window.innerWidth;return e>=1280?"18":e>=780?"10":(e>=500,"14")}const R=document.querySelector(".weekly-trends-list"),G=document.getElementById("upcoming-wrapper");function he(e){const t=e/2;let n=Math.floor(t),a=t%1>=.5?1:0,r=5-n-a;const i=`<svg width="${S()}" height="${S()}" fill="#ffc226"><use href="${f}#icon-star"></use></svg>`.repeat(n),o=a?`<svg width="${S()}" height="${S()}" fill="#ffc226"><use href="${f}#icon-star-half"></use></svg>`:"",s=`<svg width="${S()}" height="${S()}"><use href="${f}#icon-star-outline"></use></svg>`.repeat(r);return i+o+s}function me(e){const t=`https://image.tmdb.org/t/p/${Se()}`;return`
    <li class="weekly-trends-card"  data-id="${e.id}" style="background:linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 63.48%,
      rgba(0, 0, 0, 0.9) 92.16%
    ), url('${t}${e.poster_path}')" >

      <div class="weekly-trends-card-desc">
        <h5>${e.title}</h5>
        <p>${e.genre_names} | ${e.year}</p>
      </div>

      <div class="weekly-trends-rating">
        ${he(e.vote_average)}
      </div>

    </li>
  `}async function we(){if(!R)return;const e=await O(l.TRENDING_WEEK),t=await C(),n=e.results.slice(0,Le()),a=n.map(r=>me({id:r.id,title:r.title,poster_path:r.poster_path,year:r.release_date.split("-")[0],vote_average:r.vote_average,genre_names:r.genre_ids.map(i=>t[i]).join(", ")})).join("");R.innerHTML=a,R.addEventListener("click",r=>{const i=r.target.closest(".weekly-trends-card");if(!i)return;const o=Number(i.dataset.id),s=n.find(_=>_.id===o);s&&P({id:s.id,title:s.title,year:s.release_date.split("-")[0],poster_path:s.poster_path,vote_average:s.vote_average,vote_count:s.vote_count,popularity:s.popularity,overview:s.overview,genres:s.genre_ids.map(_=>t[_])})})}function be(e){const[t,n,a]=e.split("-");return`${a}.${n}.${t}`}function _e(e,t){return`
     <div class="upcoming-card" data-aos="fade-down" data-aos-duration="1000">
      <div class="upcoming-card-img" style="background-image: linear-gradient(307deg, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0) 60%), url('${`https://image.tmdb.org/t/p/${Ee()}`}${e.backdrop_path}')" data-aos="zoom-in" data-aos-duration="1000"> 
      </div> 
      <div class="upcoming-card-content"> 
      <h2 class="up-title">${e.title}</h2> 
      <div class="up-value-wrapper"> 
      <div> 
      <div class="up-row"> 
      <span class="up-label">Release date</span> 
      <span class="up-info up-orange">${be(e.release_date)}
      </span> 
      </div> 
      <div class="up-row"> 
      <span class="up-label">Vote / Votes</span> 
      <div class="up-votes"> 
      <span class="up-box">${e.vote_average.toFixed(1)}</span> 
      <span class="up-slash">/</span> 
      <span class="up-box">${e.vote_count}</span>
      </div> 
      </div> 
      </div> 
      <div> 
      <div class="up-row"> 
      <span class="up-label">Popularity</span> 
      <span class="up-info">${e.popularity.toFixed(1)}</span> 
      </div> 
      <div class="up-row"> 
      <span class="up-label">Genre</span> 
      <span class="up-info">${e.genre_names.join(", ")}</span> 
      </div> 
      </div> 
      </div> 
      <div class="up-row"> 
      <span class="up-label">About</span> 
      </div> 
      <p class="up-about">${e.overview}</p> 
      <button id="upcoming-btn" class="up-btn">${t?"Remove from my library":"Add to my library"}</button> 
        </div> 
        </div>


  `}async function $e(){if(!G)return;const e=await O(l.UPCOMING_MOVIES),t=await C(),n=e.results[0];n.genre_ids.map(i=>t[i]);const a=_e({id:n.id,title:n.title,backdrop_path:n.backdrop_path,release_date:n.release_date,vote_average:n.vote_average,vote_count:n.vote_count,popularity:n.popularity,overview:n.overview},I(n.id));G.innerHTML=a;const r=document.querySelector("#upcoming-btn");r.addEventListener("click",()=>{I(n.id)?(F(n.id),r.textContent="Add to my library"):(Y(n),r.textContent="Remove from my library")})}document.addEventListener("DOMContentLoaded",()=>{$e(),we()});function Se(){const e=window.innerWidth;return e>=1280?"w500":(e>=780||e>=500,"w342")}function Ee(){const e=window.innerWidth;return e>=1280?"w1280":e>=780?"w780":(e>=500,"w342")}function S(){const e=window.innerWidth;return e>=1280?"18":e>=780?"10":(e>=500,"14")}function Le(){return window.innerWidth>321?3:1}const L=document.querySelector("#theme-toggle");let p=localStorage.getItem("theme")!=="light";document.body.classList.toggle("dark",p);L.classList.toggle("active",p);L.classList.toggle("inactive",!p);L.addEventListener("click",()=>{p=!p,document.body.classList.toggle("dark",p),L.classList.toggle("active",p),L.classList.toggle("inactive",!p),localStorage.setItem("theme",p?"dark":"light")});const ke=window.location.pathname.split("/").pop();document.querySelectorAll(".nav-link").forEach(e=>{e.getAttribute("href").split("/").pop()===ke&&e.classList.add("active")});
//# sourceMappingURL=main-BtRSu_iV.js.map
