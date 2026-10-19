export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

export function safeUrl(value, base = 'https://ryancornett.com') {
  if (!value) return null;
  const url = new URL(value, base);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error(`Unsupported URL: ${value}`);
  return String(value);
}

export function renderLyrics(lyrics) {
  const names = { stanza: 'Stanza', verse: 'Verse', chorus: 'Chorus', refrain: 'Refrain', 'pre-chorus': 'Pre-Chorus', bridge: 'Bridge' };
  const counts = {};
  for (const section of lyrics) counts[section.type] = (counts[section.type] || 0) + 1;
  return lyrics.map(section => {
    const label = `${names[section.type] || section.type}${counts[section.type] > 1 ? ` ${section.number}` : ''}`;
    return `<section class="lyric-section"><h3>${escapeHtml(label)}</h3><p>${section.lines.map(escapeHtml).join('<br>')}</p></section>`;
  }).join('\n');
}

export function descriptionFor(song) {
  const text = song.helpfulSongInfo?.about || song.aboutText || song.lyrics?.[0]?.lines.join(' ') || song.lyricsText || `Lyrics and resources for ${song.title} by Ryan Cornett.`;
  const plain = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt = plain.length > 240 ? plain.slice(0, 237).replace(/\s+\S*$/, '') + '…' : plain;
  return `${song.title} — ${excerpt}`;
}

export function validateSongs(songs) {
  const slugs = new Set();
  for (const song of songs) {
    if (!song.title?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(song.slug)) throw new Error(`Invalid title or slug: ${song.title}`);
    if (slugs.has(song.slug)) throw new Error(`Duplicate song slug: ${song.slug}`);
    slugs.add(song.slug);
    if (!song.songMetadata?.type) throw new Error(`Missing song type: ${song.title}`);
    if (song.lyrics) {
      if (!Array.isArray(song.lyrics)) throw new Error(`Lyrics must be an array: ${song.title}`);
      for (const section of song.lyrics) {
        if (typeof section.type !== 'string' || !Array.isArray(section.lines) || !section.lines.every(line => typeof line === 'string')) throw new Error(`Invalid lyric section: ${song.title}`);
        if (!Number.isInteger(section.number) || section.number < 1) throw new Error(`Invalid lyric section number: ${song.title}`);
      }
    }
  }
}
