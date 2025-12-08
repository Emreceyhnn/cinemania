(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const G="ed2682fe1cd0ecc2efbcdeb7464c5ffd",l={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",SEARCH_MOVIES:"/search/movie"};async function M(e,t=1,n="",a=""){return await(await fetch(`https://api.themoviedb.org/3${e}?api_key=${G}&page=${t}&query=${n}&year=${a}`)).json()}async function J(e){const a=(await(await fetch(`https://api.themoviedb.org/3/movie/${e}/videos?api_key=ed2682fe1cd0ecc2efbcdeb7464c5ffd`)).json()).results.find(r=>r.site==="YouTube"&&r.type==="Trailer");return a?a.key:null}async function I(){const e=`https://api.themoviedb.org/3/genre/movie/list?api_key=${G}&language=en-US`,n=await(await fetch(e)).json(),a={};return n.genres.forEach(r=>{a[r.id]=r.name}),a}function O(e){const t=document.createElement("div");t.classList.add("popup-backdrop");const n=k(e.id);t.innerHTML=`
    <div class="popup" >

      <button class="popup-close">×</button>

      <div class="popup-left">
        <img class="popup-poster" src="https://image.tmdb.org/t/p/${Q()}${e.poster_path}" alt="${e.title}">
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

        <p class="popup-overview">${e.overview}</p>

        <button class="up-btn" id="library-toggle-btn">
          ${n?"Remove from my library":"Add to my library"}
        </button>

      </div>

    </div>
  `,document.body.appendChild(t),t.querySelector(".popup-close").addEventListener("click",()=>{t.remove()});const a=t.querySelector("#library-toggle-btn");a.addEventListener("click",()=>{k(e.id)?(F(e.id),a.textContent="Add to my library"):(j(e),a.textContent="Remove from my library")})}function Q(){const e=window.innerWidth;return e>=1280?"w500":(e>=780||e>=500,"w342")}const X=document.getElementById("open-menu"),Z=document.getElementById("close-menu"),U=document.getElementById("mobile-menu");X.addEventListener("click",()=>{U.classList.add("active")});Z.addEventListener("click",()=>{U.classList.remove("active")});const $=document.querySelector(".library-movies-wrapper"),V=document.querySelector("#empty-library"),m=document.querySelector("#loadMore"),B="myLibrary";let h=20,v;function D(e,t){const n=e.map(a=>K({id:a.id,title:a.title,poster_path:a.poster_path,overview:a.overview,year:a.year,vote_average:a.vote_average,genre_names:a.genres})).join("");t.innerHTML=n,t.onclick=a=>{const r=a.target.closest(".weekly-trends-card");if(!r)return;const o=Number(r.dataset.id),i=e.find(s=>s.id===o);i&&O({id:i.id,title:i.title,poster_path:i.poster_path,vote_average:i.vote_average,vote_count:i.vote_count,popularity:i.popularity,year:i.year,overview:i.overview,genres:i.genres})}}function b(){return JSON.parse(localStorage.getItem(B))||[]}function j(e){const t=b();t.some(n=>n.id===e.id)||(t.push(e),localStorage.setItem(B,JSON.stringify(t)))}function F(e){const t=b().filter(n=>n.id!==e);localStorage.setItem(B,JSON.stringify(t))}function k(e){return b().some(t=>t.id===e)}async function ee(){const e=b(),t=[...new Set(e.flatMap(a=>a.genres))];v.innerHTML="";const n=document.createElement("option");n.value="",n.textContent="All Genres",v.appendChild(n),t.forEach(a=>{const r=document.createElement("option");r.value=a,r.textContent=a,v.appendChild(r)})}async function N(){const e=b();m.style.display=e.length>20?"block":"none";const t=e.slice(0,h);D(t,$),h>=e.length&&(m.style.display="none")}function te(){b().length===0?(V.style.display="flex",m.style.display="none",v.style.display="none",$.innerHTML=""):(V.style.display="none",v.style.display="block")}function Y(e){if(e.length===0){$.innerHTML="<p>No movies found for this genre.</p>",m.style.display="none";return}const t=e.slice(0,h);D(t,$),m.style.display=e.length>h?"block":"none",m.onclick=()=>{h+=20,Y(e)}}function ne(){const e=v.value,t=b();h=20;let n=t;e!==""&&(n=t.filter(a=>a.genres.includes(e))),Y(n)}document.addEventListener("DOMContentLoaded",()=>{v=document.getElementById("geenre-filtr"),v.addEventListener("change",ne),ee(),N(),te(),m.addEventListener("click",()=>{h+=20,N()})});const W=document.querySelector(".weekly-trends-list"),re=document.getElementById("upcoming-wrapper");function x(e){const t=e/2;let n=Math.floor(t),a=t%1>=.5?1:0,r=5-n-a;const o=`<svg width="${_()}" height="${_()}" fill="#ffc226"><use href="/src/img/sprite.svg#icon-star"></use></svg>`.repeat(n),i=a?`<svg width="${_()}" height="${_()}" fill="#ffc226"><use href="/src/img/sprite.svg#icon-star-half"></use></svg>`:"",s=`<svg width="${_()}" height="${_()}"><use href="/src/img/sprite.svg#icon-star-outline"></use></svg>`.repeat(r);return o+i+s}function ae(e){const t=`https://image.tmdb.org/t/p/${ce()}`;return`
    <li class="weekly-trends-card"  data-id="${e.id}" style="background:linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 63.48%,
      rgba(0, 0, 0, 0.9) 92.16%
    ), url('${t}${e.poster_path}')" data-aos="zoom-in" data-aos-duration="1000">

      <div class="weekly-trends-card-desc">
        <h5>${e.title}</h5>
        <p>${e.genre_names} | ${e.year}</p>
      </div>

      <div class="weekly-trends-rating">
        ${x(e.vote_average)}
      </div>

    </li>
  `}async function oe(){const e=await M(l.TRENDING_WEEK),t=await I(),n=e.results.slice(0,pe()),a=n.map(r=>ae({id:r.id,title:r.title,poster_path:r.poster_path,year:r.release_date.split("-")[0],vote_average:r.vote_average,genre_names:r.genre_ids.map(o=>t[o]).join(", ")})).join("");W.innerHTML=a,W.addEventListener("click",r=>{const o=r.target.closest(".weekly-trends-card");if(!o)return;const i=Number(o.dataset.id),s=n.find(w=>w.id===i);s&&O({id:s.id,title:s.title,year:s.release_date.split("-")[0],poster_path:s.poster_path,vote_average:s.vote_average,vote_count:s.vote_count,popularity:s.popularity,overview:s.overview,genres:s.genre_ids.map(w=>t[w])})})}function ie(e){const[t,n,a]=e.split("-");return`${a}.${n}.${t}`}function se(e,t){return`
     <div class="upcoming-card" data-aos="fade-down" data-aos-duration="1000">
      <div class="upcoming-card-img" style="background-image: linear-gradient(307deg, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0) 60%), url('${`https://image.tmdb.org/t/p/${de()}`}${e.backdrop_path}')" data-aos="zoom-in" data-aos-duration="1000"> 
      </div> 
      <div class="upcoming-card-content"> 
      <h2 class="up-title">${e.title}</h2> 
      <div class="up-value-wrapper"> 
      <div> 
      <div class="up-row"> 
      <span class="up-label">Release date</span> 
      <span class="up-info up-orange">${ie(e.release_date)}
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
      <span class="up-info">${e.genres.join(", ")}</span> 
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


  `}async function le(){const e=await M(l.UPCOMING_MOVIES),t=await I(),n=e.results[0],a=n.genre_ids.map(i=>t[i]),r=se({id:n.id,title:n.title,backdrop_path:n.backdrop_path,release_date:n.release_date,vote_average:n.vote_average,vote_count:n.vote_count,popularity:n.popularity,genres:a,overview:n.overview},k(n.id));re.innerHTML=r;const o=document.querySelector("#upcoming-btn");o.addEventListener("click",()=>{k(n.id)?(F(n.id),o.textContent="Add to my library"):(j(n),o.textContent="Remove from my library")})}document.addEventListener("DOMContentLoaded",()=>{le(),oe()});function ce(){const e=window.innerWidth;return e>=1280?"w500":(e>=780||e>=500,"w342")}function de(){const e=window.innerWidth;return e>=1280?"w1280":e>=780?"w780":(e>=500,"w342")}function _(){const e=window.innerWidth;return e>=1280?"18":e>=780?"10":(e>=500,"14")}function pe(){return window.innerWidth>321?3:1}let c=1,y=1,u="",f="",A,q,g,R,L,T,H;function ue(){A=document.querySelector(".catalog-hero-wrapper"),q=document.querySelector(".catalog-filter-input"),g=document.querySelector(".catalog-filter-select"),R=document.querySelector(".catalog-filter-btn"),L=document.querySelector(".catalog-movies-wrapper"),T=document.querySelector("#empty-catalog"),H=document.querySelector("#pagination")}function ge(e){return`
    <section class="container" >
      <div class="catalog-hero"
        style="background-image:
          linear-gradient(83.06deg, #111111 11.91%, rgba(17,17,17,0) 73.11%),
          url('https://image.tmdb.org/t/p/${Ee()}${e.poster_path}');
        ">
        <div class="catalog-hero-content">
          <div class="catalog-hero-content-description">
            <h1>${e.title}</h1>
            <div>${x(e.vote_average)}</div>
            <p>${e.overview}</p>
          </div>

          <div class="catalog-hero-content-buttons">
            <button class="catalog-hero-btn">Watch Trailer</button>
            <button class="catalog-hero-btn-details">More Details</button>
          </div>
        </div>
      </div>
    </section>
  `}function ve(e){const t=document.createElement("div");if(t.classList.add("trailer-backdrop"),!e){t.innerHTML=`
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
  `,document.body.appendChild(t),t.querySelector(".trailer-close").addEventListener("click",()=>{t.remove()}),t.addEventListener("click",n=>{n.target===t&&t.remove()})}async function fe(){if(!A)return;const e=await M(l.POPULAR_MOVIES),t=await I(),n=e.results[0],a=ge({id:n.id,title:n.title,poster_path:n.poster_path,overview:n.overview,year:n.release_date?.split("-")[0]??"—",vote_average:n.vote_average,genre_names:n.genre_ids.map(i=>t[i]).join(", ")});A.innerHTML=a,document.querySelector(".catalog-hero-btn").addEventListener("click",async()=>{const i=await J(n.id);i?ve(i):alert("Trailer bulunamadı!")});const o=document.querySelector(".catalog-hero-btn-details");o.onclick=i=>{n&&O({id:n.id,title:n.title,year:n.release_date.split("-")[0],poster_path:n.poster_path,vote_average:n.vote_average,vote_count:n.vote_count,popularity:n.popularity,overview:n.overview,genres:n.genre_ids.map(s=>t[s])})}}function ye(e=new Date().getFullYear(),t=1980){if(!g)return;const n=document.createElement("option");n.value="",n.textContent="All Years",g.appendChild(n);for(let a=e;a>=t;a--){const r=document.createElement("option");r.value=a,r.textContent=a,g.appendChild(r)}}function K(e){const t=`https://image.tmdb.org/t/p/${_e()}`;return`
    <li class="weekly-trends-card" data-id="${e.id}"
      style="background:linear-gradient(
        180deg, rgba(0,0,0,0) 63%, rgba(0,0,0,0.9) 92%
      ), url('${t}${e.poster_path}')" data-aos="zoom-in" data-aos-duration="1000">
      
      <div class="weekly-trends-card-desc">
        <h5>${e.title}</h5>
        <p>${e.genre_names} | ${e.year}</p>
      </div>

      <div class="weekly-trends-rating">
        ${x(e.vote_average)}
      </div>
    </li>
  `}function me(e,t,n){if(!t)return;const a=e.map(r=>K({id:r.id,title:r.title,poster_path:r.poster_path,overview:r.overview,year:r.release_date?.split("-")[0]||"—",vote_average:r.vote_average,genre_names:r.genre_ids.map(o=>n[o]).join(", ")})).join("");t.innerHTML=a}async function E(e,t=1,n="",a=""){if(c=t,u=n.trim(),f=a,!L)return;e===l.SEARCH_MOVIES&&u===""&&a!==""&&(e=l.POPULAR_MOVIES);const r=await M(e,t,n,a),o=await I();y=Math.min(r.total_pages,500);const i=r.results.slice(0,20);i.length===0?(T.style.display="flex",H.style.display="none"):(T.style.display="none",H.style.display="flex"),me(i,L,o),he(),L.onclick=s=>{const w=s.target.closest(".weekly-trends-card");if(!w)return;const z=Number(w.dataset.id),d=i.find(C=>C.id===z);d&&O({id:d.id,title:d.title,year:d.release_date.split("-")[0],poster_path:d.poster_path,vote_average:d.vote_average,vote_count:d.vote_count,popularity:d.popularity,overview:d.overview,genres:d.genre_ids.map(C=>o[C])})}}function he(){const e=document.querySelector(".catalog-pagination");if(!e)return;let t="";t+=`<button class="pg-prev" ${c===1?"disabled":""}>
    <svg width="28" height="28"><use href="/src/img/sprite.svg#icon-chevron-left"></use></svg>
  </button>`,t+=P(1),c>3&&(t+='<span class="pg-dots">..</span>');let n=Math.max(2,c-1),a=Math.min(y-1,c+1);for(let r=n;r<=a;r++)t+=P(r);c<y-2&&(t+='<span class="pg-dots">..</span>'),y>1&&(t+=P(y)),t+=`<button class="pg-next" ${c===y?"disabled":""}>
    <svg width="28" height="28"><use href="/src/img/sprite.svg#icon-chevron-right"></use></svg>
  </button>`,e.innerHTML=t,be()}function P(e){return`<button class="pg-btn ${e===c?"pg-active":""}" data-page="${e}">${e.toString().padStart(2,"0")}</button>`}function be(){document.querySelectorAll(".pg-btn").forEach(a=>a.addEventListener("click",()=>{const r=Number(a.dataset.page);E(u||f?l.SEARCH_MOVIES:l.POPULAR_MOVIES,r,u,f)}));const t=document.querySelector(".pg-prev");t&&t.addEventListener("click",()=>{c>1&&E(u||f?l.SEARCH_MOVIES:l.POPULAR_MOVIES,c-1,u,f)});const n=document.querySelector(".pg-next");n&&n.addEventListener("click",()=>{c<y&&E(u||f?l.SEARCH_MOVIES:l.POPULAR_MOVIES,c+1,u,f)})}function we(){R&&R.addEventListener("click",()=>{E(l.SEARCH_MOVIES,1,q.value.trim(),g.value)}),g&&g.addEventListener("change",()=>{E(l.SEARCH_MOVIES,1,q.value.trim(),g.value)})}document.addEventListener("DOMContentLoaded",()=>{ue(),fe(),ye(),we(),E(l.POPULAR_MOVIES)});function _e(){const e=window.innerWidth;return e>=1280?"w500":(e>=780||e>=500,"w342")}function Ee(){const e=window.innerWidth;return e>=1280?"w1280":e>=780?"w780":(e>=500,"w342")}const S=document.querySelector("#theme-toggle");let p=localStorage.getItem("theme")!=="light";document.body.classList.toggle("dark",p);S.classList.toggle("active",p);S.classList.toggle("inactive",!p);S.addEventListener("click",()=>{p=!p,document.body.classList.toggle("dark",p),S.classList.toggle("active",p),S.classList.toggle("inactive",!p),localStorage.setItem("theme",p?"dark":"light")});const Se=window.location.pathname.split("/").pop();document.querySelectorAll(".nav-link").forEach(e=>{e.getAttribute("href").split("/").pop()===Se&&e.classList.add("active")});
//# sourceMappingURL=main-C9oPtseV.js.map
