(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const work = DATA.works.find(item =>
    String(item?.id || "").trim() === "fox-does-not-love-humans" ||
    String(item?.title || "").trim() === "狐は人間を愛さない"
  );
  if (!work) return;

  work.zetaUrl = null;
  work.zeta = null;
  work.url = null;
  work.link = null;
  work.chachaUrl = "https://chacha-ai.io/ja/characters/cc473d05-4729-49d0-8377-7c1b3cbb4c1a";
})();