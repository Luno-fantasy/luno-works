(() => {
  const LATEST_ID = "velvet-night-mikado-reiji";
  const apply = () => {
    const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
    if (DATA?.works) DATA.works.forEach(work => { if (work) work.isNew = String(work.id || "") === LATEST_ID; });
    document.querySelectorAll('.work-card').forEach(card => card.classList.toggle('velvet-latest-card', String(card.dataset.id || '') === LATEST_ID));
    document.querySelectorAll('.works-series-heading').forEach(header => {
      const h2 = header.querySelector('h2');
      if (!h2 || h2.textContent.trim() !== 'VELVET NIGHT') return;
      header.dataset.seriesPage = 'true';
      if (!h2.querySelector('a')) h2.innerHTML = '<a href="velvet-night.html">VELVET NIGHT</a>';
      const copy = header.querySelector('.series-heading-copy > span');
      if (copy) copy.textContent = '夜ごと幕を開ける、会員制夜劇場《VESPER》。';
    });
  };
  const style = document.createElement('style');
  style.textContent = `.work-card .work-new-badge{display:none!important}.work-card[data-id="${LATEST_ID}"] .work-visual::before{content:"NEW RELEASE";position:absolute;z-index:8;right:10px;top:10px;padding:8px 11px;border:1px solid rgba(240,220,165,.5);background:rgba(9,10,22,.88);color:#f0dca5;font:600 8px/1.2 "Cormorant Garamond",serif;letter-spacing:.16em;box-shadow:0 8px 24px rgba(0,0,0,.25)}`;
  document.head.appendChild(style);
  apply();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { apply(); setTimeout(apply, 80); }, {once:true}); else setTimeout(apply, 0);
})();