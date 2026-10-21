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