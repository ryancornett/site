/* Homepage song search, filtering, and pagination. */
(() => {
  const container = document.getElementById("songs-container");
  if (!container) return;

  const search = document.getElementById("song-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
  const count = document.getElementById("song-count");
  const clear = document.getElementById("clear-search");
  const empty = document.getElementById("song-empty");

  let songs = [...container.querySelectorAll(".song")];
  let activeFilter = "all";
  let pageSize = 10;
  let currentPage = 1;

  const pagination = document.createElement("nav");
  pagination.className = "song-pagination";
  pagination.setAttribute("aria-label", "Songbook pages");

  pagination.innerHTML = `
    <label class="song-page-size">
      Songs per page
      <select id="song-page-size">
        <option value="10" selected>10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </label>

    <div class="song-page-navigation">
  <button type="button" id="song-page-first"
    aria-controls="songs-container">First</button>

  <button type="button" id="song-page-prev"
    aria-controls="songs-container">← Previous</button>

  <div id="song-page-numbers" class="song-page-numbers"></div>

  <button type="button" id="song-page-next"
    aria-controls="songs-container">Next →</button>

  <button type="button" id="song-page-last"
    aria-controls="songs-container">Last</button>
</div>

<span id="song-page-status" class="sr-only" role="status"
  aria-live="polite" aria-atomic="true"></span>
  `;

  container.after(pagination);

  const sizeSelect = pagination.querySelector("#song-page-size");
  const previous = pagination.querySelector("#song-page-prev");
  const next = pagination.querySelector("#song-page-next");
  const pageStatus = pagination.querySelector("#song-page-status");
  const first = pagination.querySelector("#song-page-first");
const last = pagination.querySelector("#song-page-last");
const pageNumbers = pagination.querySelector("#song-page-numbers");

let totalPages = 1;

  const normalize = value =>
    String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘]/g, "'");

  function updateSongs() {
    const query = search?.value.trim() || "";
    const terms = normalize(query).split(/\s+/).filter(Boolean);

    const matches = songs.filter(song => {
      const text = normalize(song.dataset.search || song.textContent);
      const matchesSearch = terms.every(term => text.includes(term));
      const matchesType =
        activeFilter === "all" ||
        song.dataset.type === activeFilter;

      return matchesSearch && matchesType;
    });

    totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);

    const start = (currentPage - 1) * pageSize;
    const pageSongs = matches.slice(start, start + pageSize);

    songs.forEach(song => {
      song.hidden = true;
    });

    pageSongs.forEach(song => {
      song.hidden = false;
    });

    if (count) {
      count.textContent = matches.length
        ? `Showing ${start + 1}–${start + pageSongs.length} of ${
            matches.length
          } ${matches.length === 1 ? "song" : "songs"}${
            matches.length !== songs.length
              ? ` (${songs.length} total)`
              : ""
          }`
        : `0 songs (${songs.length} total)`;
    }

    if (empty) empty.hidden = matches.length !== 0;
    if (clear) clear.hidden = !query;

    filters.forEach(button => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === activeFilter)
      );
    });

    pagination.hidden = matches.length === 0;
    pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
    previous.disabled = currentPage === 1;
    next.disabled = currentPage === totalPages;

    first.disabled = currentPage === 1;
last.disabled = currentPage === totalPages;

// Keep existing buttons when possible, preserving keyboard focus.
if (pageNumbers.children.length !== totalPages) {
  pageNumbers.innerHTML = Array.from(
    { length: totalPages },
    (_, index) => `
      <button
        type="button"
        data-page="${index + 1}"
        aria-label="Page ${index + 1}"
        aria-controls="songs-container"
      >${index + 1}</button>
    `
  ).join("");
}

for (const button of pageNumbers.children) {
  if (Number(button.dataset.page) === currentPage) {
    button.setAttribute("aria-current", "page");
  } else {
    button.removeAttribute("aria-current");
  }
}
  }

  function restartPages() {
    currentPage = 1;
    updateSongs();
  }

  search?.addEventListener("input", restartPages);

  filters.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      restartPages();
    });
  });

  clear?.addEventListener("click", () => {
    if (search) search.value = "";
    restartPages();
    search?.focus();
  });

  document.getElementById("reset-songs")?.addEventListener("click", () => {
    if (search) search.value = "";
    activeFilter = "all";
    restartPages();
    search?.focus();
  });

  sizeSelect.addEventListener("change", () => {
    pageSize = Number(sizeSelect.value);
    restartPages();
  });

function goToPage(page) {
  currentPage = Math.min(Math.max(1, page), totalPages);
  updateSongs();
  container.scrollIntoView({ block: "start" });
}

previous.addEventListener("click", () => goToPage(currentPage - 1));
next.addEventListener("click", () => goToPage(currentPage + 1));
first.addEventListener("click", () => goToPage(1));
last.addEventListener("click", () => goToPage(totalPages));

pageNumbers.addEventListener("click", event => {
  const button = event.target.closest("button[data-page]");
  if (button) goToPage(Number(button.dataset.page));
});

  container.addEventListener("songs:updated", () => {
    songs = [...container.querySelectorAll(".song")];
    restartPages();
  });

  const controls = document.getElementById("song-controls");
  if (controls) controls.hidden = false;

  updateSongs();

  import("./song-list.js").catch(error => {
    console.error("Could not load song-list.js:", error);

    if (count) {
      count.textContent = `Could not load song-list.js: ${error.message}`;
      count.setAttribute("data-error", "true");
    }
  });
})();

/* Featured-song hero carousel. */
(async () => {
  const hero = document.getElementById("hero");
  const gallery = document.getElementById("featured-gallery");
  if (!hero || !gallery) return;

  try {
    const { default: songs } = await import("./songs.js");

    const featured = songs.filter(song =>
      song.published !== false &&
      song.featured?.image &&
      song.slug
    );

    if (!featured.length) return;

    const slidesContainer = document.getElementById("featured-slides");
    const toggle = document.getElementById("featured-toggle");
    const previous = document.getElementById("featured-prev");
    const next = document.getElementById("featured-next");
    const position = document.getElementById("featured-position");
    const status = document.getElementById("featured-status");

    const slides = featured.map((song, index) => {
      const slide = document.createElement("article");
      slide.className = "featured-slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute(
        "aria-label",
        `${index + 1} of ${featured.length}`
      );

      slide.innerHTML = `
        <img class="featured-image" alt="">
        <div class="featured-copy">
          <p class="eyebrow">Featured song</p>
          <h2></h2>
          <p class="featured-info"></p>
          <a class="button button-light">
            Listen &amp; view
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      `;

      const image = slide.querySelector("img");
      image.src = song.featured.image;
      image.loading = index === 0 ? "eager" : "lazy";

      slide.querySelector("h2").textContent = song.title;

      const info = slide.querySelector(".featured-info");
      info.textContent = song.featured.info || "";
      info.hidden = !song.featured.info;

      const directory =
        song.songMetadata?.type === "Praise Song" ? "songs" : "hymns";

      slide.querySelector("a").href =
        `/${directory}/${song.slug}/`;

      slide.hidden = index !== 0;
      return slide;
    });

    slidesContainer.replaceChildren(...slides);

    let current = 0;
let timer = null;
let playing = true;

const rotationDelay = 8000;
const multipleSlides = slides.length > 1;

// Keep one icon element instead of recreating it on every update.
toggle.innerHTML = `
  <wa-icon variant="solid" aria-hidden="true"></wa-icon>
`;

const rotationIcon = toggle.querySelector("wa-icon");

function clearRotationTimer() {
  clearTimeout(timer);
  timer = null;
}

function showSlide(index, announce = false) {
  // Wrap correctly in both directions.
  current = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((slide, index) => {
    slide.hidden = index !== current;
  });

  position.textContent = `${current + 1} / ${slides.length}`;

  if (announce) {
    status.textContent =
      `${current + 1} of ${slides.length}: ${featured[current].title}`;
  }
}

function updateRotation() {
  // Always clear the previous timer before scheduling another.
  clearRotationTimer();

  const label = playing ? "Pause rotation" : "Play rotation";

  toggle.setAttribute("aria-label", label);
  toggle.title = label;
  rotationIcon.setAttribute("name", playing ? "pause" : "play");

  if (!playing || !multipleSlides || document.hidden) return;

  timer = setTimeout(() => {
    // Never automatically hide a slide containing keyboard focus.
    if (slidesContainer.contains(document.activeElement)) {
      playing = false;
      updateRotation();
      return;
    }

    showSlide(current + 1);
    updateRotation();
  }, rotationDelay);
}

toggle.addEventListener("click", () => {
  playing = !playing;
  updateRotation();
});

previous.addEventListener("click", () => {
  showSlide(current - 1, true);
  updateRotation();
});

next.addEventListener("click", () => {
  showSlide(current + 1, true);
  updateRotation();
});

// Pause when someone focuses a link inside a slide.
// They can explicitly resume using the Play button.
slidesContainer.addEventListener("focusin", () => {
  playing = false;
  updateRotation();
});

// Suspend timers in background tabs.
// Returning starts a fresh countdown if rotation is enabled.
document.addEventListener("visibilitychange", updateRotation);

toggle.hidden = !multipleSlides;
previous.hidden = !multipleSlides;
next.hidden = !multipleSlides;

gallery.hidden = false;
hero.classList.add("has-featured");

showSlide(0);
updateRotation();
  } catch (error) {
    console.error("Featured songs could not load:", error);
  }
})();