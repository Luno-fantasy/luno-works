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
})();