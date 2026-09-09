(() => {
  const apply = () => {
    document.querySelectorAll('.works-series-heading').forEach(header => {
      const h2 = header.querySelector('h2');
      if (!h2 || h2.textContent.trim() !== 'VELVET NIGHT') return;
      header.dataset.seriesPage = 'true';
      if (!h2.querySelector('a')) h2.innerHTML = '<a href="velvet-night.html">VELVET NIGHT</a>';
      const copy = header.querySelector('.series-heading-copy > span');
      if (copy) copy.textContent = '夜ごと幕を開ける、会員制夜劇場《VESPER》。';
    });
  };
  apply();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { apply(); setTimeout(apply, 80); }, {once:true});
  } else {
    setTimeout(apply, 0);
  }
})();