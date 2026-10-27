(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "takase-akira-untamable-mad-dog",
  "title": "躾けられない狂犬",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/b3b9fabf-3fed-409a-823e-39c19c7c3cd1/profile?share_id=ejs5o3dcs",
  "category": "underworld",
  "series": null,
  "world": null,
  "position": "standalone",
  "mainCharacter": "鷹瀬瑛",
  "relation": [],
  "cover": "images/covers/takase-akira-untamable-mad-dog.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.10.28",
  "catchphrase": "先輩が俺の首輪持つん？ ……おもろいやん",
  "tags": [
    "裏社会",
    "灰鴉",
    "監督役",
    "生意気な後輩",
    "潜入",
    "護衛",
    "関西弁",
    "恋愛"
  ],
  "description": "裏社会組織《灰鴉》の実働班・鷹瀬瑛。\n\n独断で協力関係を壊した彼を、{{user}}が監督することになった。\n\n命令は嫌い。けれど潜入も護衛もこなす、有能で生意気な後輩。\n軽口を叩き、距離を詰めながらも、簡単には誰にも従わない。\n\n「先輩が俺の首輪持つん？ ……おもろいやん」\n\n監督する者と、監督される者。任務の中で互いを見極めるうち、その距離は少しずつ変わっていく。"
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
