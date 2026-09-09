(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const removedIds = new Set(
    DATA.works
      .filter(work => String(work?.title || '').trim().toUpperCase() === 'CODE SCARLET')
      .map(work => String(work?.id || '').trim())
      .filter(Boolean)
  );

  DATA.works = DATA.works.filter(work => String(work?.title || '').trim().toUpperCase() !== 'CODE SCARLET');

  if (Array.isArray(DATA.series) && removedIds.size) {
    DATA.series.forEach(series => {
      if (!Array.isArray(series?.works)) return;
      series.works = series.works.filter(id => !removedIds.has(String(id || '').trim()));
    });
  }

  const fox = DATA.works.find(work =>
    String(work?.id || '').trim() === 'fox-does-not-love-humans' ||
    String(work?.title || '').trim() === '狐は人間を愛さない'
  );
  if (fox) {
    fox.zetaUrl = null;
    fox.zeta = null;
    fox.url = null;
    fox.link = null;
    fox.chachaUrl = 'https://chacha-ai.io/ja/characters/cc473d05-4729-49d0-8377-7c1b3cbb4c1a';
  }
})();