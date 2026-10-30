import { normalizeSongList, renderSongCards } from "./song-list.js";
export { renderSongCards } from "./song-list.js";
import {
  escapeHtml as e,
  safeUrl,
  renderLyrics,
  descriptionFor,
  validateSongs,
} from "./song-rendering.js";

const fill = (template, values) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Missing template value: ${key}`);
    return values[key];
  });

// One catalog resolver and card renderer serve both the live homepage and static export.
export function getPublishedSongs(songs) {
  const published = normalizeSongList(songs);
  validateSongs(published);

  return {
    published,
    migrated: published,
    drafts: [],
  };
}

// Shared by the optional local script and the browser-only export tool.
export function generateSite({
  songs,
  legacy,
  homeSource,
  shell,
  hymnTemplate,
  praiseTemplate,
  baseUrl = "https://ryancornett.com",
}) {
  const base = new URL(baseUrl);
  if (
    base.protocol !== "https:" ||
    base.pathname !== "/" ||
    base.search ||
    base.hash ||
    base.username ||
    base.password
  )
    throw new Error("The canonical site URL must be an HTTPS origin.");
  const absolute = (value) => new URL(value, base).href;
  const list = (value) =>
    (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);
  const { published, migrated, drafts } = getPublishedSongs(songs);
  function freelyGivenMark() {
    const message =
      "Freely given for private, family, and congregational worship. " +
      "No strings attached.";

    return `
    <span
      class="freely-given"
      tabindex="0"
      role="img"
      aria-label="${e(message)}"
    >
      <wa-icon
        name="hand-holding-heart"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>

      <span class="freely-given-tip" aria-hidden="true">
        ${e(message)}
      </span>
    </span>
  `;
  }
  function link(url, label, freelyGiven = false) {
    return `
    <a href="${e(safeUrl(url))}">${e(label)}</a>
    ${freelyGiven ? freelyGivenMark() : ""}
  `;
  }

  function resourcesFor(song) {
  const arrangements = list(song.arrangements);
  const primary = [];
  const tracks = [];
  const streaming = [];
  let tileNumber = 0;

  function tile(
    url, icon, label, title,
    details = "", notes = "", free = false
  ) {
    const id = `resource-tip-${song.slug}-${++tileNumber}`;

    const accessibleName = [
      title,
      details,
      "opens in a new tab",
    ].filter(Boolean).join(" — ");

    return `
      <li class="resource-item">
        <a
          class="resource-tile"
          href="${e(safeUrl(url))}"
          target="_blank"
          rel="noopener"
          aria-label="${e(accessibleName)}"
          aria-describedby="${id}"
        >
          <wa-icon
            name="${e(icon)}"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>

          <span>${e(label)}</span>

          ${free ? `
            <span class="resource-gift" aria-hidden="true">
              <wa-icon
                name="hand-holding-heart"
                variant="solid"
              ></wa-icon>
            </span>
          ` : ""}
        </a>

        <button
          class="resource-info"
          type="button"
          hidden
          aria-label="${e(
            `Details: ${title}${details ? ` — ${details}` : ""}`
          )}"
          aria-controls="${id}"
          aria-expanded="false"
        >
          <wa-icon
            name="circle-info"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>
        </button>

        <div class="resource-tip" id="${id}" role="tooltip" hidden>
          <strong>${e(title)}</strong>

          ${details ? `<p>${e(details)}</p>` : ""}
          ${notes ? `<p>${e(notes)}</p>` : ""}

          ${free ? `
            <p class="resource-tip-free">
              <wa-icon
                name="hand-holding-heart"
                variant="solid"
                aria-hidden="true"
              ></wa-icon>
              Freely given for private, family, and congregational
              worship. No strings attached.
            </p>
          ` : ""}

          <p class="resource-tip-action">Opens in a new tab.</p>
        </div>
      </li>
    `;
  }

  for (const arrangement of arrangements) {
    const details = [
      arrangement.label,
      arrangement.key,
      arrangement.timeSignature,
      arrangement.modulation
        ? `Modulation: ${arrangement.modulation}`
        : null,
      Number.isFinite(arrangement.tempo) && arrangement.tempo > 0
        ? `Suggested tempo: ${arrangement.tempo} BPM`
        : null,
    ].filter(Boolean).join(" · ");

    if (arrangement.pdf) {
      primary.push(tile(
        arrangement.pdf,
        "file-pdf",
        "Sheet PDF",
        "Sheet music PDF",
        details,
        "",
        true
      ));
    }

    if (arrangement.chordChart) {
      primary.push(tile(
        arrangement.chordChart,
        "clipboard-list",
        "Chords PDF",
        "Chord chart PDF",
        details,
        "",
        true
      ));
    }

    for (const track of list(arrangement.accompanimentTracks)) {
      if (!track.url) continue;

      tracks.push(tile(
        track.url,
        "music",
        `${track.instrument || "Track"} MP3`,
        `${track.instrument || "Accompaniment"} accompaniment track`,
        details,
        track.notes || "",
        true
      ));
    }
  }

  if (
    song.sheetUrl &&
    !arrangements.some(arrangement => arrangement.pdf === song.sheetUrl)
  ) {
    primary.push(tile(
      song.sheetUrl,
      "file-pdf",
      "Sheet PDF",
      "Sheet music PDF",
      "",
      "",
      true
    ));
  }

  const info = song.helpfulSongInfo || {};

  if (info.accompanimentVideoUrl) {
    primary.push(tile(
      info.accompanimentVideoUrl,
      "circle-play",
      "Watch video",
      "Accompaniment video on YouTube",
      "",
      "Watch online."
    ));
  }

  if (info.worshipVideoUrl) {
    primary.push(tile(
      info.worshipVideoUrl,
      "file-video",
      "Video MP4",
      "Accompaniment video MP4",
      "",
      "Preview or download through Google Drive. " +
        "Download before your service for offline playback.",
      true
    ));
  }

  for (const stream of list(song.streamingLinks)) {
    if (!stream.url) continue;

    streaming.push(tile(
      stream.url,
      "headphones",
      stream.platform || "Listen",
      `Listen on ${stream.platform || "streaming service"}`
    ));
  }

  const player = song.demo_mp3
    ? `<audio
         class="song-audio"
         controls
         preload="none"
         aria-label="${e(song.title)} demo"
       >
         <source
           src="${e(`/audio/${song.slug}.mp3`)}"
           type="audio/mpeg"
         >
         <a href="${e(`/audio/${song.slug}.mp3`)}">
           Listen to the demo
         </a>
       </audio>`
    : "";

  const previewPdf =
    arrangements.find(arrangement => arrangement.pdf)?.pdf ||
    arrangements.find(arrangement => arrangement.chordChart)?.chordChart ||
    song.sheetUrl;

  const image = song.sheetImage
    ? `<img
         loading="lazy"
         src="${e(safeUrl(song.sheetImage))}"
         data-fallback-src="${e(
           `/img/sheet-music/${song.slug}.png`
         )}"
         onerror="this.onerror = null; this.src = this.dataset.fallbackSrc;"
         alt="Sheet music or chord chart for ${e(song.title)}"
       >`
    : "";

  const preview = image
    ? previewPdf
      ? `<a
           class="sheet-preview"
           href="${e(safeUrl(previewPdf))}"
           target="_blank"
           rel="noopener"
           aria-label="Open PDF for ${e(song.title)} (opens in a new tab)"
         >${image}</a>`
      : `<div class="sheet-preview">${image}</div>`
    : "";

  return `
    <h2>Listen &amp; sing</h2>
    ${player}

    ${primary.length ? `
      <ul class="resource-grid" aria-label="Sheet music and videos">
        ${primary.join("")}
      </ul>
    ` : ""}

    ${preview}

    ${tracks.length ? `
      <h3 class="resource-group-heading">Accompaniment tracks</h3>
      <ul class="resource-grid" aria-label="Accompaniment tracks">
        ${tracks.join("")}
      </ul>
    ` : ""}

    ${streaming.length ? `
      <h3 class="resource-group-heading">Also listen on</h3>
      <ul class="resource-grid" aria-label="Streaming services">
        ${streaming.join("")}
      </ul>
    ` : ""}

    ${
      !player && !primary.length && !preview &&
      !tracks.length && !streaming.length
        ? "<p>Recordings and sheet music will be added as they become available.</p>"
        : ""
    }
  `;
}

  function detailsFor(song) {
    if (!song.lyrics && song.detailsHtml) return song.detailsHtml;
    const meta = song.songMetadata;
    return [
      ["Words", meta.wordsBy],
      ["Music", meta.musicBy],
      ["Tune", meta.tune],
      ["Meter", meta.meter],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `<p><strong>${label}:</strong> ${e(value)}</p>`)
      .join("");
  }

  function aboutFor(song) {
    const short = song.helpfulSongInfo?.about;
    const text = short ? `<p>${e(short)}</p>` : "";
    const long = song.aboutHtml || "";
    if (!text && !long) return "";
    return `<section class="about-song"><h2>About the song</h2>${text}${long}</section>`;
  }

  function referencesFor(song) {
    const info = song.helpfulSongInfo;
    if (!info) return "";
    return `${info.themes?.length ? `<section class="references"><h2>Themes</h2><ul class="tags">${info.themes.map((theme) => `<li>${e(theme)}</li>`).join("")}</ul></section>` : ""}${info.scriptureReferences?.length ? `<section class="references"><h2>Scripture references</h2><p>${info.scriptureReferences.map(e).join("; ")}</p></section>` : ""}`;
  }

  function shareFor(canonical, title) {
    return `<div class="share" aria-label="Share this song"><button type="button" data-share hidden>Share</button><button type="button" data-copy>Copy link</button><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}">Facebook</a><a href="mailto:?subject=${encodeURIComponent(title)}&amp;body=${encodeURIComponent(canonical)}">Email</a><span class="share-status" role="status" aria-live="polite"></span></div>`;
  }

  function relatedMetadata(song) {
    const normalize = (value) =>
      String(value).trim().toLowerCase().replace(/\s+/g, " ");

    const info = song.helpfulSongInfo || {};

    // Maps prevent repeated themes or references from inflating the score.
    const themes = new Map(
      list(info.themes)
        .filter(Boolean)
        .map((theme) => [normalize(theme), String(theme)]),
    );

    const chapters = new Map();

    for (const reference of list(info.scriptureReferences)) {
      // For example: "John 15:1-8" becomes "John 15".
      const match = String(reference)
        .trim()
        .match(/^(.+?)\s+(\d+)(?=\s*:|\s*$)/);

      if (!match) continue;

      const book = match[1].replace(/\s+/g, " ").trim();
      const chapter = Number(match[2]);

      // Treat "Psalm" and "Psalms" as the same book.
      const key = `${normalize(book).replace(/^psalms$/, "psalm")} ${chapter}`;

      chapters.set(key, `${book} ${chapter}`);
    }

    return { themes, chapters };
  }

  function relatedFor(song) {
    const source = relatedMetadata(song);

    const matches = published
      .filter(
        (candidate) =>
          candidate.slug !== song.slug && candidate.published !== false,
      )
      .map((candidate) => {
        const other = relatedMetadata(candidate);

        const themes = [...source.themes]
          .filter(([key]) => other.themes.has(key))
          .map(([, label]) => label);

        const chapters = [...source.chapters]
          .filter(([key]) => other.chapters.has(key))
          .map(([, label]) => label);

        return {
          song: candidate,
          themes,
          chapters,
          score: themes.length * 2 + chapters.length * 3,
        };
      })
      .filter((match) => match.score > 0)
      .sort(
        (a, b) => b.score - a.score || a.song.title.localeCompare(b.song.title),
      )
      .slice(0, 3);

    if (!matches.length) return "";

    const cards = matches
      .map((match) => {
        const related = match.song;
        const directory =
          related.songMetadata.type === "Praise Song" ? "songs" : "hymns";

        const reasons = [
          ...match.themes.slice(0, 2),
          ...match.chapters.slice(0, 1),
        ];

        return `
      <li>
        <a href="/${directory}/${e(related.slug)}/">
          <span class="related-song-title">${e(related.title)}</span>
          <span class="related-song-reason">
            Shared: ${e(reasons.join(" · "))}
          </span>
        </a>
      </li>
    `;
      })
      .join("");

    return `
    <section class="related-songs" aria-labelledby="related-songs-title">
      <h2 id="related-songs-title">You may also like</h2>
      <p>Songs with shared themes or Scripture chapters.</p>
      <ul class="related-song-list">${cards}</ul>
    </section>
  `;
  }

  const rendered = [];

  for (const song of published) {
    const isPraise = song.songMetadata.type === "Praise Song";
    const directory = isPraise ? "songs" : "hymns";
    const canonical = absolute(`/${directory}/${song.slug}/`);

    const imagePath = song.previewImage || "/img/RyanC.webp";
    const image = new URL(safeUrl(imagePath, base.href), base).href;

    if (!image.startsWith("https://")) {
      throw new Error(`Preview image must use HTTPS: ${song.title}`);
    }

    const content = fill(isPraise ? praiseTemplate : hymnTemplate, {
      title: e(song.title),
      type: e(song.songMetadata.type),
      details: detailsFor(song),
      lyrics: song.lyrics?.length
        ? renderLyrics(song.lyrics)
        : song.lyricsHtml || "<p>Lyrics and resources are coming soon.</p>",
      resources: resourcesFor(song),
      about: aboutFor(song),
      references: referencesFor(song),
      share: shareFor(canonical, song.title),
      related: relatedFor(song),
    });

    const html = fill(shell, {
      pageTitle: e(`${song.title} | Ryan Cornett`),
      description: e(descriptionFor(song)),
      canonical: e(canonical),
      image: e(image),
      imageAlt: e(
        song.previewImage ? `Artwork for ${song.title}` : "Ryan Cornett",
      ),
      content,
    });

    rendered.push({ song, html, canonical, directory });
  }

  const files = new Map();

  for (const { song, html, directory } of rendered) {
    files.set(`${directory}/${song.slug}/index.html`, html);
  }
  const cards = renderSongCards(published);
  if (!homeSource.includes("<!-- SONGS_START -->"))
    throw new Error("Home page is missing the song-list markers.");
  const home = homeSource
    .replace(
      /<!-- SONGS_START -->[\s\S]*?<!-- SONGS_END -->/,
      `<!-- SONGS_START -->\n${cards}\n<!-- SONGS_END -->`,
    )
    .replace(
      /<!-- SONG_COUNT_START -->[\s\S]*?<!-- SONG_COUNT_END -->/,
      `<!-- SONG_COUNT_START -->${published.length}<!-- SONG_COUNT_END -->`,
    );
  files.set("index.html", home);
  files.set(
    "catalog.json",
    JSON.stringify(
      published.map((song) => ({
        title: song.title,
        slug: song.slug,
        type: song.songMetadata.type,
        url: `/${
          song.songMetadata.type === "Praise Song" ? "songs" : "hymns"
        }/${song.slug}/`,
      })),
      null,
      2,
    ) + "\n",
  );
  files.set(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[base.href, ...rendered.map((page) => page.canonical)].map((url) => `<url><loc>${e(url)}</loc></url>`).join("")}</urlset>\n`,
  );
  files.set(
    "robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${absolute("/sitemap.xml")}\n`,
  );
  files.set("CNAME", base.hostname + "\n");
  files.set(".nojekyll", "");
  return { files, published, migrated, drafts };
}
