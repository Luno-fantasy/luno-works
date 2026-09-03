(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;
  DATA.works = DATA.works.filter(work => String(work?.id || '').trim() !== 'say-you-like-me');
  if (Array.isArray(DATA.series)) {
    DATA.series.forEach(series => {
      if (Array.isArray(series.works)) series.works = series.works.filter(id => id !== 'say-you-like-me');
    });
  }
})();
