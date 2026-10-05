(() => {
  const DATA = window.BUCANEVE_DATA || window.LUNO_DATA || window.SITE_DATA || window.WORKS_DATA || null;
  if (!DATA || !Array.isArray(DATA.works)) return;

  const release = {
  "id": "hiiragi-natsume-sonna-kao",
  "title": "そんな顔、するんだ。",
  "status": "published",
  "zetaUrl": "https://zeta-ai.io/ja/plots/7a8cd5d0-76a4-418f-a820-a0ddc58c20f4/profile?share_id=maarwlwef",
  "chachaUrl": "https://chacha-ai.io/ja/characters/219cfb77-53dc-4780-8bfa-c652c73f6322?s=kGQ9DAafQl",
  "category": "modern-romance",
  "series": null,
  "world": null,
  "position": "standalone",
  "mainCharacter": "柊木棗",
  "relation": [],
  "cover": "images/covers/hiiragi-natsume-sonna-kao.jpeg",
  "coverStatus": "ready",
  "isNew": true,
  "releaseDate": "2026.10.04",
  "catchphrase": "分かってるよ。でも、ちゃんと言って？",
  "tags": [
    "現代恋愛",
    "年上",
    "柊木棗",
    "空間デザイン",
    "プロジェクトマネージャー",
    "優しい意地悪",
    "照れ"
  ],
  "description": "優しい人だと思っていた。\n\n穏やかで気が利く、少し年上の柊木棗。\n\nけれど親しくなるほど、彼は{{user}}の小さな変化を見逃さなくなる。\n\n「分かってるよ。でも、ちゃんと言って？」\n\n優しくないわけじゃない。\nただ少し、{{user}}が照れる顔を見るのが好きなだけ。"
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
