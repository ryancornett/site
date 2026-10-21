/* Homepage song cards. This module depends only on your songs.js array. */
function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}
const array = value => Array.isArray(value) ? value : [];

export function normalizeSongList(songs) {
  if (!Array.isArray(songs)) throw new Error('songs.js must export the songs array with: export default songs;');
  const seen = new Set();
  const normalized = [];
  for (const song of songs) {
    if (!song || song.published === false) continue;
    const title = typeof song.title === 'string' ? song.title.trim() : '';
    // Support the current schema and the transitional /songs/... ID format.
    let slug = typeof song.slug === 'string' ? song.slug : '';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      const path = typeof song.id === 'string' ? song.id : song.link;
      slug = typeof path === 'string' ? path.match(/^\/songs\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/)?.[1] || '' : '';
    }
    if (!title || !slug || seen.has(slug)) {
      console.warn('Skipped a song with a missing title, invalid/duplicate slug:', song);
      continue;
    }
    seen.add(slug);
    const metadata = song.songMetadata && typeof song.songMetadata === 'object' && !Array.isArray(song.songMetadata) ? song.songMetadata : {};
    const info = song.helpfulSongInfo && typeof song.helpfulSongInfo === 'object' && !Array.isArray(song.helpfulSongInfo) ? song.helpfulSongInfo : {};
    const oldType = ['Hymn','Psalm','Praise Song','Folk Spiritual','Kids/VBS Song'].includes(song.slug) ? song.slug : null;
    normalized.push({
      ...song, title, slug,
      songMetadata: {...metadata, type: metadata.type || song.type || oldType || 'Hymn', tune: metadata.tune || song.tune || null},
      helpfulSongInfo: {...info, themes:array(info.themes), scriptureReferences:array(info.scriptureReferences), playableOnGuitar: Boolean(info.playableOnGuitar || song.forGuitar)}
    });
  }
  if (songs.some(song => song && song.published !== false) && !normalized.length) throw new Error('Invalid song data: no entries have both a title and a usable slug.');
  return normalized.sort((a,b) => a.title.localeCompare(b.title));
}

// This is the function that creates every <article class="song">.
export function renderSongCards(songs) {
  return songs.map((song,index) => {
    const metadata = song.songMetadata || {};
    const info = song.helpfulSongInfo || {};
    const recommendation = info.recommended
  ? `<span
       class="song-recommendation"
       role="img"
       aria-label="One of Ryan's top recommendations"
       tabindex="0"
     >
       <span aria-hidden="true">★</span>
       <span class="song-recommendation-tip" aria-hidden="true">
         One of Ryan's top recommendations
       </span>
     </span>`
  : "";
    const type = metadata.type === 'Praise Song' ? 'praise' : 'hymn';
    const directory =
  metadata.type === "Praise Song" ? "songs" : "hymns";
    const search = [song.title, metadata.type, metadata.tune, ...array(info.themes), ...array(info.scriptureReferences)].filter(Boolean).join(' ');
    return `<article class="song" data-type="${type}" data-search="${escapeHtml(search)}">
  <span class="song-number" aria-hidden="true">${String(index + 1).padStart(2,'0')}</span>
  <div>
    <h3 class="song-title">
  <a href="/${directory}/${escapeHtml(song.slug)}/">${escapeHtml(song.title)}</a>
  ${recommendation}
</h3>
    <p class="song-meta"><span class="song-chip">${escapeHtml(metadata.type || 'Hymn')}</span>${metadata.tune ? ` · ${escapeHtml(metadata.tune)}` : ''}${info.playableOnGuitar ? ' · <span class="song-guitar">Guitar-friendly</span>' : ''}</p>
  </div>
  <span class="song-arrow" aria-hidden="true">↗</span>
</article>`;
  }).join('\n');
}

export async function refreshSongList(container, {
  loadSongs = async () => (await import('./songs.js')).default
} = {}) {
  if (!container) throw new Error('The page needs a <div id="songs-container" class="song-list"></div>.');
  container.setAttribute?.('aria-busy', 'true');
  try {
    const songs = normalizeSongList(await loadSongs());
    // Do not change the existing markup until the catalog has loaded successfully.
    container.innerHTML = renderSongCards(songs);
    if (typeof document !== 'undefined') {
      const count = document.getElementById('song-count');
      if (count) { count.textContent = `${songs.length} ${songs.length === 1 ? 'song' : 'songs'}`; count.removeAttribute('data-error'); }
    }
    if (container.dispatchEvent) container.dispatchEvent(new CustomEvent('songs:updated', {detail:{count:songs.length}}));
    return songs;
  } finally { container.removeAttribute?.('aria-busy'); }
}

async function startSongList() {
  const container = document.getElementById('songs-container');
  if (!container) return;
  try { await refreshSongList(container); }
  catch (error) {
    console.error('Song listing could not load:', error);
    const status = document.getElementById('song-count');
    if (status) { status.textContent = `Song listing could not load: ${error.message}`; status.setAttribute('data-error','true'); }
  }
}

// Can be included directly with <script type="module" src="./song-list.js"></script>.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startSongList, {once:true});
  else startSongList();
}
