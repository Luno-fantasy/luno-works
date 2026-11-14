(() => {
  const music = window.ETERNOA_MUSIC || [];
  const cover = (work, loading = 'lazy') =>
    `<img src="${work.cover}" alt="" loading="${loading}" decoding="async">`;

  const albums = document.getElementById('musicAlbums');
  if (albums) {
    albums.innerHTML = music.filter(work => work.kind === 'album').map(work =>
      `<a class="music-album" href="${work.url}" target="_blank" rel="noopener noreferrer">
        ${cover(work)}
        <strong>${work.title}</strong>
        <small>LISTEN ON SUNO <span aria-hidden="true">↗&#xfe0e;</span></small>
      </a>`
    ).join('');
  }

  const playlists = document.getElementById('musicPlaylists');
  if (playlists) {
    playlists.innerHTML = music.filter(work => work.kind === 'playlist').map(work =>
      `<a class="music-playlist" href="${work.url}" target="_blank" rel="noopener noreferrer" aria-label="${work.title}をSunoで聴く">
        ${cover(work)}
        <strong>${work.title}</strong>
        <span aria-hidden="true">↗&#xfe0e;</span>
      </a>`
    ).join('');
  }

  const feature = document.getElementById('featuredMusic');
  const selected = music.find(work => work.id === 'twelve-shades');
  if (feature && selected) {
    feature.innerHTML = `<a class="music-feature" href="music.html">
      ${cover(selected)}
      <span><strong>${selected.title}</strong><em>EXPLORE MUSIC →</em></span>
    </a>`;
  }
})();
