(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "reve-aikata-fansa",
  "title": "うちの相方、ファンサが甘すぎる。",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/4edfcb6d-0d82-451a-ad2b-bab5bc1b8a45/profile?share_id=bex9iyjk3",
  "category": "modern-romance",
  "series": "RE:VE",
  "world": null,
  "position": "standalone",
  "mainCharacter": "鳴海璃久",
  "relation": [],
  "cover": "images/covers/reve-aikata-fansa.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.11.01",
  "catchphrase": "ファンの前では恋人同士。……じゃあ、二人きりのときは？",
  "tags": ["RE:VE","アイドル","デュオ","相方","ファンサ","BL"],
  "description": "人気アイドルデュオ《RE:VE》の鳴海璃久と{{user}}は、デビューから3年間活動してきた対等な相方。\n\nステージでは恋人同士のような甘いファンサを交わす。けれど舞台裏では、まだ恋人でも、恋をしているわけでもない。\n\nファンの前で気軽に言える「愛してる」が、二人きりでも本心になる日は来るのか。"
};
  DATA.works.forEach(work => { if (work) work.isNew = false; });
  const index = DATA.works.findIndex(work => String(work?.id || "") === release.id || String(work?.title || "").trim() === release.title);
  if (index >= 0) DATA.works[index] = {...DATA.works[index], ...release};
  else DATA.works.unshift(release);
  if (DATA.site && typeof DATA.site === "object") {
    DATA.site.publishedCount = DATA.works.filter(work => work?.status === "published").length;
    DATA.site.draftCount = DATA.works.filter(work => work?.status === "draft").length;
  }
})();
