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
    const links = [];
    let player = "";

    if (song.demo_mp3) {
      const audioUrl = `/audio/${song.slug}.mp3`;

      player = `
    <audio
      class="song-audio"
      controls
      preload="none"
      aria-label="${e(song.title)} demo"
    >
      <source src="${e(audioUrl)}" type="audio/mpeg">
      <a href="${e(audioUrl)}">Listen to the demo</a>
    </audio>
  `;
    }
    if (song.sheetUrl) links.push(link(song.sheetUrl, "Sheet music"));
    const arrangementResources = list(song.arrangements).map(arrangement => {
  const label = [
    arrangement.label,
    arrangement.key,
    arrangement.timeSignature,
    arrangement.modulation
      ? `Modulation: ${arrangement.modulation}`
      : null,
    typeof arrangement.tempo === "number" &&
    Number.isFinite(arrangement.tempo) &&
    arrangement.tempo > 0
      ? `Suggested tempo: ${arrangement.tempo} BPM`
      : null,
  ].filter(Boolean).join(" · ");

  const pdf = arrangement.pdf
    ? `<p class="sheet-pdf">
         <a href="${e(safeUrl(arrangement.pdf))}">
           <wa-icon
             name="file-pdf"
             variant="solid"
             aria-hidden="true"
           ></wa-icon>
           Sheet music PDF
         </a>
         ${freelyGivenMark()}
       </p>`
    : "";

  const chordChart = arrangement.chordChart
    ? `<p class="chord-chart">
         ${link(arrangement.chordChart, "Chord chart", true)}
       </p>`
    : "";

  const tracks = list(arrangement.accompanimentTracks)
    .filter(track => track.url)
    .map(track => `
      <li>
        ${e(track.instrument || "Accompaniment")}
        ${track.notes ? ` · ${e(track.notes)}` : ""}
        · ${link(track.url, "MP3", true)}
      </li>
    `)
    .join("");

  if (!pdf && !chordChart && !tracks) return "";

  return `
    <div class="arrangement-resources">
      ${label ? `<h3 class="arrangement-heading">${e(label)}</h3>` : ""}
      ${pdf}
      ${chordChart}
      ${tracks ? `
        <h4 class="accompaniment-heading">Accompaniment tracks</h4>
        <ul class="accompaniment-tracks">${tracks}</ul>
      ` : ""}
    </div>
  `;
}).filter(Boolean);
    for (const stream of list(song.streamingLinks))
      if (stream.url)
        links.push(link(stream.url, `Listen on ${stream.platform}`));
    if (song.helpfulSongInfo.lyricVideoUrl)
      links.push(link(song.helpfulSongInfo.lyricVideoUrl, "Watch the lyric video on YouTube"));
    
    const previewPdf = list(song.arrangements).find(
  arrangement => arrangement.pdf
)?.pdf;

const previewImage = song.sheetImage
  ? `<img
       loading="lazy"
       src="${e(safeUrl(song.sheetImage))}"
       data-fallback-src="${e(`/img/sheet-music/${song.slug}.png`)}"
       onerror="this.onerror = null; this.src = this.dataset.fallbackSrc;"
       alt="Sheet music for ${e(song.title)}">
    `
  : "";

const sheet = previewImage
  ? previewPdf
    ? `<a class="sheet-preview"
          href="${e(safeUrl(previewPdf))}"
          target="_blank"
          rel="noopener"
          aria-label="Open PDF sheet music for ${e(song.title)} (new tab)">
         ${previewImage}
       </a>`
    : `<div class="sheet-preview">${previewImage}</div>`
  : "";
    return `
  <h2>Listen &amp; sing</h2>
  ${player}
  ${arrangementResources.join("")}
  ${links.length
    ? `<ul>${links.map(item => `<li>${item}</li>`).join("")}</ul>`
    : ""}
  ${!player && !arrangementResources.length && !links.length
    ? "<p>Recordings and sheet music will be added as they become available.</p>"
    : ""}
  ${sheet}
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
  const normalize = value =>
    String(value).trim().toLowerCase().replace(/\s+/g, " ");

  const info = song.helpfulSongInfo || {};

  // Maps prevent repeated themes or references from inflating the score.
  const themes = new Map(
    list(info.themes)
      .filter(Boolean)
      .map(theme => [normalize(theme), String(theme)])
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
    const key =
      `${normalize(book).replace(/^psalms$/, "psalm")} ${chapter}`;

    chapters.set(key, `${book} ${chapter}`);
  }

  return { themes, chapters };
}

function relatedFor(song) {
  const source = relatedMetadata(song);

  const matches = published
    .filter(candidate =>
      candidate.slug !== song.slug &&
      candidate.published !== false
    )
    .map(candidate => {
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
    .filter(match => match.score > 0)
    .sort((a, b) =>
      b.score - a.score ||
      a.song.title.localeCompare(b.song.title)
    )
    .slice(0, 3);

  if (!matches.length) return "";

  const cards = matches.map(match => {
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
  }).join("");

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
