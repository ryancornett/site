/* Homepage interactions. Static song markup is a fallback; songs.js refreshes it on load. */
(() => {
  const search = document.getElementById('song-search');
  let songs = [...document.querySelectorAll('.song')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.getElementById('song-count');
  const clear = document.getElementById('clear-search');
  let activeFilter = 'all';
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’‘]/g, "'");
  function updateSongs() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const song of songs) {
      const haystack = normalize(song.dataset.search || song.textContent);
      const matches = terms.every(term => haystack.includes(term)) && (activeFilter === 'all' || song.dataset.type === activeFilter);
      song.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = `${visible} ${visible === 1 ? 'song' : 'songs'}${visible !== songs.length ? ` of ${songs.length}` : ''}`;
    document.getElementById('song-empty').hidden = visible !== 0;
    clear.hidden = !search.value;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
  }
  if (search) {
    document.getElementById('song-controls').hidden = false;
    search.addEventListener('input', updateSongs);
    filters.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; updateSongs(); }));
    clear.addEventListener('click', () => { search.value = ''; updateSongs(); search.focus(); });
    document.getElementById('reset-songs').addEventListener('click', () => { search.value = ''; activeFilter = 'all'; updateSongs(); search.focus(); });
    updateSongs();
  }


  const songContainer = document.getElementById('songs-container');
  if (songContainer) {
    // The listing starts independently of the optional search controls.
    songContainer.addEventListener('songs:updated', () => {
      songs = [...songContainer.querySelectorAll('.song')];
      if (search) updateSongs();
    });
    import('./song-list.js').catch(error => {
      console.error('Could not load song-list.js:', error);
      if (count) {
        count.textContent = `Could not load song-list.js: ${error.message}`;
        count.setAttribute('data-error', 'true');
      }
    });
  }
})();
