(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "lapin-bunny-nomination",
  "title": "そのバニー、指名できます。",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/0719aec0-ee23-4ed5-b080-43a270ee964f/profile?share_id=m57oxg3bf",
  "category": "modern-romance",
  "series": null,
  "world": null,
  "position": "MULTI STORY",
  "mainCharacter": "スバル／ルカ／キリヤ／ソウマ／シキ／リク",
  "relation": [
    "スバル",
    "ルカ",
    "キリヤ",
    "ソウマ",
    "シキ",
    "リク"
  ],
  "cover": "images/covers/lapin-bunny-nomination.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.10.21",
  "catchphrase": "ご指名は？",
  "tags": [
    "LAPIN",
    "バニーボーイ",
    "会員制ホストクラブ",
    "指名",
    "スタッフ",
    "競争",
    "友情",
    "恋愛",
    "マルチストーリー"
  ],
  "description": "「ご指名は？」\n\n6人のバニーボーイが働く、会員制ホストクラブ《LAPIN》\n\n客として指名するか。\nスタッフとして裏側に立つか。\n\n競争も、友情も、恋も。\nどこから始まるかは、まだ決まっていない。\n\n今夜、誰の夜に関わる？"
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
