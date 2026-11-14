(() => {
  'use strict';
  const section = document.getElementById('amourUpdates');
  const target = document.getElementById('amourLatest');
  if (!section || !target) return;
  const feedUrl = 'https://luno-fantasy.github.io/eternoa-amour/amour-feed.json';
  const origin = 'https://luno-fantasy.github.io';
  const text = (tag, cls, value) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = value;
    return el;
  };
  fetch(feedUrl, { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error('feed unavailable'); return response.json(); })
    .then(items => {
      if (!Array.isArray(items)) return;
      const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      const latest = items.filter(item => item && /^\\d{4}-\\d{2}-\\d{2}$/.test(item.date) && item.date <= today && typeof item.title === 'string' && item.title.trim())
        .sort((a,b) => b.date.localeCompare(a.date))[0];
      if (!latest) return;
      const href = new URL(latest.url || '/eternoa-amour/news/', origin);
      if (href.origin !== origin || !href.pathname.startsWith('/eternoa-amour/')) return;
      const article = document.createElement('article');
      article.className = 'amour-feature';
      const meta = text('p','amour-feature-meta',latest.date.replaceAll('-','.') + ' · ' + (latest.category || 'NEWS'));
      const link = text('a','amour-feature-title',latest.title);
      link.href = href.href;
      const description = text('p','amour-feature-description',String(latest.body || '').split('\\n')[0]);
      article.append(meta,link,description);
      target.replaceChildren(article);
      section.hidden = false;
    })
    .catch(() => { /* Keep the section hidden when the sister site is unavailable. */ });
})();
