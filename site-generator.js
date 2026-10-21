import { renderSongCards } from "./song-list.js";
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
export function getPublishedSongs(songs, legacy = []) {
  const oldBySlug = new Map(legacy.map((song) => [song.slug, song]));
  // Old positional constructors are work in progress. Do not publish their placeholder metadata.
  // A migrated record has a numeric ID or a slug (rather than "Hymn" in its slug field).
  const migrated = songs.filter(
    (song) =>
      typeof song.id === "number" ||
      /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(song.slug),
  );
  const drafts = songs.filter((song) => !migrated.includes(song));
  const catalog = new Map(legacy.map((song) => [song.slug, song]));
  for (const song of migrated) {
    if (song.published === false) {
      catalog.delete(song.slug);
      continue;
    }
    const old = oldBySlug.get(song.slug);
    const merged = { ...old, ...song };
    // Existing local MP3s play directly; a Drive sharing URL is offered as a link instead.
    merged.demo_mp3 = song.demo_mp3 || old?.demo_mp3;
    merged.sheetImage = song.sheetImage || old?.sheetImage;
    merged.lyricVideoUrl =
      song.helpfulSongInfo?.lyricVideoUrl || old?.lyricVideoUrl;
    catalog.set(song.slug, merged);
  }
  validateSongs(migrated);
  const published = [...catalog.values()].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  validateSongs(published);
  return { published, migrated, drafts };
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
  const { published, migrated, drafts } = getPublishedSongs(songs, legacy);
  function link(url, label) {
    return `<a href="${e(safeUrl(url))}">${e(label)}</a>`;
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
    for (const arrangement of list(song.arrangements)) {
      const label = [
        arrangement.label,
        arrangement.key,
        arrangement.timeSignature,
        arrangement.modulation && `Modulation: ${arrangement.modulation}`,
      ]
        .filter(Boolean)
        .join(" · ");
      if (arrangement.pdf) links.push(link(arrangement.pdf, `${label} — PDF`));
      if (arrangement.chordChart)
        links.push(link(arrangement.chordChart, `${label} — chord chart`));
      if (arrangement.png)
        links.push(link(arrangement.png, `${label} — sheet image`));
      for (const track of list(arrangement.accompanimentTracks)) {
        if (track.url)
          links.push(
            link(
              track.url,
              `${label} — ${track.instrument}${track.notes ? ` (${track.notes})` : ""}`,
            ),
          );
      }
    }
    for (const stream of list(song.streamingLinks))
      if (stream.url)
        links.push(link(stream.url, `Listen on ${stream.platform}`));
    if (song.lyricVideoUrl)
      links.push(link(song.lyricVideoUrl, "Watch the lyric video on YouTube"));
    const sheet = song.sheetImage
      ? `<a class="sheet-preview" href="${e(safeUrl(song.sheetUrl || song.sheetImage))}"><img loading="lazy" src="${e(safeUrl(song.sheetImage))}" alt="Sheet music for ${e(song.title)}"></a>`
      : "";
    return `<h2>Listen &amp; sing</h2>${player}${links.length ? `<ul>${links.map((item) => `<li>${item}</li>`).join("")}</ul>` : !player ? "<p>Recordings and sheet music will be added as they become available.</p>" : ""}${sheet}`;
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
        url: `/songs/${song.slug}/`,
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
