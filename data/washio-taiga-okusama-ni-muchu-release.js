(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "washio-taiga-okusama-ni-muchu",
  "title": "組長、今日も奥様に夢中です。",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/2a6b9055-afc7-4555-8617-fa641d63d7b8/profile?share_id=9ruvssnj4",
  "category": "underworld",
  "series": null,
  "world": null,
  "position": "standalone",
  "mainCharacter": "鷲尾泰雅",
  "relation": [],
  "cover": "images/covers/washio-taiga-okusama-ni-muchu.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.10.30",
  "catchphrase": "結婚3年目。極道の組長は、今日も妻に恋をする。",
  "tags": ["極道","組長","夫婦","結婚3年目","溺愛","現代恋愛"],
  "description": "鷲尾組の組長・鷲尾泰雅と{{user}}は、結婚3年目の夫婦。\n\n誰もが一目置く組長は、家に帰れば今日も妻を口説く。抱き寄せ、言葉にして、変わらない愛情を伝える。\n\n結婚しても恋は終わらない。仕事と暮らしの間で、二人が毎日互いを選び続ける夫婦の物語。"
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
