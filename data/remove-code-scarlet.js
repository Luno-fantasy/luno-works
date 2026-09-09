(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const removedIds = new Set([
    'code-scarlet',
    'four-vampires',
    'sougetsurou'
  ]);

  const removedTitles = new Set([
    'CODE SCARLET',
    '四人の吸血鬼は、君を帰さない。',
    '四人の吸血鬼は、君を離さない。',
    '絢爛たる双月楼'
  ]);

  const normalizeTitle = value => String(value || '').trim();
  const shouldRemove = work => {
    const id = String(work?.id || '').trim();
    const title = normalizeTitle(work?.title);
    return removedIds.has(id) || title.toUpperCase() === 'CODE SCARLET' || removedTitles.has(title);
  };

  DATA.works = DATA.works.filter(work => !shouldRemove(work));

  if (Array.isArray(DATA.series)) {
    DATA.series.forEach(series => {
      if (!Array.isArray(series?.works)) return;
      series.works = series.works.filter(id => !removedIds.has(String(id || '').trim()));
    });
  }

  if (DATA.site) {
    DATA.site.publishedCount = DATA.works.filter(work => work?.status === 'published').length;
    DATA.site.draftCount = DATA.works.filter(work => work?.status === 'draft').length;
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