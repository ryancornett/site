import {
  generateSite,
  getPublishedSongs,
} from "../site-generator.js";
import { zipTextFiles } from './zip.js';
const button = document.getElementById('export-button');
const status = document.getElementById('export-status');
async function textFile(relative) {
  const response = await fetch(new URL(relative, import.meta.url), {cache:'no-store'});
  if (!response.ok) throw new Error(`Could not load ${relative}. Open the site folder itself in Live Server.`);
  const html = await response.text();

return html.replace(
  /<!-- Code injected by live-server -->\s*<script\b[^>]*>[\s\S]*?<\/script>/gi,
  ""
);
}
button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = 'Reading your catalog and generating the pages…';
  try {
    const [{default:songs}, homeSource, shell, hymnTemplate, praiseTemplate] = await Promise.all([
      import(`../songs.js?updated=${Date.now()}`), textFile('../index.html'),
      textFile('../templates/page.html'), textFile('../templates/hymn.html'), textFile('../templates/praise-song.html')
    ]);
    const { files, published } = generateSite({songs, homeSource, shell, hymnTemplate, praiseTemplate});
    const blob = zipTextFiles(files);
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a'); download.href = url; download.download = 'ryancornett-updated-pages.zip';
    document.body.append(download); download.click(); download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = `Exported ${published.length} song pages, their URL aliases, and the updated homepage/catalog. Extract the ZIP into your site folder to apply the changes.`;
  } catch (error) {
    status.textContent = `Export stopped: ${error.message} No files have been changed.`;
  } finally { button.disabled = false; }
});

/* Resource checking helpers. */
function createResourceChecker(base, fetchFile = fetch) {
  const cache = new Map();

  return function checkFile(path, kind) {
    if (!path) {
      return Promise.resolve({
        state: "none",
        text: "Not added",
      });
    }

    let url;

    try {
      url = new URL(path, base);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Unsupported URL");
      }
    } catch {
      return Promise.resolve({
        state: "missing",
        text: "Invalid URL",
        detail: String(path),
      });
    }

    // External links may require permissions or reject browser checks.
    if (url.origin !== new URL(base).origin) {
      return Promise.resolve({
        state: "external",
        text: "External link supplied",
      });
    }

    const key = `${url.href}|${kind}`;

    if (!cache.has(key)) {
      cache.set(key, (async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        try {
          // HEAD checks availability without downloading the recording.
          const response = await fetchFile(url, {
            method: "HEAD",
            cache: "no-store",
            signal: controller.signal,
          });

          const type = (
            response.headers.get("content-type") || ""
          ).toLowerCase();

          if ([404, 410].includes(response.status)) {
            return {
              state: "missing",
              text: "File missing",
              detail: url.pathname,
            };
          }

          if (!response.ok) {
            return {
              state: "unknown",
              text: "Could not verify",
              detail: `${url.pathname} (HTTP ${response.status})`,
            };
          }

          // Catch servers returning an HTML error page with status 200.
          if (type.includes("text/html")) {
            return {
              state: "missing",
              text: "HTML returned instead of file",
              detail: url.pathname,
            };
          }

          const expected = kind === "pdf"
            ? type.includes("application/pdf")
            : type.startsWith(`${kind}/`);

          if (!expected && !type.includes("application/octet-stream")) {
            return {
              state: "unknown",
              text: "File type unverified",
              detail: url.pathname,
            };
          }

          return {
            state: "ok",
            text: "Local file verified",
          };
        } catch {
          return {
            state: "unknown",
            text: "Could not verify",
            detail: url.pathname,
          };
        } finally {
          clearTimeout(timeout);
        }
      })());
    }

    return cache.get(key);
  };
}

async function inspectSongResources(song, checkFile) {
  const array = value =>
    Array.isArray(value) ? value.filter(Boolean) : [];

  const arrangements = array(song.arrangements);

  async function group(urls, kind) {
    if (!urls.length) {
      return { state: "none", text: "Not added" };
    }

    const results = await Promise.all(
      urls.map(url => checkFile(url, kind))
    );

    const missing = results.filter(result => result.state === "missing");
    const unknown = results.filter(result => result.state === "unknown");
    const external = results.filter(
      result => result.state === "external"
    ).length;
    const local = results.filter(result => result.state === "ok").length;

    return {
      state: missing.length
        ? "missing"
        : unknown.length
          ? "unknown"
          : external
            ? "external"
            : "ok",

      text: [
        local && `${local} local verified`,
        external && `${external} external`,
        missing.length && `${missing.length} missing/invalid`,
        unknown.length && `${unknown.length} unverified`,
      ].filter(Boolean).join(" · "),

      detail: [...missing, ...unknown]
        .map(result => result.detail)
        .filter(Boolean)
        .join("; "),
    };
  }

  // Match the generator: a supplied demo value enables the local MP3.
  const demo = song.demo_mp3
    ? await checkFile(`/audio/${song.slug}.mp3`, "audio")
    : { state: "none", text: "Not added" };

  let preview = await checkFile(song.sheetImage, "image");

  if (preview.state === "missing" && song.sheetImage) {
    const fallback = await checkFile(
      `/img/sheet-music/${song.slug}.png`,
      "image"
    );

    preview = fallback.state === "ok"
      ? { state: "ok", text: "PNG fallback verified" }
      : {
          ...fallback,
          detail: [preview.detail, fallback.detail]
            .filter(Boolean)
            .join("; "),
        };
  }

  const pdfs = await group(
    arrangements.map(arrangement => arrangement.pdf).filter(Boolean),
    "pdf"
  );

  const tracks = await group(
    arrangements
      .flatMap(arrangement => array(arrangement.accompanimentTracks))
      .map(track => track.url)
      .filter(Boolean),
    "audio"
  );

  const video = song.helpfulSongInfo?.accompanimentVideoUrl;

  return [
    demo,
    pdfs,
    preview,
    tracks,
    video
      ? { state: "external", text: "Link supplied; check manually" }
      : { state: "none", text: "Not added" },
  ];
}

/* Add the checklist controls to the existing exporter page. */
const resourceCheckButton = document.createElement("button");
resourceCheckButton.type = "button";
resourceCheckButton.className =
  "button button-outline resource-check-button";
resourceCheckButton.textContent = "Check resources";

button.after(resourceCheckButton);

const resourceReport = document.createElement("section");
resourceReport.className = "resource-report";
resourceReport.hidden = true;
resourceReport.setAttribute("aria-labelledby", "resource-report-title");

resourceReport.innerHTML = `
  <h2 id="resource-report-title">Resource checklist</h2>

  <p id="resource-report-status" role="status" aria-live="polite"></p>

  <p class="resource-report-note">
    Local files are checked through Live Server.
    External links are counted but need a manual check.
    “Not added” means the resource is optional and has not been supplied.
  </p>

  <div class="resource-table-wrap" tabindex="0"
    role="region" aria-label="Song resource checklist">
    <table class="resource-table">
      <thead>
        <tr>
          <th scope="col">Song</th>
          <th scope="col">Demo</th>
          <th scope="col">PDFs</th>
          <th scope="col">Preview</th>
          <th scope="col">Accompaniment</th>
          <th scope="col">Accompaniment video</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
`;

status.after(resourceReport);

resourceCheckButton.addEventListener("click", async () => {
  if (button.disabled) return;

  button.disabled = true;
  resourceCheckButton.disabled = true;
  resourceReport.hidden = false;

  const reportStatus = resourceReport.querySelector(
    "#resource-report-status"
  );
  const tableBody = resourceReport.querySelector("tbody");

  tableBody.replaceChildren();
  reportStatus.textContent = "Reading song data…";

  try {
    const { default: songs } = await import(
      `../songs.js?resourceCheck=${Date.now()}`
    );

    const { published } = getPublishedSongs(songs);

    // A fresh checker means each run checks the files again.
    const checkFile = createResourceChecker(
      new URL("../", import.meta.url).href
    );

    let checked = 0;
    let missingSongs = 0;
    let unverifiedSongs = 0;

    // Process four songs at a time.
    for (let start = 0; start < published.length; start += 4) {
      const batch = published.slice(start, start + 4);

      const results = await Promise.all(
        batch.map(song => inspectSongResources(song, checkFile))
      );

      batch.forEach((song, index) => {
        const cells = results[index];
        const row = document.createElement("tr");
        const heading = document.createElement("th");

        heading.scope = "row";
        heading.textContent = song.title;
        row.append(heading);

        for (const result of cells) {
          const cell = document.createElement("td");
          const badge = document.createElement("span");

          badge.className = `resource-result resource-${result.state}`;
          badge.textContent = result.text;
          cell.append(badge);

          if (result.detail) {
            const detail = document.createElement("small");
            detail.textContent = result.detail;
            cell.append(detail);
          }

          row.append(cell);
        }

        if (cells.some(cell => cell.state === "missing")) missingSongs++;
        if (cells.some(cell => cell.state === "unknown")) unverifiedSongs++;

        tableBody.append(row);
      });

      checked += batch.length;
      reportStatus.textContent =
        `Checked ${checked} of ${published.length} songs…`;
    }

    reportStatus.textContent =
      `${checked} songs checked. ` +
      `${missingSongs} with missing or invalid files; ` +
      `${unverifiedSongs} with checks that could not be verified.`;
  } catch (error) {
    reportStatus.textContent = `Resource check stopped: ${error.message}`;
  } finally {
    button.disabled = false;
    resourceCheckButton.disabled = false;
  }
});