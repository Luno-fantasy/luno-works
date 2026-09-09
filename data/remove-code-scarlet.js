(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const removedTitles = new Set([
    'CODE SCARLET',
    '四人の吸血鬼は、君を帰さない。',
    '絢爛たる双月楼'
  ]);

  const normalizeTitle = value => String(value || '').trim();
  const shouldRemove = work => {
    const title = normalizeTitle(work?.title);
    return title.toUpperCase() === 'CODE SCARLET' || removedTitles.has(title);
  };

  const removedIds = new Set(
    DATA.works
      .filter(shouldRemove)
      .map(work => String(work?.id || '').trim())
      .filter(Boolean)
  );

  DATA.works = DATA.works.filter(work => !shouldRemove(work));

  if (Array.isArray(DATA.series) && removedIds.size) {
    DATA.series.forEach(series => {
      if (!Array.isArray(series?.works)) return;
      series.works = series.works.filter(id => !removedIds.has(String(id || '').trim()));
    });
  }

  const fox = DATA.works.find(work =>
    String(work?.id || '').trim() === 'fox-does-not-love-humans' ||
    normalizeTitle(work?.title) === '狐は人間を愛さない'
  );
  if (fox) {
    fox.zetaUrl = null;
    fox.zeta = null;
    fox.url = null;
    fox.link = null;
    fox.chachaUrl = 'https://chacha-ai.io/ja/characters/cc473d05-4729-49d0-8377-7c1b3cbb4c1a';
  }
})();